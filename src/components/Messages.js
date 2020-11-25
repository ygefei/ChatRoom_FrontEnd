import {API_BASE} from '../api';
import React from 'react';
import {MessageList,Row,Avatar,Message,MessageText, Bubble}from '@livechat/ui-kit';

export default function Messages(props){

    const {user,chatLogs} = props;
    const date = new Date();

    const timeTransfer = (time) => {
        const messDate = new Date(time);
        if(messDate.getDate() < date.getDate()){
            return `${messDate.getMonth()+1}/${messDate.getDate()+1}`;
        }else {
            return `${messDate.getHours()}:${messDate.getMinutes()}`;
        }
    }

    return(
        <MessageList active>
            {chatLogs.map(item => {
                    if(item.username === user.username){
                        return(
                            <Row reverse key={item.username+item.timestamp+Math.random()}>
                                <Avatar imgUrl={`${API_BASE}/${item.profile}`} />
                                <Message isOwn authorName={item.nickname} date={timeTransfer(item.timestamp)}>
                                    <Bubble isOwn='true'>
                                        <MessageText>{item.text}</MessageText>
                                    </Bubble>
                                    
                                </Message>
                            </Row>
                        );
                    }else{
                        return(
                            <Row key={item.username+item.timestamp+Math.random()}>
                                <Avatar imgUrl={`${API_BASE}/${item.profile}`} />
                                <Message authorName={item.nickname} date={timeTransfer(item.timestamp)} radiusType="single">
                                    <Bubble isOwn='false'>
                                        <MessageText>{item.text}</MessageText>
                                    </Bubble>
                                </Message>
                            </Row>
                        );
                    }
            })
            }
        </MessageList>
    )
}