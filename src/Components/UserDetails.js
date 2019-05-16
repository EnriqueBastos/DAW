import React from 'react';
import Axios from 'axios';
import {Row , Col } from 'antd';
import userPhoto from "../Images/defaultUserPhoto.png";



export default class UserDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentWillMount(){
        this.getUserData();
        
    }
    getUserData(){
        var id =localStorage.getItem("UserId");
        Axios.get("https://localhost:44310/api/profile/"+id)
        .then(res =>{
            this.setState({
                profile : res.data
            });
            
        });

    }
    
    render() {
        
        console.log(this.state.profile);
        
            
        

        if(this.state.profile === undefined){
            return (
                <div className="userDetails">
                    <h1></h1>
                </div>);
        }else{
            return (
                <div className="userDetails" >
                    <Row>
                        
                            
                                <Col span={12} className ="">
                                    <img id="profileImage" alt ="PhotoProfile" src={userPhoto} width ="50%"/>
                                </Col>
                                <Col span={12}>

                                    <h1>{this.state.profile.userName}</h1>
                                </Col>
                            
                        
                        
                    </Row>
                   
                </div>
                );
        }
        
    }

    
}