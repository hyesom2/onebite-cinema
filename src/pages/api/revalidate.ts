import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 요청이 실패할 수 있으니 try-catch문으로 감싼다.
  try {
    await res.revalidate('/'); // 페이지 요청을 받았을 때 즉시 revalidate(재생성) 시켜주도록 → index(/)페이지를 revalidate
    return res.json({ revalidate: true }); // 요청이 성공했다면 response의 json으로 revalidate property를 true로 설정해 index(/)페이지의 재생성이 완료되었다라고 응답
  } catch (error) {
    res.status(500).send('Revalidation Failed');
  }
}