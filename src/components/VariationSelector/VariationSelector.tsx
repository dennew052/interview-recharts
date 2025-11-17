import styles from './VariationSelector.module.css';

interface Props {
  variations: { id?: number; name: string }[];
  enabled: Record<string, boolean>;
  toggle: (id: string | number) => void;
}

export function VariationSelector({variations, enabled, toggle}: Props) {
  return (
    <div className={styles.wrapper}>
      {variations.map(v => {
        const id = v.id ?? 0;

        return (
          <label key={id} className={styles.item}>
            <input
              type="checkbox"
              checked={enabled[id]}
              onChange={() => toggle(id)}
            />
            <span>{v.name}</span>
          </label>
        );
      })}
    </div>
  );
}
