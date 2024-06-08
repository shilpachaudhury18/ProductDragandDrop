import styles from "./page.module.css";
import ProductTable from "./ProductTable/DraggableTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductTable />
    </main>
  );
}
