import React, { useEffect, useState } from 'react';
import { personalData } from '../data';

type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload?: {
    action?: string;
    ref_type?: string;
    commits?: { sha: string; message: string }[];
    pull_request?: { html_url: string; title: string };
    issue?: { html_url: string; title: string };
  };
};

type ActivityItem = {
  id: string;
  label: string;
  title: string;
  detail: string;
  date: string;
  url: string;
};

const formatRepoName = (repoName: string) => repoName.split('/')[1] || repoName;

const toActivityItem = (event: GitHubEvent): ActivityItem | null => {
  const repoName = formatRepoName(event.repo.name);
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(event.created_at));

  if (event.type === 'PushEvent') {
    const commitCount = event.payload?.commits?.length ?? 0;

    return {
      id: event.id,
      label: 'Push',
      title: `Shipped code to ${repoName}`,
      detail:
        commitCount > 0
          ? `${commitCount} new ${commitCount === 1 ? 'commit' : 'commits'} landed in this repository.`
          : `Recent changes were pushed to ${repoName}.`,
      date,
      url: `https://github.com/${event.repo.name}/commits`,
    };
  }

  if (event.type === 'PullRequestEvent') {
    return {
      id: event.id,
      label: 'PR',
      title: event.payload?.pull_request?.title || `Worked through a pull request in ${repoName}`,
      detail: `Public pull request activity on ${repoName}.`,
      date,
      url: event.payload?.pull_request?.html_url || `https://github.com/${event.repo.name}/pulls`,
    };
  }

  if (event.type === 'CreateEvent') {
    const refType = event.payload?.ref_type || 'branch';

    return {
      id: event.id,
      label: 'Create',
      title:
        refType === 'repository'
          ? `Started a new repository: ${repoName}`
          : `Created a new ${refType} in ${repoName}`,
      detail: `Fresh groundwork going into ${repoName}.`,
      date,
      url: `https://github.com/${event.repo.name}`,
    };
  }

  if (event.type === 'IssuesEvent') {
    return {
      id: event.id,
      label: 'Issue',
      title: event.payload?.issue?.title || `Opened an issue in ${repoName}`,
      detail: `Tracking work and follow-up in ${repoName}.`,
      date,
      url: event.payload?.issue?.html_url || `https://github.com/${event.repo.name}/issues`,
    };
  }

  return null;
};

const GitHubActivity = () => {
  const username = personalData.socialLinks.github.split('github.com/')[1] || 'Mohamedj2020';
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadActivity = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=8`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to load GitHub activity');
        }

        const events = (await response.json()) as GitHubEvent[];
        const nextItems = events.map(toActivityItem).filter((item): item is ActivityItem => item !== null).slice(0, 6);

        setItems(nextItems);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadActivity();

    return () => controller.abort();
  }, [username]);

  return (
    <section id="github-activity" className="mb-16 scroll-mt-24 md:mb-24 lg:mb-32">
      <h2 className="mb-10 text-2xl font-medium tracking-tight text-stone-50 scroll-fade">
        <span className="section-heading">GitHub Activity</span>
      </h2>

      <div className="scroll-fade rounded-[34px] border border-red-500/12 bg-[rgba(17,10,10,0.72)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-red-200/70">Live GitHub Pulse</p>
            <h3 className="mt-3 font-serif text-4xl text-stone-50">@{username}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-400">
              A live snapshot of recent public work pulled directly from GitHub, so the portfolio
              reflects what I am actively shipping and exploring.
            </p>
          </div>

          <a
            href={personalData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-red-500/16 bg-black/35 px-5 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-stone-50"
          >
            View profile
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-full border border-red-500/12 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-red-100/85">
            Public events
          </div>
          <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-400">
            Auto-refreshes on load
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {loading &&
            [0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-[28px] border border-white/6 bg-black/30 p-5 animate-pulse"
              >
                <div className="h-3 w-20 rounded-full bg-red-500/12" />
                <div className="mt-4 h-6 w-3/4 rounded-full bg-white/6" />
                <div className="mt-3 h-4 w-full rounded-full bg-white/6" />
                <div className="mt-2 h-4 w-2/3 rounded-full bg-white/6" />
              </div>
            ))}

          {!loading &&
            !error &&
            items.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-card rounded-[28px] border border-white/6 bg-black/30 p-5 transition-colors hover:border-red-400/18"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-red-500/12 bg-red-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-red-100/90">
                    {item.label}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-stone-500">{item.date}</span>
                </div>

                <h4 className="mt-4 font-serif text-2xl leading-tight text-stone-50">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-stone-400">{item.detail}</p>
              </a>
            ))}

          {!loading && error && (
            <div className="rounded-[28px] border border-white/6 bg-black/30 p-5 md:col-span-2">
              <p className="text-sm font-medium text-stone-100">GitHub activity is temporarily unavailable.</p>
              <p className="mt-2 text-sm leading-7 text-stone-400">
                The section is wired up, but GitHub did not return public events right now. The
                profile link above still takes visitors to the full activity feed.
              </p>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="rounded-[28px] border border-white/6 bg-black/30 p-5 md:col-span-2">
              <p className="text-sm font-medium text-stone-100">No recent public activity yet.</p>
              <p className="mt-2 text-sm leading-7 text-stone-400">
                Once new public events show up on GitHub, this panel will surface them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
