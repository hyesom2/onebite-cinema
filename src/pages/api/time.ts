// 현재 시간을 반환하는 API → http://localhost:3000/api/time 으로 접속요청

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const date = new Date();
  res.json({ time: date.toLocaleString() });
}

// > API Routes 공식 문서
// https://nextjs.org/docs/pages/building-your-application/routing/api-routes