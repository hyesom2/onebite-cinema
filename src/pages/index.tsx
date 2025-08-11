import styles from './index.module.css';

export default function Home() {
  return (
    <>
      <h1 style={{ color: "blue" }}>index 페이지</h1>
      <h2 className={styles.name}>ONEBITE CINEMA</h2>
    </>
  );
}

/* 
  * 스타일링
  1. 인라인 스타일 : HTML요소가 많아지면 가독성이 안좋아짐
  → <h1 style={{ color: "blue" }}>
  
  2. CSS 파일을 별도로 생성 : Failed to compile 발생
  → global CSS 파일은 App컴포넌트가 아닌 곳에서는 불러올 수 없음
  → class 이름들이 서로 충돌되는 문제가 발생할 수 있기 때문
  → import './index.css';

  3. CSS Module
  → 기존의 CSS 파일을 마치 모듈처럼 사용할 수 있도록 도와줌
  → CSS파일에 작성해둔 class 이름들이 다른 CSS파일과 중복되지 않도록 자동으로 유니크한 이름으로 변환
  → import styles from './index.module.css';
  → <h2 className={styles.name}>
*/
