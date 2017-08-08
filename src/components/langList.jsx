import React from 'react';
import Button from './Button';

function LangList({action, langs, active}) {
    return  <div className="weather-informer__langs">
        {langs.map((lang, key) => {
            return <Button title={lang} action={action} key={key} isActive={lang === active}  classname="weather-informer__lang__item" />
        })}
    </div>
}
export default LangList;