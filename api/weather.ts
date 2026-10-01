import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { city, lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (typeof city !== 'string') {
    console.log(`WEATHER.TS: Variável da cidade não é uma string, ou está vazio.`)
    if (!city && !lat && !lon) {
      console.log(`WEATHER.TS: Não há nenhum valor nas variáveis de cidade, latitude e longitude, abortando consulta.`)
      return res.status(400).json({ error: 'Entada inválida ou não informada' });
    }
  }
  try {
    let apiUrl = ''
    if (lat && lon) {
      apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      console.log(`WEATHER.TS: Escolhido pela busca por Geolocalização reversa.`)
    } else if (city) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      console.log(`WEATHER.TS: Escolhido pela busca pelo nome da cidade.`)
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(`WEATHER.TS: Busca bem-sucedida.`)
    return res.status(200).json(data);
  } catch (error) {
    console.log(`WEATHER.TS: Houve um erro na consulta da API! Verifique Logs.`)
    return res.status(500).json({ error: 'Erro ao buscar dados.' });
  }
}