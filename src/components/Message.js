
import { MessageBox } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { Avatar } from '@material-ui/core';
import {API_BASE} from '../api';

export default function Message(props){
    const {message, user} = props;


    if(message.username !== user){
        return(
            <div style={{display: "flex", justifyContent:"flex-start", alignItems: "center", padding:"20px"}}>
                <Avatar alt={message.nickname} src={`${API_BASE}/${message.profile}`}/>
                <div style={{margin:"23px 0 0 0"}}>
                    <p style={{margin:"0 0 0 10px"}}>{message.nickname}</p>
                    <MessageBox
                        position={message.username === user? "right":"left"}
                        type={'text'}
                        text={message.text}
                        date={new Date(message.timestamp)}
                    />
                </div>
            </div>
        );
    }else{
        return(
            <div style={{display: "flex", justifyContent:"flex-end", alignItems: "center", padding:"20px"}}>
                <div style={{display: "flex", flexDirection:"column", justifyContent:"flex-end", alignItems: "center", margin:"23px 5px 0 0"}}> 
                    <p style={{margin:"0 0 0 10px",alignSelf:"flex-end"}}>{message.nickname}</p>
                    <MessageBox
                        position={message.username === user? "right":"left"}
                        type={'text'}
                        text={message.text}
                        date={new Date(message.timestamp)}
                        
                    />
                </div>
                <Avatar alt={message.nickname} src={`${API_BASE}/${message.profile}`}/>
            </div>
        );
    }

    
}