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
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const movie = await fetchDetailMovies(Number(id));

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

/* 
  * movie 페이지 SSG로 적용
  = 동적(Dynamic)으로 만들려면 getStaticPaths함수가 필요하며, 현재 이 페이지에 존재할 수 있는 경로들을 설정
  - getStaticProps 함수로 일일이 한 번씩 다 호출하여 사전에 여러 개의 페이지를 렌더링
  - getStaticPaths안에는 fallback를 사용할 수 있다.
  1. true
  2. false
  3. "blocking"
*/