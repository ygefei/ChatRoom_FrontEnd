
import React from 'react';
import {TextComposer,Row,Fill,Fit,SendButton,TextInput}from '@livechat/ui-kit';
import {debounce} from 'lodash';
import {sendMessageSocket} from '../socketUtil';


export default function TypeInput(props) {

    const {room_id,dispatch,user} = props;

    const [typeMessage, setTypeMeesage] = React.useState("");


    const handleInput = (e) => {
        setTypeMeesage(e.target.value)
    }

    const delayedSubmit = debounce((room_id,timestamp) => sendMessageSocket(dispatch,room_id,user.username,user.nickname,typeMessage,user.profile,timestamp), 500);

    const sendMessage = () => {
        const timestamp = new Date().toISOString();
        // delayedSubmit(room_id,timestamp);
        delayedSubmit(room_id,timestamp);
    } 

    return(
    <TextComposer onSend={sendMessage} onChange={e => handleInput(e)} value={typeMessage}>
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
