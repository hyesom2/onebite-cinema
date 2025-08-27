// > CSS Modules
import styles from '@/pages/index.module.css';
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import type { InferGetStaticPropsType } from 'next';
import fetchMovies from '@/lib/fetch-movies';
import fetchRandomMovies from '@/lib/fetch-random-movies';

export const getStaticProps = async () => {  
  const [allMovies, recoMovies] = await Promise.all([fetchMovies(), fetchRandomMovies()]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
  }
}

export default function Home({ allMovies, recoMovies }: InferGetStaticPropsType<typeof getStaticProps>) {
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
  *index.tsx(Home) SSG로 적용
  - 실시간으로 변화할 데이터가 딱히 없음
  - build 시, 미리 렌더링하여 사용자에게 빠른 로딩 속도를 제공
*/