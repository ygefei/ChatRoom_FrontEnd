import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../style/homepage.css';
import Searchbar from '../components/Searchbar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import { Avatar, Typography } from '@material-ui/core';
import Member from '../components/Member';
import Message from '../components/Message';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import AdjustIcon from '@material-ui/icons/Adjust';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements'
import { ChatItem } from 'react-chat-elements';
import Paper from '@material-ui/core/Paper';
import AddModal from '../components/AddModal';
import {useHistory} from "react-router-dom";
import {useAuth} from '../context';
import { useSelector, useDispatch } from 'react-redux';
import {loadRoom,loadPage,readMessage} from '../actions/actions';
import {WebSocketContext} from '../websocket';
import {logout} from '../api';

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginLeft: 20,
        padding: 0,
        color: theme.palette.primary.light
    },
    avatar: {
        marginRight: 5,
    },
    leave: {
        color: theme.palette.primary.main
    },
    exit: {
        color: theme.palette.primary.main
    },
    messageList: {
        height: '78vh',
        overflow: 'auto',
    },
    chatList: {
        height: '78vh',
        overflow: 'auto',
    },
    memberList: {
        height: '78vh',
        overflow: 'auto',
    }

}));

export default function Homepage() {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [typeMessage, setTypeMeesage] = React.useState("");
  let history = useHistory();
  let auth = useAuth();
  
  const user = useSelector(state => state.userReducer);
  const roomList = useSelector(state => state.roomListReducers.roomList);
  const selectedRoom = useSelector(state => state.selectedRoomReducer);
  const dispatch = useDispatch();
  const ws = useContext(WebSocketContext);

  const addModalOpen = () => {
      setModalOpen(true);
  }

  const addModalClose = () => {
    setModalOpen(false);
  }

  const signOut = () => {
    auth.signout(async() => {
        await logout(auth.user);
        history.push("/");
      });
  }

  const handleSelectRoom = async(room_id) => {
        try{
            const response = await loadRoom(room_id,auth.user);
            dispatch(response);
            dispatch(readMessage(room_id));
        }catch(error){
            console.log(error);
        }
  }

  const handleLeaveRoom = (room_id) => {
        ws.leaveRoom(room_id);
  } 

  const sendMessage = (room_id) => {
        ws.sendMessage(room_id,typeMessage);
  }


  React.useEffect(async() => {
    ws.socketConnect();
    ws.socketInit(auth.user);
    const response = await loadPage(auth.user);
    dispatch(response.loadUser());
    dispatch(response.loadRoomlist());
  },[]);

  return (
    <div className="root">
        <header></header>
        <div className="body">
            <div className="left">
                <div className="leftHeader">
                    <h2>Chat Room</h2> 
                    <div className="searchAdd">
                        <Searchbar />
                        <IconButton className={classes.addButton} onClick={addModalOpen}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </div>
                </div>
                <Paper className={classes.chatList} elevation={0}>
                    <List>
                        {roomList&&roomList.map(item => {
                            return(
                                <ChatItem
                                    avatar={"/static/images/avatar/1.jpg"}
                                    alt={item.room_name}
                                    title={item.room_name}
                                    subtitle={item.nickname+":"+item.lastlog.text}
                                    date={item.timestamp}
                                    unread={item.unread} 
                                    onClick={() => handleSelectRoom(item.room_id)}
                                />
                            );
                        })}
                    </List>
                </Paper>
            </div>

            <div className="center">
                <div className="centerHeader">
                    <h2>{selectedRoom.room_name}</h2>
                    {selectedRoom.room_id&&<p>Room ID: {selectedRoom.room_id}</p>}
                </div>
                <Paper className={classes.messageList} elevation={0}>
                    <List>
                        {selectedRoom.chatLogs&&selectedRoom.chatLogs.map(item => {
                            return(
                                <Message message={item} user={user.username}/>
                            );
                        })}
                    </List>
                </Paper>
                <div className="centerFooter">
                    {selectedRoom.room_id &&<Input
                        placeholder="Type here..."
                        multiline={true}
                        rightButtons={
                            <Button
                                color='white'
                                backgroundColor='#D36E35'
                                text='Send'
                                onClick={() => sendMessage(selectedRoom.room_id)}/>
                        }
                        onChange={(event) => setTypeMeesage(event.target.value)}
                    />}
                </div>
            </div>

            <div className="right">
                <div className="rightHeader">
                    <div className="profile">
                        <Avatar className={classes.avatar} alt={user.nickname} src="/static/images/avatar/1.jpg"/>
                        <div>
                            <h3>{user.nickname}</h3>
                        </div>
                    </div>
                    <IconButton className={classes.exit} onClick={signOut}>
                        <AdjustIcon />
                    </IconButton>
                </div>
                <Paper className={classes.memberList} elevation={0}>
                    <List>
                        {selectedRoom.users&&selectedRoom.users.map(item => {
                            return(
                                <Member user={item}/>
                            );
                        })}
                    </List>
                </Paper>
                <div className="rightFooter">
                    {selectedRoom.room_id&&<EixtRoomButton handleLeaveRoom={handleLeaveRoom} room_id={selectedRoom.room_id}/>}
                </div>
            </div>
            <AddModal onClose={addModalClose} modalOpen={modalOpen}/>
        </div>
    </div>
  );
}


function EixtRoomButton(props) {
    const{handleLeaveRoom, room_id} = {props};
    const classes = useStyles();
    return(
        <div>
            <IconButton className={classes.leave} onClick={() => handleLeaveRoom(room_id)}>
                    <ExitToAppSharpIcon />  
            </IconButton>
            <Typography>LEAVE ROOM</Typography>
        </div>
    )
}

