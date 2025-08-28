import styles from '@/pages/movie/[id].module.css';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import fetchDetailMovies from '@/lib/fetch-detail-movies';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
      notFound: true
    };
  }
  
  return {
    props: {
      movie
    }
  };
};

export default function Page({ movie }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
  /* 
    * 현재 movie 페이지는 동적 경로를 갖는 SSG 페이지 이다.
    - build 타임에 생성되지 않는 경로로 접속 요청을 하게 될 경우, meta 태그들은 빠져있다. → SEO 설정이 안됨
    - fallback 상태일 경우에도 meta 태그들을 추가하자.
  */
    return (
      <>
        <Head>
          <title>한입씨네마</title>
          <meta property='og:image' content='/thumbnail.png' />
          <meta property='og:title' content='한입씨네마' />
          <meta property='og:description' content='한입씨네마에 등록된 영화들을 만나보세요.' />
        </Head>
        <div>로딩 중 입니다...</div>
      </>
    );
  }
  if (!movie) return "문제가 발생했습니다. 다시 시도해주세요.";

  const { id, title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl } = movie;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta property='og:image' content={posterImgUrl} />
        <meta property='og:description' content={description} />
      </Head>
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
    </>
  )
}
