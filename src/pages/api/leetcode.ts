import { NextApiRequest, NextApiResponse } from 'next';

import { getLeetCodeUserStats } from '@/services/leetcode';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ message: 'Username is required' });
  }

  const response = await getLeetCodeUserStats(username);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=1800'
  );

  return res.status(response.status).json(response.data);
}
