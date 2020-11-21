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
  const [pictures, setPictures] = React.useState("");
  const {onClose, modalOpen} = props;
  let auth = useAuth();

  const dispatch = useDispatch();

  const handleCancel = async () => { 
      onClose();
      setRoomName("");
  };

  const handleConfirm = async() => {
      try{
        const room_id = await createRoom(roomName,pictures,auth.user);
        const responseRoom = await loadRoom(room_id,auth.user);
        dispatch(responseRoom);
        onClose();
      }catch(error){
        console.log(error);
      }
  }

  const onDrop = (picture) =>  {
    setPictures(picture);
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
                    maxFileSize={5242880}
                    singleImage={true}
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

