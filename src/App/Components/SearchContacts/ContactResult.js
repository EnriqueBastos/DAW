import React from 'react';
import './SearchContacts.css';
import defaultUserPhoto from '../../../Images/defaultUserPhoto.png';
import { Row, Col, message } from 'antd';
import {withRouter} from 'react-router-dom';


class ContactResult extends React.Component{
    handleViewProfile = props =>{
        
        this.props.history.push("../../profile/"+ this.props.contact.userId);
    }

    handlePrivateProfile(){
        message.warning("Debes agregarlo para ver su perfil");
    }

    render(){

        var buttonOptions = (
            <React.Fragment>
                {this.props.contact.isFriend ? <button onClick ={this.handleViewProfile} >Ver perfil </button> : this.props.contact.private ? <button onClick ={this.handlePrivateProfile} >Perfil privado</button> : <button onClick ={this.handleViewProfile} >Ver perfil </button>}
                { this.props.contact.isFriend? "" : this.props.contact.friendRequestIsSent? <button>Pendiente de aceptar...</button> : <button onClick = {()=>this.props.sendFriendRequest(this.props.contact.userId)}>Agregar a amigos</button>  }
                
            </React.Fragment>
        );

        const {contact} = this.props;
        return (
        <div className ="contact-result">
            <Row >
                <Col span = {4} className ="contact-result-photo-container">
                    
                    <img 
                    src ={contact.photoProfile ? "data:image/png;base64," + contact.photoProfile : defaultUserPhoto} 
                    alt ="photoContact" 
                    className ="contact-result-photo"/>
                </Col>
                <Col className ="contact-result-info">
                    <h1 >{contact.userName + " " + contact.userLastName}</h1>
                    {buttonOptions}
                    

                </Col>
            </Row>
            

        </div>
        )

    }
}

export default withRouter(ContactResult);