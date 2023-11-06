
import Board from "./components/chessboard/chessboard";
import styles from '@/styles/main.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <Board />
    </main>
  )
}

export default Home;