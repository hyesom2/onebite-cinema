import { useRouter } from 'next/router'
/* 
  ※ useRouter hook
  : next/router 패키지로부터 불러와준다.
  : next/navigation 패키지로 부터 불러오면 안된다. → App Router에서 사용되는 패키지(현재는 Page Router이기 때문에 호환성, 버전 문제 때문)
*/

export default function Page() {
  const router = useRouter(); /* router 변수 안에 router객체 저장 : 대부분의 라우팅과 관련된 정보가 저장되어 있다. */
  console.log(router);
  /* 
    ※ console message가 2번 출력되는 이유?
    : Next.js 앱이 query string을 읽는 과정 중에 컴포넌트를 한 번 더 렌더링 시키기 때문
    : 첫 번째로 출력된 query string 메세지에는 아직 query string을 읽어오지 못했기 때문에 query에 빈 객체가 출력된다.
    : 두 번째로 출력된 query string 메세지에는 query string이 잘 읽어온다.
  */
  const { q } = router.query; /* 구조분해할당, 또는 const q = router.query.q; */

  return (
    <>
      <h1>Search 페이지</h1>
      <h2>검색 결과 : { q }</h2>
    </>
  )
}