import Image from "next/image";
import styles from "./page.module.css";
import ProductTable from "./ProductTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductTable />
    </main>
  );
}
