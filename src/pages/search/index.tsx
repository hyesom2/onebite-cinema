import { ReactNode } from 'react';
import { useRouter } from 'next/router'
import styles from '@/pages/search/index.module.css';
import SearchableLayout from '@/components/searchable-layout';
import MovieItem from '@/components/movie-item';
import movies from '@/mock/dummy.json';

export default function Page() {
  const router = useRouter();
  const q = router.query.q as string;

  const filteredMovies = movies.filter((movie) => movie.title.includes(q));

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