import "@/styles/globals.css";
import { ReactNode } from 'react';
import type { AppProps } from "next/app";
import GlobalLayout from '@/components/global-layout';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
}

export default function App({ Component, pageProps }: AppProps & {
  Component: NextPageWithLayout
}) { 
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <GlobalLayout>
      { getLayout(<Component {...pageProps} />) }
      {/*
        getLayout이라는 함수에 의해 현재 페이지 역할을 하는 컴포넌트가 SearchableLayout으로 감싸진 형태로 렌더링
      */}
    </GlobalLayout>
  )
}

/*
  * SearchableLayout으로 감싸버리면 모든 페이지에 공통레이아웃으로 적용되어버림
  <GlobalLayout>
    <SearchableLayout>
      <Component {...pageProps} />
    </SearchableLayout>
  </GlobalLayout>

  * index페이지로 접속 요청을 보내면 어떻게 될까?
  1. app컴포넌트가 실행이 되면서 이 때, Component이름의 props로 index.tsx에 Home컴포넌트가 전달
  2. Home.getLayout 메서드도 함꼐 전달 된다.
  참고) console.log(Component.getLayout)을 하면 getLayout이라는 메서드로 설정한 함수가 출력이 된다.
  → getLayout메서드가 app컴포넌트로 잘 전달 되었다는 뜻

  * getLayout 메서드가 없는 컴포넌트는 오류가 발생
  : const getLayout = Component.getLayout 이 undefined이 되기 때문에 함수를 호출하려고 해서 오류가 발생하는 것
  : getLayout이라는 메서드가 추가되지 않은 페이지의 경우 "예외처리"를 해주자 → const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  * getLayout의 타입 오류 해결방법
  : NextComponent타입에 getLayout속성이 없습니다. 라는 메세지 출력 → getLayout은 임의로 만든 메서드이기 때문에 오류가 발생
  : NextComponent타입에 getLayout의 타입 정보를 추가해주면 된다.
  type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode;
  }
  1. 타입 생성
  → type NextPageWithLayout(타입별칭)
  2. NextPage : next.js에서 제공하는 페이지 컴포넌트의 기본 타입으로 설정
  3. 교집합 &
  4. getLayout 메서드의 타입 정보 : page라는 매개변수를 받는데, ReactNode라는 타입이면서 page를 return하기 때문에 반환값이 ReactNode로 같음
  5. getLayout이 없을 수도 있기 때문에 optional한 ?를 추가
*/