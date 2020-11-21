import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../style/register.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Profile from '../assets/profile.png';
import ImageUploader from 'react-images-upload';
import {useHistory} from "react-router-dom";
import {register} from '../api';

const useStyles = makeStyles((theme) => ({
  textField: {
    borderColor: theme.palette.primary.main,
    width: 200,
    height: 68
  },
  button: {
    width: 320,
    height: 35,
    marginTop: 50
  }
}));

export default function Register() {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [nickName, setNickName] = React.useState('');
  const [nickNameError, setNickNameError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPassWordError] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [pictures, setPicture] = React.useState("");
  let history = useHistory();

  const onDrop = (picture) =>  {
    setPicture(picture);
  }
  
  const confirm = async() => {
    try{
        setUsernameError(!username);
        setNickNameError(!nickName);
        setPassWordError(!password);
        setConfirmPasswordError(password !== confirmPassword);
        if(username && nickName && password && password === confirmPassword){
          await register(username,password,nickName);
          history.push("/");
        }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="root">
        <h1>Welcome. Let’s get you set up.</h1>
        <div className='contain'>
            <div className='field'>
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
                  label="Nick name" 
                  variant="outlined" 
                  value={nickName} 
                  onChange={(event) => setNickName(event.target.value)}
                  error={nickNameError}
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
                <TextField 
                  className={classes.textField} 
                  id="outlined-basic" 
                  label="Confirm password" 
                  variant="outlined" 
                  value={confirmPassword} 
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  error={confirmPasswordError}
                />
            </div>
            <div className="imageUpload">
              <ImageUploader 
                  style={{ maxWidth: '500px', margin: "20px 20px" }}
                  withPreview={true} 
                  buttonText='Choose Avatar'
                  onChange={onDrop}
                  maxFileSize={5242880}
                  singleImage={true}
              />
            </div>
        </div>
        <Button onClick={confirm} className={classes.button} variant="contained" color="primary">
            confirm
        </Button>
    </div>
  );
}