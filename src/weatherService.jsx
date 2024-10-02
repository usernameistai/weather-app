const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City ${city} not found`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    throw error;
  }
}