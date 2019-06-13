import React from 'react';
import Axios from 'axios';
import {Row , Col } from 'antd';
import defaultUserPhoto from '../../../Images/defaultUserPhoto.png';
import FriendRequestList from './FriendRequestNotification/FriendRequestList';
import {Link} from 'react-router-dom';



export default class UserDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    componentWillMount(){
        var id =localStorage.getItem("UserId");
         Axios.get("https://localhost:44310/api/user/GetProfile/"+id)
        .then( res =>{
            
             this.setState({
                profile : res.data,
                
            });
            
        });
        
    }

    
    
    
    render() {
        
        if(this.state.profile === undefined){
            return (
                <div className="userDetails">
                    
                </div>);
        }else{
            return (
                <div className="userDetails" >
                    <Row className="userDetails-row">
                        
                            
                                <Col span={10}>
                                    {
                                        this.state.profile.photoProfile ?
                                            <img id="profileImage" alt ="PhotoProfile" src ={"data:image/png;base64," + this.state.profile.photoProfile} className="photoProfile-home"/> :
                                            <img id="profileImage" alt ="PhotoProfile" src={defaultUserPhoto} width ="50%" className="photoProfile-home"/>
                                    }
                                </Col>
                                <Col span={14}>

                                    <Link to ={"/profile/" + localStorage.getItem("UserId")}>
                                        <h2>{this.state.profile.userName +" "+this.state.profile.userLastName}</h2>
                                    </Link>
                                    <FriendRequestList friendRequests = {this.state.profile.friendRequests}/> 
                                    
                                </Col>
                            
                        
                        
                    </Row>
                   
                </div>
                );
        }
        
    }

    
}