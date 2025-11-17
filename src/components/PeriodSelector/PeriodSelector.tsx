import styles from './PeriodSelector.module.css';

interface Props {
  mode: "day" | "week";
  setMode: (m: "day" | "week") => void;
}

export function PeriodSelector({ mode, setMode }: Props) {
  return (
    <div className={styles.wrapper}>
      <button
        className={mode === "day" ? styles.active : ""}
        onClick={() => setMode("day")}
      >
        Day
      </button>

      <button
        className={mode === "week" ? styles.active : ""}
        onClick={() => setMode("week")}
      >
        Week
      </button>
    </div>
  );
}
