import { getCurrentDate } from './getCurrentDate';
import { getLanguageCode } from './getLanguageCode';

export async function fetchFinancialIndicators() {
  const queryDate = getCurrentDate();
  const languageCode = getLanguageCode();

  const response = await fetch('http://localhost:4321/api/financial-indicators', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      PluginName: 'quotify',
      ServiceName: 'quantify-service',
      ServiceAction: 'indicadores-data',
      BodyData: {
        language_code: languageCode,
        query_date: queryDate
      },
      DataContext: null
    })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}
