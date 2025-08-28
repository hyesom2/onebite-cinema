import styles from '@/pages/index.module.css';
import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import type { InferGetStaticPropsType } from 'next';
import fetchMovies from '@/lib/fetch-movies';
import fetchRandomMovies from '@/lib/fetch-random-movies';
import Head from 'next/head';
// 참고) next/document 로 부터 불러와지믄 Head는 _document.tsx에서 사용

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
    <>
      <Head>
        <title>한입씨네마</title>
        <meta property='og:image' content='/thumbnail.png' />
        <meta property='og:title' content='한입씨네마' />
        <meta property='og:description' content='한입씨네마에 등록된 영화들을 만나보세요.' />
      </Head>
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
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{ page }</SearchableLayout>
}

/* 
  * Next.js 에서 SEO 설정하기
  : Next.js에서는 각 페이지 별로 mete 태그를 별도로 설정해 줄 수 있다.
*/