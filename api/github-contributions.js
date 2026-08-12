const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const username = Array.isArray(req.query.username) ? req.query.username[0] : req.query.username;
  const from = Array.isArray(req.query.from) ? req.query.from[0] : req.query.from;
  const to = Array.isArray(req.query.to) ? req.query.to[0] : req.query.to;

  if (!username || !from || !to) {
    res.status(400).json({ error: 'Missing username, from, or to query parameter' });
    return;
  }

  if (!process.env.GITHUB_TOKEN) {
    res.status(503).json({ error: 'GITHUB_TOKEN is not configured' });
    return;
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'PersonalPortfolio',
      },
      body: JSON.stringify({
        query: `
          query Contributions($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          username,
          from: `${from}T00:00:00Z`,
          to: `${to}T23:59:59Z`,
        },
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      res.status(response.status).json({ error: message });
      return;
    }

    const payload = await response.json();
    const calendar = payload?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      res.status(502).json({ error: 'GitHub contribution data was unavailable' });
      return;
    }

    const contributions = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      }))
    );

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({
      total: { [String(new Date().getFullYear())]: calendar.totalContributions },
      contributions,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
