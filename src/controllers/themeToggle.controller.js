export const theme = (() => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
  }
  return "light";
})();

if (theme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark");
}

window.localStorage.setItem("theme", theme);

const handleToggleClick = () => {
  const element = document.documentElement;
  const isDark = element.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Evento personalizado
  const event = new CustomEvent('themeChange', { detail: { isDark } });
  window.dispatchEvent(event);
};

// Seleccionar todos los botones con el id "themeToggle"
document
  .querySelectorAll("#themeToggle")
  .forEach(button => button.addEventListener("click", handleToggleClick));
