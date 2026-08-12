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
      title: `Pushed updates to ${repoName}`,
      detail:
        commitCount > 0
          ? `${commitCount} ${commitCount === 1 ? 'commit' : 'commits'} in this repository.`
          : `Recent changes in ${repoName}.`,
      date,
      url: `https://github.com/${event.repo.name}/commits`,
    };
  }

  if (event.type === 'PullRequestEvent') {
    return {
      id: event.id,
      label: 'PR',
      title: event.payload?.pull_request?.title || `Pull request update in ${repoName}`,
      detail: `Public pull request activity in ${repoName}.`,
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
      detail: `New work started in ${repoName}.`,
      date,
      url: `https://github.com/${event.repo.name}`,
    };
  }

  if (event.type === 'IssuesEvent') {
    return {
      id: event.id,
      label: 'Issue',
      title: event.payload?.issue?.title || `Opened an issue in ${repoName}`,
      detail: `Public issue activity in ${repoName}.`,
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
        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-white/6 bg-black/30 p-5">
            <p className="font-mono text-xs text-red-200/70">GitHub</p>
            <h3 className="mt-3 text-2xl font-semibold text-stone-50">@{username}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-400">
              Recent public activity pulled straight from my GitHub profile.
            </p>

            <a
              href={personalData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-red-500/16 bg-black/35 px-5 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-red-400/30 hover:bg-red-500/10 hover:text-stone-50 sm:w-auto"
            >
              View profile
            </a>
          </div>

          <div className="space-y-3">
            {loading &&
              [0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="rounded-[26px] border border-white/6 bg-black/30 p-5 animate-pulse"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-3 w-16 rounded-full bg-red-500/12" />
                    <div className="h-3 w-14 rounded-full bg-white/6" />
                  </div>
                  <div className="mt-4 h-5 w-3/4 rounded-full bg-white/6" />
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
                  className="glow-card block rounded-[26px] border border-white/6 bg-black/30 p-5 transition-colors hover:border-red-400/18"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-red-500/12 bg-red-500/10 px-3 py-1 font-mono text-[11px] text-red-100/90">
                          {item.label}
                        </span>
                        <span className="font-mono text-xs text-stone-500 md:hidden">{item.date}</span>
                      </div>

                      <h4 className="mt-3 text-base font-semibold leading-7 text-stone-50">{item.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-stone-400">{item.detail}</p>
                    </div>

                    <span className="hidden shrink-0 font-mono text-xs text-stone-500 md:block">
                      {item.date}
                    </span>
                  </div>
                </a>
              ))}

            {!loading && error && (
              <div className="rounded-[26px] border border-white/6 bg-black/30 p-5">
                <p className="text-sm font-medium text-stone-100">GitHub activity is temporarily unavailable.</p>
                <p className="mt-2 text-sm leading-7 text-stone-400">
                  The section is wired up, but GitHub did not return public events right now. The
                  profile link above still takes visitors to the full activity feed.
                </p>
              </div>
            )}

            {!loading && !error && items.length === 0 && (
              <div className="rounded-[26px] border border-white/6 bg-black/30 p-5">
                <p className="text-sm font-medium text-stone-100">No recent public activity yet.</p>
                <p className="mt-2 text-sm leading-7 text-stone-400">
                  Once new public events show up on GitHub, this panel will surface them here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
