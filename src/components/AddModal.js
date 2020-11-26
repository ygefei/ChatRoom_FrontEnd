import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from 'react-images-upload';
import TextField from '@material-ui/core/TextField';
import {createRoom, loadRoom} from '../actions/actions';
import {useDispatch} from 'react-redux';
import {useAuth} from '../context';
import {joinRoomSocket} from '../socketUtil';
import {createChatRoom} from '../api';

const useStyles = makeStyles((theme) => ({
    textField: {
      borderColor: theme.palette.primary.main,
      height: 50,
      minWidth: '320px',
      maxWidth: '500px'
    }
  }));

export default function AddModal(props) {
  const classes = useStyles();

  const [roomName, setRoomName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [pictures, setPictures] = React.useState([]);
  const {onClose, modalOpen} = props;
  let auth = useAuth();

  const dispatch = useDispatch();

  const handleCancel = async () => { 
      onClose();
      setRoomName("");
  };

  const handleConfirm = async() => {
      try{
        setError(!roomName);
        if(roomName&&pictures.length){
          const response = await createChatRoom(roomName,pictures,auth.user);
          // const responseRoom = await loadRoom(room_id,auth.user,roomName);
          // dispatch(responseRoom);
          joinRoomSocket(dispatch,response.room_id,auth.user);
          onClose();
          setRoomName("");
          setPictures([]);
        }else{
          alert("Some field is unvalid.");
        }
      }catch(error){
        console.log(error);
      }
  }

  const onDrop = (picture) =>  {
    setPictures([...pictures,picture]);
  }

  return (
    <div>
      <Dialog open={modalOpen} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Create a chat room</DialogTitle>
        <DialogContent>
            <TextField 
              className={classes.textField} 
              id="outlined-basic" 
              label="Room Name" 
              variant="outlined" 
              error={error}
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
            />
            <div style={{maxWidth: '500px'}}>
                <ImageUploader 
                    style={{ maxWidth: '500px'}}
                    withPreview={true} 
                    buttonText='Choose Room Avatar'
                    onChange={onDrop}
                    maxFileSize={1048576}
                    singleImage={true}
                    imgExtension={['.jpg', '.jpeg', '.png']}
                    label={'Max file size: 1MB, accepted: jpg, jpeg, png'}
                />
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

