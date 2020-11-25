import React from 'react';
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
import { ChatItem } from 'react-chat-elements';
import Paper from '@material-ui/core/Paper';
import AddModal from '../components/AddModal';
import {useAuth} from '../context';
import { useSelector, useDispatch } from 'react-redux';
import {logout} from '../api';
import {socket,socketConnect,leaveRoomSocket} from '../socketUtil';
import {loadRoom,readMessage,userLogOut,loadPage} from '../actions/actions';
import {API_BASE} from '../api';
import TypeInput from '../components/TypeInput';
import Messages from '../components/Messages';


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

  
  let auth = useAuth();
  
  const user = useSelector(state => state.userReducer);
  const roomList = useSelector(state => state.roomListReducers.roomList);
  const selectedRoom = useSelector(state => state.selectedRoomReducer);
  const dispatch = useDispatch();

  const addModalOpen = () => {
      setModalOpen(true);
  }

  const addModalClose = () => {
    setModalOpen(false);
  }

  const signOut = () => {
    dispatch(userLogOut());
    auth.signout(async() => {
        await logout(auth.user);
      });
  }

    const handleSelectRoom = async(room_id,room_name) => {
            try{
                const response = await loadRoom(room_id,auth.user,room_name);
                dispatch(response);
                dispatch(readMessage(room_id));
            }catch(error){
                console.log(error);
            }
    }

    const handleLeaveRoom = (event) => {
            event.preventDefault();
            leaveRoomSocket(dispatch,selectedRoom.room_id);
    } 


    React.useEffect(async() => {
        socketConnect(auth.user,dispatch,selectedRoom.room_id);
        const response = await loadPage(auth.user);
        dispatch(response.loadUser());
        dispatch(response.loadRoomlist());

        return () => {socket.close()};
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
                                    avatar={`${API_BASE}/${item.profile}`}
                                    alt={item.room_name}
                                    title={item.room_name}
                                    subtitle={item.last_message&&Object.keys(item.last_message).length? (item.last_message.nickname+": "+item.last_message.text):""}
                                    date={item.last_message&&Object.keys(item.last_message).length? new Date(item.last_message.timestamp):null}
                                    unread={item.unread} 
                                    onClick={() => handleSelectRoom(item.room_id,item.room_name)}
                                    key={item.room_id}
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
                <div style={{height:"76vh"}}>
                    {
                        selectedRoom.chatLogs&& <Messages chatLogs={selectedRoom.chatLogs} user={user}/>
                    }
                </div> 
                <div className="centerFooter">
                    {selectedRoom.room_id && <TypeInput room_id={selectedRoom.room_id} dispatch={dispatch} user={user}/>}
                </div>
            </div>

            <div className="right">
                <div className="rightHeader">
                    <div className="profile">
                        <Avatar className={classes.avatar} alt={user.nickname} src={`${API_BASE}/${user.profile}`}/>
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
                                <Member user={item} key={item.username}/>
                            );
                        })}
                    </List>
                </Paper>
                {selectedRoom.room_id&&<EixtRoomButton handleLeaveRoom={handleLeaveRoom}/>}
            </div>
            <AddModal onClose={addModalClose} modalOpen={modalOpen}/>
        </div>
    </div>
  );
}


function EixtRoomButton(props) {
    const{ handleLeaveRoom } = props;
    const classes = useStyles();
    return(
        <div className="rightFooter" >
            <IconButton className={classes.leave} onClick={(event) => handleLeaveRoom(event)}>
                    <ExitToAppSharpIcon />  
            </IconButton>
            <Typography>LEAVE ROOM</Typography>
        </div>
    )
}
