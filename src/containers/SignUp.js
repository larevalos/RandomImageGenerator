import React from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {toggleSignUpPage} from 'actions/Auth'

import {
  hideMessage,
  showAuthLoader,
  userSignUp,
} from 'actions/Auth';


class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName:'',
            email: '',
            password: ''
        }
    }

    componentDidUpdate() {
        
        if (this.props.showMessage) {
            setTimeout(() => {
            this.props.hideMessage();
            }, 80);
        }
        if (this.props.isUserActive === true
            || this.props.isSignUp ===false)  {
            this.props.history.push('/');
        }
    }
    componentWillMount(){
        this.props.toggleSignUpPage(true)
    }

    render(){
        const {
            firstName,
            lastName,
            email,
            password
          } = this.state;
          const {showMessage, loader, alertMessage} = this.props;
          return (
            <Grid container direction="row"
            justify="center"
            alignItems="center">
            <Grid item md={4} sm={6} xs={11}>             
              <Paper className="vertical30">
                <Grid container 
                  justify="center"
                  alignItems="center">
                  <Grid item xs={6} className="mb-4">
                    <div className="mt-4">            
                          <h5>Sign Up</h5>                          
                    </div>
                    <form method="post" action="/">
                        <TextField
                        type="text"
                        label="First Name"
                        onChange={(event) => this.setState({firstName: event.target.value})}
                        fullWidth
                        defaultValue={firstName}
                        margin="normal"
                        className="mt-0 mb-2"
                        />

                        <TextField
                        type="text"
                        label="Last Name"
                        onChange={(event) => this.setState({lastName: event.target.value})}
                        fullWidth
                        defaultValue={lastName}
                        margin="normal"
                        className="mt-0 mb-2"
                        />

                        <TextField
                        type="email"
                        onChange={(event) => this.setState({email: event.target.value})}
                        label="email"
                        fullWidth
                        defaultValue={email}
                        margin="normal"
                        className="mt-0 mb-2"
                        />

                        <TextField
                        type="password"
                        onChange={(event) => this.setState({password: event.target.value})}
                        label="password"
                        fullWidth
                        defaultValue={password}
                        margin="normal"
                        className="mt-0 mb-4"
                        />
                      <Grid container direction="row" justify="space-between">                         
                          <Grid item xs={3} md={3} >
                            <Button onClick={() => {
                            this.props.showAuthLoader();
                            this.props.userSignUp({email, password, firstName,lastName});
                            (this.props.isSignUp ===false)  &&
                                this.props.history.push('/');
                          
                            }} variant="raised" color="primary">
                            SignUp
                            </Button>
                            <Grid item xs={3} md={3} >
                                <Link to="/signin">
                                    Already member
                                </Link>
                            </Grid>
                          </Grid>
                      </Grid>
                      </form>
                    </Grid>
                  </Grid>
                  {
                      loader &&
                      <div className="loader-view">
                          <CircularProgress/>
                      </div>
                  }
                  {showMessage &&  NotificationManager.error(alertMessage)}
                  <NotificationContainer/>
                </Paper>
              </Grid>
            </Grid>
          )
    }

}

const mapStateToProps = ({auth}) => {
    const {loader, alertMessage, showMessage, authUser,isSignUp } = auth;
    return {loader, alertMessage, showMessage, authUser,isSignUp}
  };

  export default connect(mapStateToProps, {
    userSignUp,
    hideMessage,
    showAuthLoader,
    toggleSignUpPage
  })(SignUp);