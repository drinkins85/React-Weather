import React from 'react';

class App extends React.Component {
    state = {
            icon: '',
            city: 'Dublin',
            time: 1,
            temperature: '',
            weatherCode: '',
            windSpeed: 0,
            clouds:'',
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

        fetch(`${baseUrl}${path}?q=${city},IE&${query}`)
            .then(response => response.json() )
            .then(data => {
                console.log(data);
                const date = new Date();
                const time = date.getHours();

                this.setState({
                    time,
                    city,
                    temperature: Math.round(data.main.temp),
                    weatherCode: data.weather[0].id,
                    windSpeed: data.wind.speed,
                    clouds: data.clouds.all,
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
                weatherCode } = this.state;

        return fetching ?
            <h1>loading1</h1>
            :
            <div>
                <h1>Dublin {temperature}&deg;C </h1>
               Ветер: {Math.floor(windSpeed)} м/с<br/>
                Облачность: {clouds}%
            </div>
    }

}

export default App;