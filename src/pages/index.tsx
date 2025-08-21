import { ReactNode, useEffect } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import styles from '@/pages/index.module.css';
import movies from '@/mock/dummy.json';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  
  console.log('SSR props 입니다.');
  // 함수는 서버측에서만 실행이 되기 때문에 브라우저에는 출력이 안된다.
  // 요청이 들어올 때 마다 VSCode의 터미널에 출력된다.

  /*
    window.location;
    : ReferenceError: window is not defined 오류발생 → 아래의 Home 컴포넌트와도 같음
    
    why?
    1. window는 즉 브라우저이를 의미
    2. 서버 환경에서만 실행되는 getServerSideProps 함수 안에서는 브라우저를 읽을 수 없음
    
    따라서, window가 undefined가 되어버리고 undefined.location이 되는 것 → window.confirm, window.alert 등 똑같음

    해결) 브라우저 측에서만 실행되는 방법
    1. useEffect 사용
    useEffect(() => {
      console.log(window);
    }, []);
  */
  
  const data = 'hello';
  
  return {
    props: {
      data,
    },
  }
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // InferGetServerSidePropsType : getServerSideProps 함수의 반환값 타입을 자동으로 추론해주는 기능의 타입

  useEffect(() => {
    console.log(window);
  }, []);

  return (
    <div className={styles.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={styles.recommend_movie}>
          { movies.slice(0, 3).map((movie) => <MovieItem key={movie.id} {...movie} />) }
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={styles.register_movie}>
          {movies.map((movie) => <MovieItem key={movie.id} {...movie} />)}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{ page }</SearchableLayout>
}

/* 
  * SSR(서버 사이드 렌더링, Server Side Rendering)
  : 가장 기본적인 사전 렌더링 방식
  : 요청이 들어올 때 마다 사전 렌더링을 진행
*/