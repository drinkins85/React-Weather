import React from 'react';
//import Button from './Button';
import NavItem from './NavItem';



function CitiesList({action, cities, active}) {
    return  <div className="weather-informer__menu">
        {cities.map((city, key) => {
            //return <Button title={city} action={action} key={key} isActive={city === active} classname="weather-informer__menu__item" />
            return <NavItem title={city} action={action} key={key} navTo={city.toLowerCase()} isActive={ () => city === active} classname="weather-informer__menu__item" />
        })}
    </div>
}
export default CitiesList;