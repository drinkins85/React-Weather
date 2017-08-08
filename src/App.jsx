import React from 'react';
import Weather from './components/Weather'

import {BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom';

class App extends React.Component {

    render(){

        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={() => <Weather city="Dublin"/> }/>
                    <Route exact path='/dublin' render={() => <Redirect from='/dublin' to="/"/> }/>
                    <Route path='/galway' render={() => <Weather city="Galway"/> }/>
                    <Route path='/cork' render={() => <Weather city="Cork"/> }/>
                    <Route path='*' render={() => {
                        return <div className="page-not-found"><h1>Page not found</h1></div>
                        }
                    }/>
                </Switch>
            </Router>
        )
    }

}

export default App;