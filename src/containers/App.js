import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import 'styles/custom.css'

import MainApp from 'app/index';
import SignIn from './SignIn';
import SignUp from './SignUp'; 
import {setInitUrl} from '../actions/Auth';

const RestrictedRoute = ({component: Component, isUserActive, isSignUp,...rest}) =>
    <Route
        {...rest}
        render={props =>
        (isUserActive || isSignUp)
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: '/signin',
                    state: {from: props.location}
                }}
            />}
    />;

class App extends Component {
    componentWillMount() {
        if (this.props.initURL === '') {
            this.props.setInitUrl(this.props.history.location.pathname); //TODO check this back
        }
    }
    render() {
        const {match, location, isUserActive, initURL} = this.props;
        if (location.pathname === '/') {
            if (isUserActive === null) {
                console.log('no user logged in/token expire');
                return ( <Redirect to={'/signin'}/> );
            } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
                console.log('redirecting to main app page');
                return ( <Redirect to={'app/randomimage'}/> );
            } else {
                console.log('redirecting to initURL')
                return ( <Redirect to={initURL}/> );
                
            }
        }
        return (
            <div className="app-main">
                <Switch>
                    <RestrictedRoute path={`${match.url}app`} isUserActive={isUserActive}
                                    component={MainApp}/>
                    <Route path='/signin' component={SignIn}/>
                    <Route path='/signup' component={SignUp}/>
                </Switch>
            </div>
        )
    }
}
//should add  <Route path='/signup' component={SignUp}/> after signIn
const mapStateToProps = ({settings, auth}) => {
    const {initURL,isUserActive,isSignUp} = auth;
    return { initURL,isUserActive,isSignUp} 
  };
  
export default connect(mapStateToProps,{setInitUrl})(App); //here is where all the stateProps are passed to the render prop
  