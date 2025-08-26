// > CSS Modules
import styles from '@/pages/search/index.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import fetchMovies from '@/lib/fetch-movies';
import { MovieData } from '@/types';


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
      // 검색 결과를 불러오는 로직
      fetchSearchMovies();
    }
  }, [q]);
  /* 
    * getServerSideProps와 getStaticProps가 없기 때문에 기본적으로 SSG방식으로 동작하는 페이지
  */

  return (
    <div className={styles.container}>
      {
        filteredMovies.map((movie) => <MovieItem key={movie.id} {...movie} />)
      }
    </div>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{ page }</SearchableLayout>
}