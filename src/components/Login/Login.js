import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import google from '../../utilities/images/logos/google.png';
import './Login.css';
import logo from '../../utilities/images/logos/logo.png';
import * as firebase from "firebase/app";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { handleGoogleSignIn, initializeFirebaseFramework } from '../firebaseConfig/firebaseManager';
initializeFirebaseFramework();
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    const GoogleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {

                setLoggedInUser(res);

                storeAuthToken();
                history.replace(from);
            })
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
            }).catch(function (error) {
            });
    }
    return (
        <div className="LogInPage">
            <Link className="navbar-brand mb-5" to="/home"><img style={{ height: '50px' }} src={logo} alt="" /></Link>
            <p>Login With</p>
            <Button
                onClick={GoogleSignIn}
                variant="contained"
                className='socialIconButton'>
                <img className="socialIcon" src={google} alt='google' /><span className="socialIconText"> Continue with google</span>
            </Button>
            <p>Don't have an Account? <Link to="/login">Create an Account</Link></p>
        </div>
    );
};

export default Login;