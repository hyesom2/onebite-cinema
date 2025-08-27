// > CSS Modules
import styles from '@/pages/movie/[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchDetailMovies from '@/lib/fetch-detail-movies';

export const getStaticPaths = () => {
  return {
    // return으로 객체를 반환 → 객체 안에 paths라는 값으로 현재 이 페이지에 어떠한 URL 파라미터들이 존재할 수 있는지를 배열로 반환하도록 설정
    paths: [
    // URL 파라미터의 값은 반드시 문자열로만 명시해야 함 → Next.js가 정상적으로 이 경로들을 읽어와야하기 때문
      {params: { id: '1'}},
      {params: { id: '2'}},
      {params: { id: '3'}},
    ],
    fallback: false,
    // 대체, 예외상황의 대비책 → paths값에 해당하지 않는 URL로 접속하게 될 때 어떻게 할 것인지 설정하는 역할
    // false로 설정할 경우 없는페이지(Not Found)로 취급
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchDetailMovies(Number(id));
  
  return {
    props: {
      movie
    }
  }
}

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  if(!movie) return "해당 영화의 상세 페이지를 찾을 수 없습니다. 다시 시도해주세요."
  const { id, title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl } = movie;

  return (
    <div className={styles.container}>
      <div style={{ backgroundImage: `url('${posterImgUrl})` }} className={styles.cover_img_container}>
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={styles.info}>
        <h3>{title}</h3>
        <span>{releaseDate}/{genres}/{runtime}분</span>
        <span>{company}</span>
        <span>{subTitle}</span>
        <p>{description}</p>
      </div>
    </div>
  )
}

/* 
  * Error: getStaticPaths is required for dynamic SSG pages and is missing for '/movie/[...id]'. 오류 발생
  : 동적(dynamic)페이지는 getStaticPaths 라는 함수가 필요하다
  : Next.js에서 동적인 경로를 갖도록 설정이 된 페이지에서 SSG를 적용하려면 반드시 사전 렌더링이 진행되기 전에 이 페이지에 존재할 수 있는 모든 경로들을 직접 설정하는 작업을 먼저 진행해야한다.
  → 이 때 필요한 함수가 getStaticPaths : 이 페이지에 존재할 수 있는 경로들을 먼저 설정
  → getStaticProps : 함수를 일일이 한번씩 다 호출하여 사전에 여러 개의 페이지를 렌더링  
*/