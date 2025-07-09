import styles from "../page.module.css";
import BreweryTable from '../../components/BreweryTable'; 

export default function BreweriesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BreweryTable />
      </main>
    </div>
  );
}