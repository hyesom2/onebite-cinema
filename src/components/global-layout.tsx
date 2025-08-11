import { ReactNode } from 'react';
import Link from 'next/link';
import styles from '@/components/global-layout.module.css';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={'/'}>🎬 ONEBITE CINEMA</Link>
      </header>
      <main className={styles.main}>
        { children }
      </main>
      <footer className={styles.footer}>제작 @Hyesom2</footer>
    </div>
  )
}