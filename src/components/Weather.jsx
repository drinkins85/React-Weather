import React from 'react';
import '../app.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import translate from '../api/yandexTranslate';

import CitiesList from './citiesList';
import LangList from './langList';

class Weather extends React.Component {
    state = {
        icon: '',
        country: 'IE',
        city: this.props.city,
        time: 1,
        temperature: '',
        weatherCode: '',
        windSpeed: 0,
        clouds:'',
        fetching: true,
        lang : {
            langCode : 'en',
            cities : ["Dublin", "Galway", "Cork"],
            windLabel : "wind",
            windLabelEng : "wind",
            cloudsLabel : "cloudiness",
            cloudsLabelEng : "cloudiness",

        },
        description: '',
    };

    componentDidMount() {
        this.fetchWeatherData(this.state.country, this.state.city, this.state.lang.langCode);
        //this.changelang(this.state.lang.cloudsLabel,'en-ru');
        //this.changelang('ru');
    }

    changeCity = (city) => {
        this.setState({
            city: city,
            fetching: true
        }, ()=>{this.fetchWeatherData(this.state.country, this.state.city, this.state.lang.langCode);});

    };


    fetchWeatherData = (country, city, lang) =>  {
        const baseUrl = 'http://api.openweathermap.org';
        const path = '/data/2.5/weather';
        const appId = '572ad254a022b963852f0621c1e5fdeb';
        //const lang = this.state.lang.langCode;
        //const lang = 'en';
        const query = `${country}&units=metric&lang=${lang}&appid=${appId}`;

        let dubDate = new Date();

        fetch(`${baseUrl}${path}?q=${city},${query}`)
            .then(response => response.json() )
            .then(data => {
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
                    fetching: false,
                });
            })
            .catch(error => {console.log(error)})
    };

    //changeLang = translate.bind(this);

    changeLang = (lang) => {
        this.setState({
            fetching: true,
            lang: {langCode: lang}
        }, this.fetchWeatherData(this.state.country, this.state.city, lang))
//      this.fetchWeatherData(this.state.country, this.state.city);
        translate.call(this, lang);
    };

    render(){


        const { fetching,
            icon,
            time,
            city,
            windSpeed,
            clouds,
            temperature,
            weatherCode} = this.state;

        let tm = 'night';

        if ((time > 6) &&  (time < 20)){
            tm = 'day';
        }

        let picClass = city+"_"+tm;

        document.body.className = picClass;


        return fetching ?
            <div className="weather-informer">
                <div className="weather-informer__info">
                    <span className="weather-informer__loading">Loading..</span>
                </div>
            </div>
            :
            <CSSTransitionGroup
                transitionName="fade"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeaveTimeout={300}>
                <div className={"weather-informer "+picClass}>
                    <div className="weather-informer__info">
                        <h1 className="weather-informer__header">{city}</h1>
                        <span className="weather-informer__temperature">{temperature}&deg;C</span><br/>
                        <span className="weather-informer__description">{this.state.description}</span>
                        <span className="weather-informer__wind">{this.state.lang.windLabel}: {Math.floor(windSpeed)} m/s</span><br/>
                        <span className="weather-informer__cloud">{this.state.lang.cloudsLabel}: {clouds}%</span>
                    </div>
                    <CitiesList action={this.changeCity} cities={["Dublin","Galway","Cork"]} active={city}/>
                    <LangList action={this.changeLang} langs={["ru","en","de","fr","it","uk","pl","bg","ja"]} active={this.state.lang.langCode}/>
                </div>
            </CSSTransitionGroup>
    }

}

export default Weather;