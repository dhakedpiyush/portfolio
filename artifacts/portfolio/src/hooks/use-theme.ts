export function useTheme() {
  if (typeof window !== "undefined") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  return { theme: "dark" as const, toggleTheme: () => {} };
}
