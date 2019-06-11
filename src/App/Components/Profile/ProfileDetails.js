import React from 'react';
import Axios from 'axios';
import defaultUserPhoto from '../../../Images/defaultUserPhoto.png';
import Settings from './Settings/Settings';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

class ProfileDetails extends React.Component{
    constructor(props){
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            
        }
    }
    componentWillMount(){
        
        
        
        Axios.get("https://localhost:44310/api/user/GetProfile/"+this.props.userId)
        .then(res =>{
            this.setState({
                profile : res.data
            });
        });
        
    }
   
    handleClick(){
        var contactDto = {
            UserId : localStorage.getItem("UserId"),
            FriendId : this.props.userId
        }
        Axios.post("https://localhost:44310/api/contacts/deleteContact",contactDto).then(res =>{
            this.props.history.push("/contacts");
        });
    }

    handleSaveChanges(profile){
        
        Axios.post("https://localhost:44310/api/user/editUser",profile).then(res=>{
            document.location.reload();
        });
    }
    
    render(){
            var img = defaultUserPhoto;
            if(this.state.profile){
                
               img  = this.state.profile.photoProfile ? "data:image/png;base64," + this.state.profile.photoProfile : defaultUserPhoto  ;
               return (
                <Row className ="profileDetails">
                    <Col span={12}>
                        <img 
                        alt="PhotoProfile" 
                        src={img} 
                        className="photoProfile"
                        />
                    </Col>
                    <Col span={12} >
                        <h1>{this.state.profile.userName+ " " + this.state.profile.userLastName}</h1>
                        <div className="description-profile">
                            <p>{this.state.profile.description}</p>
                        </div>
                        {this.props.userId === localStorage.getItem("UserId") ?
                            <Settings profile={this.state.profile} handleSaveChanges={this.handleSaveChanges}/> :
                            (
                            <React.Fragment>
                                <div className="user-details-contact">
                                    <Link to={"/music/" + this.props.userId}><button>Ver música</button></Link>
                                    <button onClick={this.handleClick}>Borrar amigo</button> 
                                    
                                </div>
                                
                            </React.Fragment>
                            )
                        }
                    </Col>
                    
                </Row>);
            }else{
                return <div></div>;
            }
            
        
        }
        
    }
    export default withRouter(ProfileDetails);