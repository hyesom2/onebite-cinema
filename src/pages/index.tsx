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
    revalidate: 3, // revalidate : 재검증
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
  * ISR(Incremental Static Regeneration, 증분 정적 재생성)
  - SSG방식으로 생성된 정적 페이지를 일정 시간 주기로 다시 생성하는 기술
  - 빠른 속도로 응답(SSG의 장점) + 최신 데이터 반영(SSR의 장점)
*/