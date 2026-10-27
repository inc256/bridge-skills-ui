import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type ThemeMode = "light" | "dark" | "system";

const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
} | null>(null);

const THEME_STORAGE_KEY = "bridge-skills-theme";

function getStoredTheme(): ThemeMode {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : "system";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);

  useLayoutEffect(() => {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark = theme === "dark" || (theme === "system" && colorScheme.matches);
      document.documentElement.classList.toggle("dark", isDark);
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    };

    applyTheme();
    if (theme === "system") colorScheme.addEventListener("change", applyTheme);

    return () => colorScheme.removeEventListener("change", applyTheme);
  }, [theme]);

  useLayoutEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function ThemeSelect() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeSelect must be rendered inside ThemeProvider");
  const options = [
    { value: "system", label: "System", Icon: Monitor },
    { value: "light", label: "Light", Icon: Sun },
    { value: "dark", label: "Dark", Icon: Moon },
  ] as const;

  return (
    <div
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1"
      role="group"
      aria-label="Color theme"
    >
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={`${label} theme`}
          aria-pressed={context.theme === value}
          title={`${label} theme`}
          onClick={() => context.setTheme(value)}
          className={`grid h-8 w-8 place-items-center rounded-md transition-colors ${
            context.theme === value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

export function ThemeSettings() {
  return (
    <section className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Appearance</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose light, dark, or follow your device setting.
        </p>
      </div>
      <ThemeSelect />
    </section>
  );
}
