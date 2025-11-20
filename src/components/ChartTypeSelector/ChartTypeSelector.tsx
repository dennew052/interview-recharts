import styles from "./ChartTypeSelector.module.css";

export type ChartMode =
  | "line"
  | "monotone"
  | "natural"
  | "step"
  | "area"
  | "fat";

interface Props {
  mode: ChartMode;
  onChange: (m: ChartMode) => void;
}

export function ChartTypeSelector({ mode, onChange }: Props) {
  const types: { id: ChartMode; label: string }[] = [
    { id: "line", label: "Line" },
    { id: "monotone", label: "Smooth" },
    { id: "natural", label: "Natural" },
    { id: "step", label: "Step" },
    { id: "area", label: "Area" },
    { id: "fat", label: "Fat Line" },
  ];

  return (
    <div className={styles.wrapper}>
      {types.map(t => (
        <button
          key={t.id}
          className={mode === t.id ? styles.active : ""}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
