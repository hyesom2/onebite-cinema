import styles from '@/pages/search/index.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import fetchMovies from '@/lib/fetch-movies';
import { MovieData } from '@/types';
import Head from 'next/head';

export default function Page() {
  const [filteredMovies, setFilteredMovies] = useState<MovieData[]>([]);
  const router = useRouter();
  const q = router.query.q as string; 

  const fetchSearchMovies = async () => {
    const movies = await fetchMovies(q as string);
    setFilteredMovies(movies);
  }

  useEffect(() => {
    if (q) {
      fetchSearchMovies();
    }
  }, [q]);

  return (
    <>
      <Head>
        <title>한입씨네마 - 검색결과</title>
        <meta property='og:title' content='한입씨네마 - 검색결과' />
        <meta property='og:image' content='/thumbnail.png' />
        <meta property='og:description' content='한입씨네마에 등록된 영화들을 만나보세요.' />
      </Head>
      <div className={styles.container}>
        {
          filteredMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)
        }
      </div>
    </>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{ page }</SearchableLayout>
}