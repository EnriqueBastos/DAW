import React from 'react';
import { Row, Col, Form ,Input } from 'antd';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import defaultUserPhoto from '../../../Images/defaultUserPhoto.png';
import {animateScroll as scroll} from 'react-scroll';

class ChatMessages extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            numChats : this.props.numChats - 1,
            marginRight : this.props.numChats !== 1 ? ((this.props.numChats - 1) * 10.5) + "%" : "0.10%",
            display : "block",
            messages : [],
            userChatDto : {
                UserId : localStorage.getItem("UserId"),
                ChatId : this.props.chatId
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReadMessages = this.handleReadMessages.bind(this);
    }
    handleReadMessages(){
        this.props.handleReadMessages(this.state.userChatDto);
        var messages = this.state.messages;
        for(var f = 0 ; f < messages.length ; f++){
            messages[f].isSeen = true;
        }
    }
    handleClick(){
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
    componentDidUpdate(){
        var messagesDiv = document.getElementById("chatId" + this.props.chatId);
        if(messagesDiv)
            messagesDiv.scrollIntoView();
        document.getElementsByClassName("input-chat")[this.state.numChats].value = "";
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

        

        const {getFieldDecorator} = this.props.form;
        return (
        <div className ="conversation" style={{marginRight : this.state.marginRight}}>
            <div className="messages" style ={{display : this.state.display}}>
                <div className ="message-text">
                {
                    this.state.messages.map( (message, index) =>{
                        var userId = message.userId.toString();
                        if(userId === localStorage.getItem("UserId")){
                            return (
                                <p key ={index}><Link to ={"/profile/" + message.userId}>Yo</Link>{" : " + message.messageText}</p>
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
                            <button htmltype="submit"></button>
                        </Col>
                    </Form>
                </Row>
            
            </div>
            <div className="userName-chat" onClick = {this.handleClick}>
                <Row>
                    <Col span = {6}>
                        {
                            this.props.photoProfile ?
                            <img alt ="photoProfile" src = {"data:image/png;base64," + this.props.photoProfile } /> :
                            <img alt ="photoProfile" src = {defaultUserPhoto} />
                        }
                    </Col>
                    <Col span = {18}>
                        <h2>
                            { " " + this.props.userName}
                        </h2>
                    </Col>

                </Row>
                
            </div>
        </div>
        );
    }
}

const Chat = Form.create({ name: 'chat' })(ChatMessages);

export default Chat;