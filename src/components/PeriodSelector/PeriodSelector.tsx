import styles from './PeriodSelector.module.css';

export type PeriodMode = "day" | "week";

interface Props {
  mode: PeriodMode;
  setMode: (m: PeriodMode) => void;
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
