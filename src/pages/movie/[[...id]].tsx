import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter();
  const {id} = router.query;
  /* URL Parameter도 query string과 똑같은 방식으로 router 객체에 저장된다. */

  return (
    <>
      <h1>Movie 페이지</h1>
      <h2>{id} 영화 상세 페이지</h2>
    </>
  )
}

/*
  * [id] : /movie/:id → 딱 하나의 id값만 전달이 되는 경로에만 대응
  ex) /movie/100 → 100과 같은 가변적인 값(URL Parameter)을 포함하는 동적 경로를 사용
  : URL Parameter를 사용하영 동적 경로를 갖는 페이지를 생성하려면 [id].tsx라는 이름으로 파일을 만든다.
  
  * [...id] : /movie/:id/:id/... → 여러개의 id가 전달되는 경로에 대응
  ex) /movie/100/101/102/103/... 
  → Catch All Segment : 모든 구간에 다 대응하는 페이지를 만든다.
  → 전달된 여러 개의 URL Parameter는 컴포넌트의 id라는 변수에 배열 형태로 전달된다.

  * [[...id]] : /movie
  → Optional Catch All Segment
  → /movie 뒤에 어떤 경로가 들어오든 안 들어오든 모두 다 범용적으로 대응
*/

