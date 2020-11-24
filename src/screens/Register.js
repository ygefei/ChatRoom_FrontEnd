import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../style/register.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  const [nickname, setNickName] = React.useState('');
  const [nicknameError, setNickNameError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordError, setPassWordError] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [pictures, setPictures] = React.useState([]);

  let history = useHistory();

  const onDrop = (picture) =>  {
    setPictures([...pictures,picture]);
  }
  
  const confirm = async() => {
    try{
        setUsernameError(!username);
        setNickNameError(!nickname);
        setPassWordError(!password);
        setConfirmPasswordError(password !== confirmPassword);
        if(username && nickname && password && password === confirmPassword && pictures.length){
          await register(username,nickname, password, pictures);
          setPictures([]);
          history.push("/");
        }else{
          alert("Some field is unvalid.");
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
                  value={nickname} 
                  onChange={(event) => setNickName(event.target.value)}
                  error={nicknameError}
                />
                <TextField 
                  className={classes.textField} 
                  id="outlined-basic" 
                  label="Password" 
                  variant="outlined" 
                  value={password} 
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  error={passwordError}
                />
                <TextField 
                  className={classes.textField} 
                  id="outlined-basic" 
                  label="Confirm password" 
                  variant="outlined" 
                  type="password"
                  value={confirmPassword} 
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  error={confirmPasswordError}
                />
            </div>
            <div className="imageUpload">
              <ImageUploader 
                  style={{ maxWidth: '500px', margin: "20px 20px" }}
                  imgExtension={['.jpg', '.jpeg', '.png']}
                  label={'Max file size: 1MB, accepted: jpg, jpeg, png'}
                  withPreview={true} 
                  buttonText='Choose Avatar'
                  onChange={onDrop}
                  maxFileSize={1048576}
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