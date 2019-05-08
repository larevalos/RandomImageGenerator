import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from '@material-ui/core/Paper';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';

import {
    userSignIn,
    hideMessage,
    showAuthLoader
  } from "../actions/Auth";

  class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
          email: '',
          password: ''
        }
    }

    componentDidUpdate() {
      if (this.props.showMessage) {
        setTimeout(() => {
          this.props.hideMessage();
        }, 100);
      }
      if (this.props.authUser !== null) {
        this.props.history.push('/');
      }
    }

    render() {
      const {
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
                        <h5>Login</h5>                          
                  </div>
                  <form>
                    <TextField
                        label="Email"
                        fullWidth
                        onChange={(event) => this.setState({email: event.target.value})}
                        defaultValue={email}
                        margin="normal"
                        className="mt-1 my-sm-3"
                    />
                    <TextField
                        type="password"
                        label="Password"
                        fullWidth
                        onChange={(event) => this.setState({password: event.target.value})}
                        defaultValue={password}
                        margin="normal"
                        className="mt-1 my-sm-3"
                    />
                    <Grid container direction="row" justify="space-between">                         
                        <Grid item xs={6} >
                          <Button onClick={() => {
                          this.props.showAuthLoader();
                          this.props.userSignIn({email, password});
                          }} variant="raised" color="primary">
                          Sign In
                          </Button>
                        </Grid>
                        <Grid item xs={6} className="flex-basis0">
                            <Link to="/signup">
                            
                            Register
                            </Link>
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
       );
    }
  }

  const mapStateToProps = ({auth}) => {
    const {loader, alertMessage, showMessage, authUser,toggleSignUpPage} = auth;
    return {loader, alertMessage, showMessage, authUser,toggleSignUpPage}
  };

  export default connect(mapStateToProps, {
    userSignIn,
    hideMessage,
    showAuthLoader
  })(SignIn);