// > CSS Modules
import styles from '@/pages/index.module.css';
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import type { InferGetStaticPropsType } from 'next';
import fetchMovies from '@/lib/fetch-movies';
import fetchRandomMovies from '@/lib/fetch-random-movies';

// * SSG 방식
export const getStaticProps = async () => {
  // getServerSideProps 함수와 동일하게 사전 렌더링 과정에서 필요한 데이터를 불러온 다음, 데이터를 props로 컴포넌트에게 전달하는 역할

  console.log('index 페이지'); // SSG방식이 작동되는지 확인하려면 개발모드(npm run dev)가 아닌 실제 프로덕션 모드(npm run build)로 실행
  
  const [allMovies, recoMovies] = await Promise.all([fetchMovies(), fetchRandomMovies()]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  }
}

export default function Home({ allMovies, recoMovies }: InferGetStaticPropsType<typeof getStaticProps>) {
  // InferGetStaticPropsType : getStaticProps라고 만든 함수의 반환값 타입을 자동으로 추론해서 props의 타입으로 설정해주는 역할

  return (
    <div className={styles.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={styles.recommend_movie}>
          {recoMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={styles.register_movie}>
          {allMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{ page }</SearchableLayout>
}

/* 
  * SSG(Static Site Generation, 정적 사이트 생성)
  : SSR의 단점을 해결하는 사전 렌더링 방식
  : 빌드 타임에 미리 페이지를 사전 렌더링 해 둠

  1. Next.js 앱을 npm run build 명령어로 빌드
  2. 빌드 타임에 미리 사전 렌더링을 진행 → 페이지를 미리 딱 한 번만 생성한다. → 그리고나서 다시는 더 이상 새롭게 페이지를 생성하지 않음
  3. 브라우저가 접속 요청을 보냄 → Next.js 서버는 빌드 타임에 미리 만들어 두었던 페이지(사전 렌더링이 마친 페이지)를 지체없이 바로 응답 → 사용자들은 매우 빠른 시간안에 완성된 화면을 볼 수 있음
  즉, 백엔드 서버에서 데이터를 추가로 불러와야 하는 상황(매우 오래걸리는 작업)이 발생해도 사용자 경험에는 아무런 영향X
  
  장점)
  - 사전 렌더링이 많은 시간이 소요되는 페이지더라도 사용자의 요청에는 매우 빠른속도로 응답 가능

  단점)
  - 다시는 페이지를 새롭게 사전 렌더링 하지 않음(페이지를 새롭게 생성하지 않음) → 접속 요청을 보내게 되더라도 매번 똑같은 페이지만 응답
  - 최신 데이터를 반영하기에는 많이 어려움
*/

/* 
  * npm run build 시 
  - ● (흰색 원)
  1. (SSG) prerendered as static HTML (uses getStaticProps)
  2. 페이지가 SSG방식으로 동작
  3. HTML로 사전 렌더링 된 페이지
  4. getStaticProps를 사용하여 데이터를 불러오는 정적 페이지
  
  - ○ (구멍)
  1. Static) prerendered as static content
  2. 기본값으로 설정된 SSG(정적 페이지)
  3. 아무것도 적용되어있지 않은 페이지들은 기본값으로 정적인 페이지로 build타임에 미리 사전 렌더링하도록 설정
  4. default 사전 렌더링 방식
  
  - f
  1. (Dynamic) server-rendered on demand
  2. 다이나믹 페이지(= 동적인 페이지)
  3. 브라우저로 부터 요청을 받을 때 마다 동적으로 페이지가 계속 사전 렌더링이 된다.
  4. Next.js는 기본적으로 모든 API Routes들을 동적(SSR)로 작동하도록 설정

  즉, SSG를 설정하는 getStaticProps 또는 SSR를 설정하는 getServerSideProps가 없을 경우 기본적으로 SSG 페이지로 설정된다.
*/