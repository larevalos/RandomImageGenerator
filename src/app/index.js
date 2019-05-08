import React from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp'
import RandomImage from './routes/randomImage';
import History from './routes/History';
import {isIOS, isMobile} from "react-device-detect";
import MenuAppBar from 'components/MenuAppBar';

class App extends React.Component {
    render(){
        const {match} = this.props;
        if (isIOS && isMobile) {
            document.body.classList.add('ios-mobile-view-height')
        }
        else if (document.body.classList.contains('ios-mobile-view-height')) {
            document.body.classList.remove('ios-mobile-view-height')
        }
        return(
            <div className='app-container'>
                <MenuAppBar/>
                    
                <div className="app-main-content-wrapper">
                    <div className="app-main-content">
                        <Switch>
                            <Route path='/signin' component={SignIn}/>
                            <Route path={`${match.url}/randomimage`} component={RandomImage}/>
                            <Route path={`${match.url}/history`} component={History}/>
                            <Route path='/signup' component={SignUp}/>
                        </Switch>
                    </div>
                 
                </div>
            </div>
        );
    }
}

export default withRouter(App);