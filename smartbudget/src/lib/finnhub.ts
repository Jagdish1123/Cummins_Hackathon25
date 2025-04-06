import finnhub from 'finnhub';

const api_key = import.meta.env.VITE_FINNHUB_API_KEY;
export const finnhubClient = new finnhub.DefaultApi({
  apiKey: api_key,
  isJsonMime: (mime: string) => mime.includes('json')
});

// WebSocket for real-time data
export const finnhubWS = new WebSocket(`wss://ws.finnhub.io?token=${api_key}`); 