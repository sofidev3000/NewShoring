export function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }
