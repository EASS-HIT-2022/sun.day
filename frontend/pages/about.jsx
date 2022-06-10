import styles from "../styles/Home.module.css";
import Link from "next/link";

function about() {
  return (
    <div className={styles.container}>
      <h1>About</h1>
      <ul>
        <li>
          <Link href="/home">Home</Link>
        </li>
      </ul>
    </div>
  );
}

export default about;
