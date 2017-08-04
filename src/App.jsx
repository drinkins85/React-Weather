import React from 'react';
import './app.css';

class App extends React.Component {
    state = {
            icon: '',
            city: 'Dublin',
            time: 1,
            temperature: '',
            weatherCode: '',
            windSpeed: 0,
            clouds:'',
            description: '',
            fetching: true
        };

    componentDidMount() {
        this.fetchWeatherData(this.state.city);
    }


    fetchWeatherData = city =>  {
        const baseUrl = 'http://api.openweathermap.org';
        const path = '/data/2.5/weather';
        const appId = '572ad254a022b963852f0621c1e5fdeb';
        const query = `units=metric&lang=ru&appid=${appId}`;

        let dubDate = new Date();

        fetch(`${baseUrl}${path}?q=${city},IE&${query}`)
            .then(response => response.json() )
            .then(data => {
                console.log(data);
                const date = dubDate;
                const time = dubDate.getUTCHours()+1;

                this.setState({
                    time,
                    city,
                    temperature: Math.round(data.main.temp),
                    weatherCode: data.weather[0].id,
                    windSpeed: data.wind.speed,
                    clouds: data.clouds.all,
                    description: data.weather[0].description,
                    fetching: false
                }, () => {console.log(this.state)})
            })
            .catch(error => {console.log(error)})
    };


    render(){
        const { fetching,
                icon,
                time,
                city,
                windSpeed,
                clouds,
                temperature,
                weatherCode,
                description} = this.state;

        return fetching ?
            <div className="weather-informer">
                <h1>Loading..</h1>
            </div>
            :
            <div className="weather-informer" data-hour={time}>
                <div className="weather-informer__info">
                    <h1 className="weather-informer__header">Dublin  </h1>
                    <span className="weather-informer__temperature">{temperature}&deg;C</span><br/>
                    {description}<br/>
                    Ветер: {Math.floor(windSpeed)} м/с<br/>
                    Облачность: {clouds}%
                </div>
            </div>
    }

}

export default App;