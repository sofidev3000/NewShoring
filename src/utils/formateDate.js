export function formatDate(dateString) {
    const date = new Date(dateString);
    // Formato ejemplo: "20 de enero de 2020". Cambia 'es-ES' por el código de idioma que prefieras.
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }
