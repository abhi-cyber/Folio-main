import { getStore } from '@netlify/blobs';

// Live visitor reactions shown on the site. Previews and production keep separate counts.
const EMOJIS = ['wave', 'fire', 'rocket', 'brain', 'heart'];

export default async (req, context) => {
  const scope = context?.deploy?.context === 'production' ? 'production' : 'preview';
  const store = getStore({ name: `reactions-${scope}`, consistency: 'strong' });
  const counts = (await store.get('counts', { type: 'json' })) || {};

  if (req.method === 'POST') {
    const body = await req.json().catch(() => ({}));
    if (!EMOJIS.includes(body.emoji)) {
      return Response.json({ error: 'Unknown reaction' }, { status: 400 });
    }
    counts[body.emoji] = (counts[body.emoji] || 0) + 1;
    await store.setJSON('counts', counts);
  } else if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const result = Object.fromEntries(EMOJIS.map((e) => [e, counts[e] || 0]));
  return Response.json(result, { headers: { 'cache-control': 'no-store' } });
};

export const config = { path: '/api/reactions' };
