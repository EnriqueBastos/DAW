import React from 'react';
import Axios from 'axios';
import ContactResult from './ContactResult.js';
import { message } from 'antd';

export default class SearchContacts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contacts : []
        }
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }
    componentWillMount(){
        this.getContacts();
    }
    componentDidUpdate(){
        this.getContacts();
    }
    getContacts(){
        const searchContactDto = {
            UserId : localStorage.getItem("UserId"),
            UserName : this.props.match.params.name
        }
        
        Axios.post("https://localhost:44310/api/contacts/searchContacts",searchContactDto).then(res =>{
                console.log("LISTA DE CONTACTOS", res.data);
                    this.setState({
                        contacts : res.data
                    });
                }
            );
    }

    sendFriendRequest (friendId) {
        const contactDto = {
            UserId : localStorage.getItem("UserId"),
            FriendId : friendId
        }
        
        Axios.post("https://localhost:44310/api/contacts/sendFriendRequest" , contactDto).then( async res =>{

                message.success("Solicitud enviada");
                var contacts = this.state.contacts;

                for(var f = 0 ; f < contacts.length ; f++){
                    if(contacts[f].userId === friendId){

                        contacts[f].friendRequestIsSent = true;

                    }
                }
                
                await this.setState({
                    contacts : contacts
                });
            }
        );
    }

    render(){
        
        if(this.state.contacts.length > 0){
            return (
                <div>
                    {
                        this.state.contacts.map((contact , index) => {
                            return <ContactResult contact = {contact}  key = {index} sendFriendRequest ={this.sendFriendRequest}/>
                        })
                    }
                </div>
                 );
        }else{
            return (<React.Fragment>
                        <div  className ="no-result-contacts">
                            <h1>No se han encontrado usuarios con el nombre : {this.props.match.params.name}</h1>
                        </div>
                        
                    </React.Fragment>)
        }
    }

        
    
}