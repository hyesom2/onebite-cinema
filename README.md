
# ※ Page Router의 장점
### 1. 파일 시스템 기반의 간편한 페이지 라우팅 제공
- Page Router의 기본 경로
```
pages
 ┣ search
 ┃ ┗ index.tsx -------------→ /search
 ┣ test.tsx ----------------→ /test
 ┗ index.tsx ---------------→ /
```
- 동적 경로(Dynamic Routes)
```
pages
┗ movie
  ┗ [id].tsx --------------→ /movie/1
                             /movie/2
                               ...
                             /movie/100
```
- Catch All Segment
```
pages
┗ movie
  ┗ [...id].tsx ----------→ /movie/1
                            /movie/2/34
                            /movie/345/6789/1000
```
- Optional Catch All Segment : index페이지까지 포함 + 중첩된 URL 파라미터 대응
```
pages
┗ movie
  ┗ [[...id]].tsx ----------→ /movie
                              /movie/1
                                 ...
                              /movie/345/6789/1000
```
---
### 2. 다양한 방식의 사전 렌더링 제공
- Next.js는 기존의 React앱이 갖던 느린 FCP라는 단점을 효과적으로 해결하기 위해 브라우저로부터 접속 요청을 받았을 때 서버 측에서 직접 JavaScript코드를 실행해서 완성된 HTML페이지를 미리 생성해 브라우저에게 응답함으로써 FCP를 효과적으로 단축하는 사전 렌더링 방식으로 동작한다.
1. 서버 사이드 렌더링(`SSR`, Server Side Rendering)<br />
: 요청이 들어올 때 마다 사전 렌더링을 진행함<br />
: 브라우저가 Next서버에게 접속 요청을 보낼 때 마다 새롭게 페이지를 생성해서 반환<br />
: `getServerSideProps`함수를 사용하여 각 요청 시 서버에서 실행되어 데이터를 가져오고, 해당 데이터를 페이지 컴포넌트에 `props`로 전달하여 SSR페이지를 렌더링한다.
- 장점 : 항상 최신의 데이터를 보장
- 단점 : 페이지를 새롭게 생성하는 과정에서 또 다른 백엔드 서버에게 데이터를 요청해야 한다면 이 때 발생하는 응답 속도가 크게 느려지게 될 수 있음 
2. 정적 사이트 생성(`SSG`, Static Site Generation)<br />
: 빌드 타임에 미리 페이지를 사전 렌더링 해 두기 때문에 속도가 빠름 (SSR 단점 해결)<br />
- 장점 : 사전 렌더링에 많은 시간이 소요되는 페이지더라도 사용자의 요청에는 매우 빠른속도로 응답 가능
- 단점 : 매번 똑같은 페이지만 응답함, 최신 데이터 반영은 어려움
3. 증분 정적 재생성(`ISR`)<br />
: SSG 페이지를 일정 시간마다 재생성 (SSG의 단점 해결)<br />
: 특정 행동 이후에만 페이지를 다시 생성을 해야하는 상황에서는 `On-Demand`라는 방식으로 Next서버에게 `Revalidate`요청을 보내서 `페이지를 즉각적으로 다시 생성`할 수 있다.
- 장점 : SSG 방식 그대로 응답하다가 시간이 되면 다시 페이지를 만들어서 `최신 데이터를 반영`하도록 설정할 수 있다.

# ※ Page Router의 단점
### 1. 페이지 별 레이아웃 설정이 번거롭다.
```
> _app.tsx

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
    </GlobalLayout>
  )
}
```
```
> index.tsx

export default function Home() {
  ...
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{ page }</SearchableLayout>
}
```
- 레이아웃이 적용되길 원하는 페이지마다 `getLayout 메서드`를 매번 추가 해줘야한다.
- 페이지별 레이아웃의 설정이 많아지게 되면서 `코드의 중복 발생`,`불필요하게 복잡하고 어려운 느낌`이 있다.
--- 
### 2. 데이터 패칭이 페이지 컴포넌트에 집중된다.
```
> index.tsx

export const getServerSideProps = async () => {
  // 1. 백엔드 서버로부터 데이터 불러오기
  const [allMovies, recoMovies] = await Promise.all([fetchMovies(), fetchRandomMovies()]);

  // 2. 페이지 컴포넌트에게 Props로 데이터 전달
  return {
    props: {
      allMovies,
      recoMovies,
    },
  }
}

// 3. props로 받은 데이터를 수신받아 자유롭게 사용
export default function Home({ allMovies, recoMovies }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      ...
    </>
  )
}
```
- 특정 페이지에 필요한 데이터를 사전 렌더링 과정에서 서버 측에서 불러오도록 설정하려면 `getServerSideProps` 또는 `getStaticProps`같은 함수들을 이용해야 한다.
- `사전 렌더링 과정에서 불러온 데이터가 props로 페이지 컴포넌트에만 전달`이 되기 때문에 해당 페이지 안에 여러 컴포넌트가 존재할 때 데이터를 전달하는 과정이 복잡하다.
---
### 3. 불필요한 컴포넌트들도 JS Bundle에 포함된다.
<img src="https://github.com/user-attachments/assets/196e575c-f69f-4e99-8894-4efb9a50c28e" alt="출처 : 한 입 크기로 잘라먹는 Next.js(v15)" />

<span>&lt;출처 : 한 입 크기로 잘라먹는 Next.js(v15)&gt;</span>
- Next.js 앱의 사전 렌더링 과정 중 FCP(최초로 화면의 컨텐츠가 렌더링)시점 이후, Next서버가 브라우저에게 Hydration을 위해 모든 컴포넌트들을 JavaScript Bundle로 묶어서 전달한다.
- 이 과정에서 브라우저에게 전달할 필요가 없는 `불필요한 컴포넌트`들도 함께 포함되어서 전달하게 된다.
- `불필요한 컴포넌트`란?<br />
: 상호작용을 하는 기능이 없기 때문에 브라우저에서 한 번 더 실행이 되어서 Hydration이 될 필요가 없는 컴포넌트들
