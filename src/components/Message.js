
import { MessageBox } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import { Avatar } from '@material-ui/core';


export default function Message(props){
    const {message, user} = props;

    return(
        <div style={{display: "flex", justifyContent:"start", alignItems: "center", padding:"20px"}}>
            <Avatar alt={message.nickname} src="/static/images/avatar/1.jpg"/>
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
}