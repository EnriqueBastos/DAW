import React from 'react';
import { Row, Col } from 'antd';
import defaultUserPhoto from '../../../../Images/defaultUserPhoto.png';
import Axios from 'axios';

export default class FriendRequest extends React.Component{
    constructor(props){
        super(props);
        
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.declineFriendRequest = this.declineFriendRequest.bind(this);
    }
    async acceptFriendRequest(){

        var contact = {
            UserId : localStorage.getItem("UserId"),
            FriendId : this.props.friendRequest.userId,
            ContactNotificationId : this.props.friendRequest.notificationId
        }
        Axios.post("https://localhost:44310/api/Contacts/AddContact",contact).then(res =>{

            this.props.responseFriendRequest(this.props.friendRequest.notificationId);
            
        }
        
        );
    }

    async declineFriendRequest(){

         

        var ContactNotification = {
            ContactNotificationId : this.props.friendRequest.notificationId
        }
        Axios.post("https://localhost:44310/api/Contacts/DeclineContact",ContactNotification).then(res =>{
            
            this.props.responseFriendRequest(this.props.friendRequest.notificationId);
        }
            
        );
    }
    render(){
            const {friendRequest} = this.props;
            return(
                <Row className="friend-request" id={friendRequest.notificationId}>
                    {console.log("FRIEND REQUEST ->",friendRequest)}
                    <Col span = {8}>
                        <button className="accept" onClick ={this.acceptFriendRequest}> Aceptar </button>
                    </Col>
                    <Col span ={8}>
                        {
                            friendRequest.photoProfile === "" || friendRequest.photoProfile === null ?
                            <img alt ="UserPhotoProfile" src ={defaultUserPhoto}/> :
                            <img alt ="UserPhotoProfile" src ={"data:image/png;base64," + friendRequest.photoProfile}/>
                        }
                        <h2>{friendRequest.name + " " + friendRequest.lastName}</h2>
                    </Col>
                    <Col span ={8}>
                        <button className="decline" onClick = {this.declineFriendRequest}>Rechazar</button>
                    </Col>
                    
                </Row>
            );
        }
            
        
    }
