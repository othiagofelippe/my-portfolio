import { NextRequest, NextResponse } from 'next/server';

interface GitHubRepo {
  name: string;
  description: string | null;
  topics: string[];
  language: string | null;
  created_at: string;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
}

interface Project {
  name: string;
  description: string;
  tags: string[];
  language: string | null;
  created_at: string;
  formatted_date: string;
  url: string;
  demo: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const username = 'othiagofelippe';
    const url = `https://api.github.com/users/${username}/repos?per_page=50&sort=updated&direction=desc`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    const projects: Project[] = repos
      .filter((repo: GitHubRepo) =>
        !repo.fork &&
        !repo.archived &&
        repo.description
      )
      .slice(0, 6)
      .map((repo: GitHubRepo) => {
        const date = new Date(repo.created_at);
        const formattedDate = date.toLocaleDateString('pt-BR', {
          month: 'short',
          year: 'numeric'
        });

        return {
          name: repo.name,
          description: repo.description!,
          tags: repo.topics || [],
          language: repo.language,
          created_at: repo.created_at,
          formatted_date: formattedDate,
          url: repo.html_url,
          demo: repo.homepage,
        };
      });

    return NextResponse.json(projects);

  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
