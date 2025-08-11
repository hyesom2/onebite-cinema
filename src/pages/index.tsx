import { ReactNode } from 'react';
import SearchableLayout from '@/components/searchable-layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <>
      <h1 style={{ color: "blue" }}>index 페이지</h1>
      <h2 className={styles.name}>ONEBITE CINEMA</h2>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{ page }</SearchableLayout>
  // page : 현재의 페이지 역할을 할 컴포넌트를 받아와서 SearchableLayout이 적용된 페이지를 리턴해주는 함수가 된다.
}

/* 
  * 개별 페이지에 레이아웃을 별도로 적용하는 방법
  : SearchableLayout처럼 특정 페이지에만 적용되길 원하는 레이아웃을 적용시키려면
  1. 적용시키려는 컴포넌트(ex. Home컴포넌트)에 getLayout 메서드 추가 → Home.getLayout
  2. page 라는 매개변수를 받음 → (page: ReactNode)
  → type이 ReactNode인 이유 : next에서는 모든 페이지가 리액트 컴포넌트 이기 때문에
  3. page매개변수를 SearchableLayout으로 감싼 형태로 return하도록 설정 → return <SearchableLayout>{ page }</SearchableLayout>

  * 어떻게 메서드를 또 추가를 한 것일까?
  : JavaScript의 모든 함수들은 다 "객체"이기 때문에 메서드를 추가할 수 있다.
*/