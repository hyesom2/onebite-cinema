// > CSS Modules
import styles from '@/pages/movie/[...id].module.css';
import { GetServerSidePropsContext } from 'next';
import fetchDetailMovies from '@/lib/fetch-detail-movies';
import { MovieData } from '@/types';

interface MovieDetailProps {
  DetailMovie: MovieData;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;
  
  try {
    const { id } = params!;
    /* 
      * non-null assertion 연산자
      : params가 절대 undefined가 아님을 보장한다. 라고 TS에게 강제로 알려주는 것
      : TS 입장에서는 params: ParsedUrlQuery로 확정 → params.id 접근 가능
      : 
    */
    if (!id) {
      console.error(`id가 ${id}의 영화 데이터를 불러오지 못했습니다.`)
    }
    const DetailMovie = await fetchDetailMovies(Number(id));

    return {
      props: {
        DetailMovie
      }
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Page({ DetailMovie }: MovieDetailProps) {
  const { id, title, releaseDate, company, genres, subTitle, description, runtime, posterImgUrl }: MovieData = DetailMovie;

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

