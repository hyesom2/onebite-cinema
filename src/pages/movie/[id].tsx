// > CSS Modules
import styles from '@/pages/movie/[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchDetailMovies from '@/lib/fetch-detail-movies';
import { useRouter } from 'next/router';

export const getStaticPaths = () => {
  return {
    paths: [
      {params: { id: '1'}},
      {params: { id: '2'}},
      {params: { id: '3'}},
    ],
    fallback: true,
    /* 
      * fallback 옵션 설정(없는 경로로 요청 시)
      - true : 즉시 생성 + 페이지만 미리 반환
      1. props가 없는 페이지 반환 : getStaticProps로 부터 받은 데이터가 없는 페이지 → 데이터가 없는 상태의 페이지 렌더링
      2. props 계산
      3. props만 따로 반환 → 데이터가 있는 상태의 페이지 렌더링
      - false : 404 Not Found 반환
      - blocking : 즉시 생성 (Like SSR) → 빌드 타임에 사전에 생성해 두지 않았던 페이지까지 사용자에게 제공해 줄 수 있다.

      * fallback 상태 : 페이지 컴포넌트가 아직 server로 부터 데이터를 전달받지 못한 상태
    */
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchDetailMovies(Number(id));

  // * movie가 존재하지 않는 페이지로 들어왔을 때 NotFound로 이동하고 싶을 때
  if (!movie) {
    return {
      notfound: true
    }
  }
  
  return {
    props: {
      movie
    }
  }
}

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  // * 컴포넌트가 fallback 상태일 때
  const router = useRouter();
  if (router.isFallback) return "로딩 중 입니다.";
  if (!movie) return "문제가 발생했습니다. 다시 시도해주세요.";

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