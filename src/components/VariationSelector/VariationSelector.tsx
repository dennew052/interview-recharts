import styles from './VariationSelector.module.css';

interface Variation {
  id?: number;
  name: string;
}

interface Props {
  variations: Variation[];
  enabled: Record<number, boolean>;
  toggle: (id: number) => void;
}

export function VariationSelector({ variations, enabled, toggle }: Props) {
  return (
    <div className={styles.wrapper}>
      {variations.map(v => {
        const id = v.id ?? 0;

        return (
          <label key={id} className={styles.item}>
            <input
              type="checkbox"
              checked={!!enabled[id]}
              onChange={() => toggle(id)}
            />
            <span>{v.name}</span>
          </label>
        );
      })}
    </div>
  );
}
