import { ReactNode } from 'react';
import { useRouter } from 'next/router'
import SearchableLayout from '@/components/searchable-layout';

export default function Page() {
  const router = useRouter();
  const { q } = router.query;

  return (
    <>
      <h1>Search 페이지</h1>
      <h2>검색 결과 : { q }</h2>
    </>
  )
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{ page }</SearchableLayout>
}