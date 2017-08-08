import React from 'react';
import Button from './Button';


function CitiesList({action, cities, active}) {
    return  <div className="weather-informer__menu">
        {cities.map((city, key) => {
            return <Button title={city} action={action} key={key} isActive={city === active} classname="weather-informer__menu__item" />
        })}
    </div>
}
export default CitiesList;