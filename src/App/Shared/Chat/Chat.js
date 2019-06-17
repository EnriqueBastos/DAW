import React from 'react';
import { Row, Col, Form ,Input , Icon } from 'antd';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import defaultUserPhoto from '../../../Images/defaultUserPhoto.png';

class ChatMessages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            numChats : this.props.numChats - 1,
            display : "block",
            messages : [],
            userChatDto : {
                UserId : localStorage.getItem("UserId"),
                ChatId : this.props.chatId
            }
        }
        this.handleMinimize = this.handleMinimize.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReadMessages = this.handleReadMessages.bind(this);
        this.getAllMessages = this.getAllMessages.bind(this);
    }
    handleReadMessages(){
        this.props.handleReadMessages(this.state.userChatDto);
        var messages = this.state.messages;
        for(var f = 0 ; f < messages.length ; f++){
            messages[f].isSeen = true;
        }
    }
    handleMinimize(){
        if(this.state.display === "none"){
            this.setState({display : "block"});
            this.handleReadMessages(this.state.userChatDto);
        }else{
            this.setState({display : "none"});
        }
    }
    componentWillMount(){
        this.handleReadMessages(this.state.userChatDto);
    }
    componentDidMount(){
        this.getAllMessages();
    }
    componentDidUpdate(){
        var messagesDiv = document.getElementById("chatId" + this.props.chatId);
        if(messagesDiv)
            messagesDiv.scrollIntoView();
        document.getElementsByClassName("input-chat")[this.state.numChats].value = "";
         if(this.props.chatId !== this.state.userChatDto.ChatId ){
         this.getAllMessages();
         var userChatDto = {
            UserId : localStorage.getItem("UserId"),
            ChatId : this.props.chatId
         }
            this.setState({
                userChatDto : userChatDto
            });
         }
    }

    getAllMessages(){
        Axios.get("https://localhost:44310/api/Chat/GetMessagesChat/" + this.props.chatId).then( res =>{
            this.setState({
                messages : res.data
            });
            
        })
        var chatString = "ChatId" + this.props.chatId;
        this.props.connection.on( chatString  , (receivedMessage) => {
            
            var messages = this.state.messages;
            messages.push(receivedMessage);
            this.setState({
                messages : messages
            });
            if(this.state.display === "block" && receivedMessage.userId !== localStorage.getItem("UserId")){
                this.handleReadMessages(this.state.userChatDto);
            }

        });
    }

    

    handleSubmit  = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var message = {
                    MessageText : values.MessageText,
                    UserId : localStorage.getItem("UserId"),
                    ChatId : this.props.chatId,
                };

                this.props.connection.invoke(
                    "SendMessage",
                    message
        
                ).catch(err => console.log(err));


                this.props.connection.invoke(
                    "SendMessageNotification",
                    this.state.userChatDto
        
                ).catch(err => console.log(err));
                
            }
          });
    }
    render(){

        var marginRight = this.props.numChats !== 1 ? ((this.props.numChats - 1) * 5.5) + "%" : "0.10%";

        const {getFieldDecorator} = this.props.form;
        return (
        <div className ="conversation" style={{marginRight : marginRight}}>
            <div className="messages" style ={{display : this.state.display}}>
                <div className="chat-header">
                    <h3>{this.props.userName}</h3>
                    <button className="chat-header-options" style={{float : "left"}} onClick = {this.handleMinimize}>
                        <Icon type="minus" />
                    </button>
                    <button className="chat-header-options" onClick = {() => this.props.handleCloseChat(this.props.chatId)}>
                        <Icon type="close" />
                    </button> 
                </div>
                <div className ="message-text">
                {
                    this.state.messages.map( (message, index) =>{
                        var userId = message.userId.toString();
                        if(userId === localStorage.getItem("UserId")){
                            return (
                                <p key ={index}><label style={{fontWeight : "700"}}>Yo</label>{" : " + message.messageText}</p>
                            );
                        }else{
                            return (
                                <p key ={index} id={message.isSeen ? "" : "chatId" + this.props.chatId }>
                                    <Link to ={"/profile/" + message.userId}>{message.userName}</Link>{" : " + message.messageText}
                                </p>
                            );
                        }
                    })
                }
                <p id={"chatId" + this.props.chatId}></p>
                </div>
                <Row className="input-messages">
                    <Form onSubmit={this.handleSubmit}>
                        <Col span = {20}>
                            <Form.Item>
                                {getFieldDecorator('MessageText', {
                                rules: [{ required: true, message: ' ' }],
                                })(
                                    <Input type="text" className ="input-chat" autoComplete="off" placeholder="Introduce un mensaje"/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col  span ={4}>
                            <button htmltype="submit"><Icon type="enter" style={{fontSize : "1.5em" }}/></button>
                        </Col>
                    </Form>
                </Row>
            </div>
            
            <div className="img-chat" onClick = {this.handleMinimize}>
                {
                    this.props.photoProfile ?
                    <img alt ="photoProfile" src = {"data:image/png;base64," + this.props.photoProfile } /> :
                    <img alt ="photoProfile" src = {defaultUserPhoto} />
                }
            </div>
           
            <div className="chat-design" style ={{display : this.state.display}}></div>
        </div>
        );
    }
}

const Chat = Form.create({ name: 'chat' })(ChatMessages);

export default Chat;