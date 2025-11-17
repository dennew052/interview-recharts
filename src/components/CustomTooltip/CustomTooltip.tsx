import styles from './CustomTooltip.module.css';

interface Props {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: Props) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.dateIcon}>📅</span>
        <span className={styles.date}>{label}</span>
      </div>

      <div className={styles.items}>
        {payload.map((item, i) => (
          <div key={i} className={styles.row}>
            <span
              className={styles.dot}
              style={{ backgroundColor: item.color }}
            />
            <span className={styles.name}>{item.name}</span>

            {isMaxValue(item, payload) && (
              <span className={styles.trophy}>🏆</span>
            )}

            <span className={styles.value}>
              {item.value.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function isMaxValue(item: any, payload: any[]) {
  const max = Math.max(...payload.map(p => p.value));
  return item.value === max;
}
