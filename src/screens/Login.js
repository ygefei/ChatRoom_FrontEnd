import React,{useContext}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../style/login.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useAuth} from '../context';
import {useHistory} from "react-router-dom";
import {login} from '../api';



const useStyles = makeStyles((theme) => ({
  textField: {
    borderColor: theme.palette.primary.main,
    width: 320,
    height: 68
  },
  button: {
    width: 320,
    height: 35
  }
}));



export default function Login() {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPassWordError] = React.useState(false);
  let history = useHistory();
  let auth = useAuth();


  const userLogin = async() => {
    try{
      setUsernameError(!username);
      setPassWordError(!password);
      if(username && password){
        const response = await login(username,password);
        auth.signin(response.token, async() => {
          history.push("/homepage");
        });
      }
    }catch(error){
      console.log(error);
    }

    
  };

  const toRegister = () => {
    history.push("/register");
  }

  return (
    <div className="root">
      <div className="container">
        <h1>Login</h1>
        <div className="input">
          <TextField 
            className={classes.textField} 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            value={username} 
            onChange={(event) => setUsername(event.target.value)}
            error={usernameError}
          />
          <TextField 
            className={classes.textField} 
            id="outlined-basic" 
            label="Password" 
            variant="outlined" 
            value={password} 
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError}
          />
        </div>
        <Button className={classes.button} variant="contained" color="primary" onClick={userLogin}>
          Login
        </Button>
        <p>Don’t have an account yet? <span onClick={toRegister}>Create Account</span></p>
      </div>
    </div>
  );
}