import React from 'react';
import Axios from 'axios';
import './Chat.css';
import Chat from  './Chat';
import {Badge, Col , Row, message} from 'antd';
import { HubConnectionBuilder } from '@aspnet/signalr';
import defaultUserPhoto from '../../../Images/defaultUserPhoto.png';
import {withRouter} from 'react-router-dom';

class ChatBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chats : [],
            chatOpened : [],
            hubConnection : null
        }
        this.handleReadMessages = this.handleReadMessages.bind(this);
        this.handleCloseChat = this.handleCloseChat.bind(this);
        this.connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44310/SignalR/ChatMessages")
        .build();
    }

    
    componentWillMount = () => {
        if(!localStorage.getItem("UserId")){
            this.props.history.push("/");
            message.error("Debes iniciar sesión");
        }else{
            this.getConnection();
            document.body.style.backgroundColor = localStorage.getItem("BackgroundApp");
        }
    }
    

    getConnection = () => {
        Axios.get("https://localhost:44310/api/Chat/GetListChat/" + localStorage.getItem("UserId")).then(res =>{
            this.setState({
                chats : res.data
            })
        });
        
        this.connection
        .start({ withCredentials: false })
        .catch(err => console.error(err.toString()));

        var userString = "UserId" + localStorage.getItem("UserId");
            this.connection.on(userString , (chatId) =>{
                
                var chats = this.state.chats;
                for(var f = 0; f < chats.length ; f++){
                    if(chats[f].chatId === chatId){
                        chats[f].countIsNotSeen ++;
                    }
                }
                this.setState({chats});
            })
    }
    handleCloseChat(chatId){
        var chatOpened = this.state.chatOpened;
        var newChatsOpened = chatOpened.filter(x => x.chatId !== chatId);
        this.setState({
            chatOpened : newChatsOpened
        })
    }
    handleReadMessages(UserChatDto){
        Axios.post("https://localhost:44310/api/Chat/ReadMessagesChat" , UserChatDto).then(res =>{
            var chats = this.state.chats;
            for(var f = 0; f < chats.length ; f++){
                if(chats[f].chatId === UserChatDto.ChatId){
                    chats[f].countIsNotSeen = 0;
                }
            }
            this.setState({chats});
        });


    }

    handleClickUser(index){
        var chatOpened = this.state.chatOpened;
        var chat = {
            userName : this.state.chats[index].userName,
            chatId : this.state.chats[index].chatId,
            photoProfile : this.state.chats[index].photoProfile
        };

        var isRepeated = false;
        
        chatOpened.forEach( x => {
            if(chat.chatId === x.chatId ){
                isRepeated = true;
            }
        });

        if(!isRepeated){
            chatOpened.push(chat);
            this.setState({
                chatOpened : chatOpened
            });
        }
        
    }
    
    render(){
        return(
            <React.Fragment>
                <div className="ChatBar">
                    <h3>Contactos</h3>
                    <div className="chat-list-contacts">
                    {
                        this.state.chats.map(
                                (chat , index) =>{
                                    return (
                                        <Row key ={index} className="list-chat-name"  onClick={()=>this.handleClickUser(index)}>
                                            <Col span = {20}>
                                                <h4>
                                                    {
                                                        chat.photoProfile ?
                                                        <img alt ="photoProfile" src = {"data:image/png;base64," + chat.photoProfile } /> :
                                                        <img alt ="photoProfile" src = {defaultUserPhoto} />
                                                    }
                                                    {" " + chat.userName}
                                                </h4>
                                            </Col>
                                            <Col span={4}>
                                                <Badge count={chat.countIsNotSeen} style={{background : 'green', marginTop: '70%' }}/>
                                            </Col>
                                        </Row>
                                    )
                                }
                            
                            )
                    }
                    </div>
                </div>
                {console.log(this.state.chatOpened)}
                
                    {
                        this.state.chatOpened.map(
                            (chat , index) =>{
                                return <Chat 
                                        key = {index} 
                                        chatId = {chat.chatId}
                                        userName = {chat.userName} 
                                        photoProfile = {chat.photoProfile}
                                        numChats = {index + 1} 
                                        connection = {this.connection}
                                        handleReadMessages = {this.handleReadMessages}
                                        handleCloseChat = {this.handleCloseChat}
                                        />
                            } 
                        )
                    }
                
            </React.Fragment>
        );
    }
}

export default withRouter(ChatBar);