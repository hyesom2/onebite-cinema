import { ReactNode, useEffect, useState } from 'react';
import styles from '@/components/searchable-layout.module.css';
import { useRouter } from 'next/router';

export default function SearchableLayout({ children }: { children: ReactNode }) {
  // 페이지 컴포넌트를 전달 받기 위해 children을 props로 받음
  const router = useRouter();  
  const [search, setSearch] = useState("");

  const q = router.query.q as string;
  
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  }

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  return (
    <div>
      <div className={styles.search_container}>
        <input
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          placeholder="검색어를 입력하세요."
        />
        <button type="button" onClick={onSubmit}>검색</button>
      </div>
      {children}
      {/* 페이지 컴포넌트 렌더링 */}
    </div>
  )
}