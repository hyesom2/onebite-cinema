import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  const onClickButton = () => {
    router.push('/test');
  }

  useEffect(() => {
    router.prefetch('/test');
    /*
      callback함수 안에 router객체의 prefetch라는 메서드를 호출하고 인수로는 어떤 페이지를 프리패칭 할 것인지 넣어준다.  
      router.prefetch('/페이지');
    */
  }, []); // mount되었을 때 딱 한번만 실행시킬 것 → 의존성 배열을 빈 배열로
  
  return (
    <>
      <header>
        <Link href={'/'}>Home</Link>
        &nbsp;
        <Link href={'/search'} prefetch={false}>Search</Link>
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
  * Pre-Fetching
  : 사전에,미리 - 불러온다 → 페이지를 사전에 불러온다라는 뜻
  : 현재 사용자가 보고 있는 페이지 내에서 이동할 가능성이 있는 모든 페이지들을 사전에 미리 다 불러놓는 기능
  : 빠른 페이지 이동을 위해 제공되는 기능

  - Next.js에서는 초기 접속 요청이 발생했을 때 서버가 브라우저에서 React 과정에서 사전 렌더링된 HTML페이지를 응답한 이후에 후속으로 모든 JS를 코드를 번들 파일 형태로 전달 해주기 때문에
  초기 접속 요청이 종료된 이후에 발생하게되는 페이지 이동들은 서버에게 별도의 추가적인 요청 없이 브라우저 측에서 직접 JS 코드를 실행시켜 즉, 리액트 앱을 직접 실행시켜서 필요한 컴포넌트들을 교체하는 방식
  즉, CSR방식으로 알아서 처리를 하게 된다.
  → 이런 식으로 페이지를 이동하면 브라우저가 서버에게 추가적인 리소스를 요청할 필요가 없는걸로 알고 있는데 왜 프리패칭이 필요한 것일까??
  → 이미 초기 접속 요청이 완료가 되어서 페이지가 렌더링이 됐는데 왜 그 상태에서 다른 페이지로 이동하기 위해 추가적인 데이터를 왜 불러와야 하나?
  : Next.js는 모든 JS코드들(React Component)들을 자동으로 페이지 별로 분리해서 저장을 미리 해두기 때문
  : 사전 렌더링 과정에서 JS번들파일을 전달할 때 모든 페이지에 필요한 JS코드가 다 전달되는게 아니고 현재 페이지에 해당하는 JS코드들만 딱 전달이 된다.
  
  예) /search 라는 경로로 search페이지로 접속요청을 보냈따면 다시 전달되는 JS번들파일에서는 search 페이지에 해당하는 코드들만 전달이 된다.
  그리고 이렇게 동작하는 이유는 이 과정에서 전달되는 JS코드의 양을 줄이기 위함 → 용량 경량화로 인해 Hydration시간이 단축

  - 초기 접속이 완료된 이후 곧바로 페이지 이동이 이루어지기 전에 프리패칭이 발생하여 현재 페이지에서 이동할 수 있는 모든 페이지들의 JS코드를 미리 다 사전에 불러와놓기 때문에 페이지를 이동할 때에는 결국 추가적인 데이터를 서버에게 요청할 필요가 없어져서 기존처럼 CSR방식의 장점대로 빠른 속도로 페이지를 이동시킬 수 있다.

  참고) npm run dev로 개발 모드로 가동해 놓고 있을 때에는 프리패칭이 동작하지 않는다.
  : 인터넷 창 → F12(개발자도구) → Network탭
  → 빌드에서 실행하는 "프로덕션 모드"로 실행을 시켜야 한다.
  1. npm run build 을 하면 각각 페이지별 JS번들의 용량까지 함꼐 출력
  2. npm run start로 실행 후 프리패칭 확인
  → 이미 불러와진 JS파일로 이동한다고 해도 Network 탭에서는 아무런 요청이 추가적으로 발생하지 않음

  - 예외(JS가 추가적으로 불러와짐)가 발생 → test페이지로 이동할 때!
  → Link 컴포넌트로 명시된 경로가 아니라면 프리패칭이 이루어지지 않음
  → 만약에 프리패칭을 해주고 싶다면?
  : 앱 컴포넌트가 화면에 마운트 되었을 때(화면에 처음에 그려지게 되었을 때) router 객체의 특정 메서드를 통해서 직접 프리패칭하도록 코드를 작성

  - 링크 컴포넌트의 프리패칭을 강제로 해제하는 방법
  : 링크 컴포넌트에 prefetch라는 props를 false로 설정
  <Link href={...} prefetch={false}> ... </Link>
*/