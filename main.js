const apiKey = 'bbf2015529e14f5fa15112448242802'; 

document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter a location.');
        return;
    }
    
    await logWeatherData(location);
});

async function getWeatherData(location) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function extractRequiredData(weatherData) {
    if (!weatherData || !weatherData.current) return null;
    
    const requiredData = {
        location: weatherData.location.name,
        country: weatherData.location.country,
        temperature: weatherData.current.temp_c,
        condition: weatherData.current.condition.text
    };
    
    return requiredData;
}

async function logWeatherData(location) {
    const weatherData = await getWeatherData(location);
    if (weatherData) {
        const requiredData = extractRequiredData(weatherData);
        if (requiredData) {
            const weatherInfoDiv = document.getElementById('weatherInfo');
            weatherInfoDiv.innerHTML = `
              <h2>Weather for ${requiredData.location}, ${requiredData.country}</h2>
              <p>Temperature: ${requiredData.temperature}°C</p>
              <p>Condition: ${requiredData.condition}</p>
            `;
        } else {
            console.log('Failed to fetch weather data for', location);
        }
}
}
