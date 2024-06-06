import SearchResults from "@/lib/SearchResults";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchResults styles={styles} />
    </main>
  );
}
