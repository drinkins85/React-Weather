import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';

function NavItem({title, action, isActive, classname, navTo}) {

    //return <a className={isActive ? `${classname}_active` : `${classname}`}  onClick={() => {action(title)}}>{title}</a>
    return <NavLink  isActive={isActive}
                     activeClassName={`${classname}_active`}
                     className={classname}
                     to={`/${navTo}`}
                     onClick={() => {action(title)}}
            >
            {title}</NavLink>
}

export default NavItem;