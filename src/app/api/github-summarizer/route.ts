import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  const { githubUrl } = await req.json();
  try {
    if (!apiKey) {
      return NextResponse.json({ valid: false, error: 'API key is required.' }, { status: 400 });
    }

    // Fetch all API keys from Supabase
    const { data, error } = await supabase.from('api_keys').select('value');
    if (error) {
      return NextResponse.json({ valid: false, error: 'Database error.' }, { status: 500 });
    }
    const readmeContent = await getReadmeContent(githubUrl);
    console.log(readmeContent);

    const isValid = data?.some((row: { value: string }) => row.value === apiKey);
    if (isValid) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false, error: 'Invalid API key.' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ valid: false, error: 'Invalid request.' }, { status: 400 });
  }
}

/**
 * Fetches the README.md content from a given GitHub repository URL.
 * @param githubUrl The URL of the GitHub repository (e.g., https://github.com/user/repo)
 * @returns The content of the README.md file as a string, or null if not found.
 */
async function getReadmeContent(githubUrl: string): Promise<string | null> {
  try {
    // Parse the GitHub URL to extract owner and repo
    const match = githubUrl.match(/^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/|$)/i);
    if (!match) return null;
    const owner = match[1];
    const repo = match[2];

    // Try to fetch README from main branch, then master if not found
    const branches = ['main', 'master'];
    for (const branch of branches) {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
      const res = await fetch(rawUrl);
      if (res.ok) {
        return await res.text();
      }
    }
    // README.md not found
    return null;
  } catch {
    return null;
  }
}
