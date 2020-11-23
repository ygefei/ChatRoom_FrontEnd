import React,{useContext,useRef} from 'react';
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
import {socket,socketConnect,sendMessageSocket,leaveRoomSocket} from '../socketUtil';
import { loadRoom,readMessage,userLogOut,loadPage} from '../actions/actions';
import {TextComposer,Row,Fill,Fit,SendButton,TextInput}from '@livechat/ui-kit';
import { debounce, throttle } from 'lodash';

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

    const sendMessage = (room_id) => {
            const timestamp = new Date().toISOString();
            sendMessageSocket(dispatch,room_id,user.username,user.nickname,typeMessage,timestamp);
    }

    const delayedHandleChange = debounce(eventData => setTypeMeesage(eventData.target.value), 500);

    const handleInput = (e) => {
        let eventData = { id: e.id, target: e.target };
        delayedHandleChange(eventData);
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
                                    avatar={"/static/images/avatar/1.jpg"}
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
                <Paper className={classes.messageList} elevation={0}>
                    <List>
                        {selectedRoom.chatLogs&&selectedRoom.chatLogs.map(item => {
                            return(
                                <Message message={item} user={user.username} key={item.username+item.timestamp+Math.random()}/>
                            );
                        })}
                    </List>
                </Paper>
                <div className="centerFooter">
                    {selectedRoom.room_id && <TypeInput typeMessage={typeMessage} handleInput={handleInput} sendMessage={sendMessage} room_id={selectedRoom.room_id}/>}
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

function TypeInput(props) {
    const {handleInput,sendMessage,room_id, typeMessage} = props;
    return(
    <TextComposer onSend={() => sendMessage(room_id)} onChange={e => handleInput(e)} value={typeMessage}>
			<Row align="center">
				<Fill>
					<TextInput />
				</Fill>
				<Fit>
					<SendButton />
				</Fit>
				</Row>
	</TextComposer>
    )
}
