import React, { useEffect, useMemo, useRef, useState } from 'react';
import { personalData } from '../data';

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

const GRID_COLS = 53;
const GRID_ROWS = 7;
const MIN_CELL_SIZE = 4;
const CELL_GAP = 1;
const WEEKDAY_MARKERS = [
  { label: 'Mon', row: 2 },
  { label: 'Wed', row: 4 },
  { label: 'Fri', row: 6 },
];

const LEVEL_COLORS = ['#16171c', '#2d1020', '#5b0a12', '#c1121f', '#f87171'];
const LEVEL_BORDERS = [
  'rgba(255,255,255,0.06)',
  'rgba(248,113,113,0.10)',
  'rgba(248,113,113,0.18)',
  'rgba(248,113,113,0.28)',
  'rgba(248,113,113,0.36)',
];

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const dateToKey = (date: Date) => date.toISOString().slice(0, 10);
const monthName = (date: Date) => date.toLocaleDateString('en-US', { month: 'short' });

const getColorForLevel = (level: number) => LEVEL_COLORS[Math.min(level, LEVEL_COLORS.length - 1)] ?? LEVEL_COLORS[0];

const buildDateRange = () => {
  const today = startOfDay(new Date());
  const start = new Date(today);
  start.setDate(today.getDate() - (GRID_COLS * GRID_ROWS - 1));

  const days: Date[] = [];
  for (let index = 0; index < GRID_COLS * GRID_ROWS; index += 1) {
    const next = new Date(start);
    next.setDate(start.getDate() + index);
    days.push(next);
  }

  return days;
};

const mergeContributions = (responses: ContributionsResponse[]) => {
  const merged = new Map<string, ContributionDay>();

  responses.forEach((response) => {
    response.contributions.forEach((day) => {
      const existing = merged.get(day.date);
      if (!existing) {
        merged.set(day.date, day);
        return;
      }

      merged.set(day.date, {
        ...day,
        count: existing.count + day.count,
        level: Math.max(existing.level, day.level),
      });
    });
  });

  return merged;
};

const loadPublicContributions = async (
  username: string,
  signal: AbortSignal
) => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const responses = await Promise.all(
    [previousYear, currentYear].map(async (year) => {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`, {
        signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to load contributions for ${year}`);
      }

      return (await response.json()) as ContributionsResponse;
    })
  );

  return mergeContributions(responses);
};

const GitHubActivity = () => {
  const username = personalData.socialLinks.github.split('github.com/')[1] || 'Mohamedj2020';
  const [contributions, setContributions] = useState<Map<string, ContributionDay>>(new Map());
  const [cellSize, setCellSize] = useState(8);
  const [gridWidth, setGridWidth] = useState(0);
  const [weekdayLabelWidth, setWeekdayLabelWidth] = useState(28);
  const gridFrameRef = useRef<HTMLDivElement | null>(null);

  const days = useMemo(() => buildDateRange(), []);
  const monthLabels = useMemo(() => {
    const labels = Array.from({ length: GRID_COLS }, () => '');
    const seen = new Set<string>();
    const minimumLabelSpacing = cellSize < 7 ? 5 : cellSize < 10 ? 4 : 3;
    let lastPlacedWeek = -minimumLabelSpacing;

    days.forEach((day, index) => {
      const weekIndex = Math.floor(index / GRID_ROWS);
      const monthKey = `${day.getFullYear()}-${day.getMonth()}`;

      if (!seen.has(monthKey) && weekIndex - lastPlacedWeek >= minimumLabelSpacing) {
        labels[weekIndex] = monthName(day);
        seen.add(monthKey);
        lastPlacedWeek = weekIndex;
      }
    });

    return labels;
  }, [cellSize, days]);

  const totalContributions = useMemo(
    () => Array.from(contributions.values()).reduce((sum, day) => sum + day.count, 0),
    [contributions]
  );

  useEffect(() => {
    const controller = new AbortController();

    const loadContributions = async () => {
      try {
        const from = dateToKey(days[0]);
        const to = dateToKey(days[days.length - 1]);

        try {
          const response = await fetch(
            `/api/github-contributions?username=${encodeURIComponent(username)}&from=${from}&to=${to}`,
            { signal: controller.signal }
          );

          if (!response.ok) {
            throw new Error('Authenticated GitHub contributions unavailable');
          }

          const authenticated = (await response.json()) as ContributionsResponse;
          setContributions(mergeContributions([authenticated]));
          return;
        } catch (error) {
          const fallback = await loadPublicContributions(username, controller.signal);
          setContributions(fallback);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setContributions(new Map());
        }
      }
    };

    loadContributions();

    return () => controller.abort();
  }, [days, username]);

  useEffect(() => {
    const frame = gridFrameRef.current;
    if (!frame || typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const updateGridMetrics = () => {
      const frameWidth = frame.clientWidth;
      if (!frameWidth) {
        return;
      }

      const nextWeekdayLabelWidth = frameWidth < 420 ? 22 : frameWidth < 960 ? 28 : 38;
      const weekdayGap = frameWidth < 960 ? 8 : 14;
      const availableGridWidth = frameWidth - nextWeekdayLabelWidth - weekdayGap;
      const nextCellSize = Math.max(
        MIN_CELL_SIZE,
        (availableGridWidth - CELL_GAP * (GRID_COLS - 1)) / GRID_COLS
      );
      const nextGridWidth = Math.max(0, availableGridWidth);

      setWeekdayLabelWidth((current) =>
        current === nextWeekdayLabelWidth ? current : nextWeekdayLabelWidth
      );
      setCellSize((current) => (current === nextCellSize ? current : nextCellSize));
      setGridWidth((current) => (current === nextGridWidth ? current : nextGridWidth));
    };

    const observer = new ResizeObserver(updateGridMetrics);
    observer.observe(frame);
    updateGridMetrics();

    return () => observer.disconnect();
  }, []);

  const gridHeight = GRID_ROWS * cellSize + CELL_GAP * (GRID_ROWS - 1);

  return (
    <section id="github-activity" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="sr-only">GitHub Activity Heat Map</h2>

      <div className="scroll-fade overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(34,16,22,0.96)_0%,rgba(16,9,11,0.98)_100%)] px-5 py-5 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-sm md:px-6 md:py-6 xl:px-9 xl:py-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-stone-100">
              <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-red-100/75">GitHub</span>
              <span className="text-[15px] font-medium leading-none text-white/92">Activity</span>
              <span className="truncate text-[15px] font-medium leading-none text-white/35">@{username}</span>
            </div>
          </div>

          <a
            href={personalData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold leading-none text-white/92 transition-colors hover:text-white"
          >
            View Profile
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>

        <div className="mt-5 h-px bg-white/10" />

        <div ref={gridFrameRef} className="mt-5 pb-1">
          <div
            className="mb-3 grid items-end md:mb-4"
            style={{ gridTemplateColumns: `${weekdayLabelWidth}px minmax(0, 1fr)`, columnGap: '14px' }}
          >
            <span />
            <div
              className="grid gap-x-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/42 md:text-[10px] md:tracking-[0.18em] xl:text-[11px]"
              style={{
                width: `${gridWidth}px`,
                gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
              }}
            >
              {monthLabels.map((label, index) => (
                <span key={`${label}-${index}`} className="h-4 whitespace-nowrap text-left">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div
            className="grid items-start"
            style={{ gridTemplateColumns: `${weekdayLabelWidth}px minmax(0, 1fr)`, columnGap: '14px' }}
          >
            <div
              className="grid shrink-0 items-center py-[1px] text-[9px] font-semibold uppercase tracking-[0.14em] text-white/42 md:text-[10px] md:tracking-[0.16em] xl:text-[11px]"
              style={{
                width: `${weekdayLabelWidth}px`,
                height: `${gridHeight}px`,
                gridTemplateRows: `repeat(${GRID_ROWS}, ${cellSize}px)`,
                gap: `${CELL_GAP}px`,
              }}
            >
              {WEEKDAY_MARKERS.map((marker) => (
                <span
                  key={marker.label}
                  className="leading-none"
                  style={{ gridRow: marker.row }}
                >
                  {marker.label}
                </span>
              ))}
            </div>

            <div
              className="grid"
              aria-label={`${username} GitHub contributions heat map`}
              style={{
                width: `${gridWidth}px`,
                gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${GRID_ROWS}, ${cellSize}px)`,
                gap: `${CELL_GAP}px`,
              }}
            >
              {days.map((day, index) => {
                const column = Math.floor(index / GRID_ROWS) + 1;
                const row = (index % GRID_ROWS) + 1;
                const contribution = contributions.get(dateToKey(day));
                const level = contribution?.level ?? 0;
                const count = contribution?.count ?? 0;

                return (
                  <div
                    key={dateToKey(day)}
                    title={`${day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${count} contributions`}
                    aria-label={`${day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${count} contributions`}
                    className="rounded-[3px] transition-transform duration-200 hover:scale-110"
                    style={{
                      gridColumn: column,
                      gridRow: row,
                      width: '100%',
                      height: `${cellSize}px`,
                      backgroundColor: getColorForLevel(level),
                      border: `1px solid ${LEVEL_BORDERS[level] ?? LEVEL_BORDERS[0]}`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 sm:flex-row sm:items-center sm:justify-between xl:mt-7">
          <p className="text-sm font-normal tracking-normal text-white/82 normal-case xl:text-[15px]">
            <span className="font-semibold text-white">{totalContributions}</span> contributions in the past year
          </p>

          <div className="flex items-center gap-2 xl:text-[11px]">
            <span>Less</span>
            <span className="h-3.5 w-3.5 rounded-[3px] bg-[#161b22] ring-1 ring-inset ring-white/10" />
            <span className="h-3.5 w-3.5 rounded-[3px] bg-[#2d1020] ring-1 ring-inset ring-white/10" />
            <span className="h-3.5 w-3.5 rounded-[3px] bg-[#5b0a12] ring-1 ring-inset ring-white/10" />
            <span className="h-3.5 w-3.5 rounded-[3px] bg-[#c1121f] ring-1 ring-inset ring-white/10" />
            <span className="h-3.5 w-3.5 rounded-[3px] bg-[#f87171] ring-1 ring-inset ring-white/10" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
