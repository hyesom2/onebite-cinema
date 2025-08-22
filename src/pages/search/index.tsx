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
    const movies = await fetchMovies(q);
    setFilteredMovies(movies);
  }

  useEffect(() => {
    if (q) {
      fetchSearchMovies();
    }
  }, []);
  

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