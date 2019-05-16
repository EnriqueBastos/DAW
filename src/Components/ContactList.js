import React from 'react';
import Axios from 'axios';
import Contact from './Contact.js';
import NavBar from './NavBar.js';

export default class ContactList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contacts : []
        }
    }

    getContacts(){ 
        const userId = localStorage.getItem("UserId"); 
        Axios.get("https://localhost:44310/api/getcontacts/"+userId).then(res =>{
            this.setState({
                contacts : res.data
            });

        });
    }
    componentWillMount(){
        this.getContacts();
    }
    render(){
        return(
            <div>
            <NavBar/>
            {this.state.contacts.map(item =>
                <Contact profile ={item}/>
            )}
            </div>
            
        );
    }
}