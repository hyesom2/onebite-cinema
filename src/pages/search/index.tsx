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
      fetchSearchMovies();
    }
  }, [q]);

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

/* 
  * search 페이지 SSG + CSR로 적용
  - CSR : 사용자가 입력하는 값에 따라 결과가 달라지므로, 검색데이터는 클라이언트 측에서 동적으로 받아온다.
  - SSG : 페이지의 레이아웃과 UI는 크게 변화하지 않으므로, 화면은 SSG 방식으로 렌더링 된다.
*/