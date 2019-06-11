import React from 'react';
import {Icon , Button} from 'antd';
import './FriendRequest.css';
import FriendRequest from './FriendRequest';

export default class FriendRequestList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            friendRequests : this.props.friendRequests
            
        }

        
        
    }
    responseFriendRequest = async (notificationId)=>{
        var newListFriends =  this.state.friendRequests.filter(e => e.notificationId !== notificationId);
        //const newFriendRequests = {...this.state.friendRequests}; //spread operator
        //newFriendRequests.splice(index,1);
        await this.setState({
            friendRequests : newListFriends
        })
        
        console.log("F LIST : ",this.state.friendRequests);
    }
    handleClick (){
        var res = document.getElementById("friendRequest");
        
        if(res.style.display === "none" || res.style.display ===""){

            res.style.display = "flex";
         }else{
            
            res.style.display = "none";

        }
        
    }

    
    
    render(){
            if(this.state.friendRequests.length > 0){
                return(
                    <React.Fragment>
                    <p>
                        <Button type ="link" className = "friend-notification" htmlType="submit" onClick={this.handleClick}>
                            <Icon type="user-add" />
                            {
                                this.state.friendRequests.length === 1 ?
                                 " " + this.state.friendRequests.length + " petición de amistad" : 
                                 " " + this.state.friendRequests.length +  " peticiones de amistad"
                            }
                        </Button>
                    </p>
                    <div className="bg-friendRequest" id ="friendRequest">
                        
                        <div className ="friendRequest-container">
                        <div className="close-friendRequests" onClick = {this.handleClick}>
                            +
                        </div>
                        {this.state.friendRequests.map( (friendRequest , index) =>{
                            return <FriendRequest friendRequest ={friendRequest} responseFriendRequest={this.responseFriendRequest} key={index}/>
                        }
                            
                        )}
                            
                        </div>
                        
                    </div>  
                    
                    </React.Fragment>
                );

            }else{
                return <div className="no-notifications">No tienes notificaciones</div>;
            }
            
        
        
    }

}