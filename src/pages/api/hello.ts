// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// API의 응답코드가 기초적으로 작성되어있다.
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

/*
  1. 브라우저를 통해 이 경로로 API를 요청
  2. handler함수가 실행
  3. 매개변수 2걔(req, res)
  4. 함수 내부에는 response객체의 json이라는 메서드를 통해 json객체를 응답
  5. status(200) : 상태코드 200, 요청이 성공적으로 처리되었음을 의미
  6. http://localhost:3000/api/hello 주소로 접속 요청을 보내면 {"name" : "John Doe"} 응답
*/ 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}

/* 
  * API Routes
  : Next.js 앱에서 API를 구축할 수 있게 해주는 기능
  
  에) 
  1. 백엔드 API 서버가 하는 일과 동일하게 간단한 API를 구축하여 클라이언트(브라우저)로부터 요청을 받아 DB에서 데이터를 꺼내온다.
  2. 또 다른 서드파티에 데이터를 불러와서 전달을 해준다.

  : /pages/api/hello.ts 와 같이 배치를 하면 해당하는 파일은 웹페이지가 아닌 API Routes(API 응답)을 정의하는 파일로 자동으로 설정
  
  즉, Next.js에서는 Pages라는 폴더 아래 API폴더안에 새로운 파일들을 배치시키면 그 파일들은 API Routes로서 웹페이지를 정의하는 파일이 아닌 API 응답을 정의하는 코드로 설정이 된다.
*/