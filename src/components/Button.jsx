import React from 'react';

function Button({title, action, isActive, classname}) {

    return <a className={isActive ? `${classname}_active` : `${classname}`}  onClick={() => {action(title)}}>{title}</a>
}

export default Button;