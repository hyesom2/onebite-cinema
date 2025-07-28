import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  const onClickButton = () => {
    router.push('/test');
  }
  
  return (
    <>
      <header>
        <Link href={'/'}>Home</Link>
        &nbsp;
        <Link href={'/search'}>Search</Link>
        &nbsp;
        <Link href={'/movie'}>Movie</Link>
        <div>
          <button onClick={onClickButton}>test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  )
}

/* 
  ※ 페이지 이동
  - <a>태그 
  : CSR방식으로 페이지를 이동시키는 것이 아닌 일방적인 방식
  : 즉, 서버에게 새로운 페이지를 매번 다시 요청하는 방식 → 비교적 느린 방식
  
  - <Link> 컴포넌트 이용
  : CSR방식
  : Next.js에서 자체적으로 제공하는 내장 컴포넌트
  : <a>태그와 사용법이 같음
  : <Link href="이동할경로">링크 텍스트</Link>

  - Programmatic Navigation(프로그래매틱한 페이지 이동)
  : CSR방식
  : 어떤 함수가 실행된다거나 이벤트가 발생했을 때 페이지를 이동
  : 특정 버튼이 클릭되었거나 특정 조건이 만족했을 경우에 함수 내부에서 페이지를 이동시키는 방법
  1. useRouter를 불러온다. → import { useRouter } from 'next/router';
  2. router 변수로 useRouter객체 받아온다. → const router = useRouter();
  3. 함수 안에서 router의 push 메서드를 호출, 인수로는 문자열로 이동할 경로를 적어준다. → router.push('/test');
  4. 만든 함수를 onClick안에 넣어준다. → onClick={onClickButton}

  참고) router객체의 메서드
  1. push : 페이지 이동
  2. replace : 뒤로가기를 방지하며 페이지 이동
  3. back : 페이지를 뒤로 이동
*/