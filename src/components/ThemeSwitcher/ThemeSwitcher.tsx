import { useContext } from "react";
import { ThemeContext, type ThemeContextType } from "../../context/ThemeContext";
import styles from "./ThemeSwitcher.module.css";

export function ThemeSwitcher() {
  const { theme, toggle } = useContext<ThemeContextType>(ThemeContext);

  return (
    <button onClick={toggle} className={styles.btn}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
