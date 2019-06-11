import React from 'react';
import UserDetails from './UserDetails.js';
import "./Home.css";
import ListPhoto from './ListPhoto.js';
import NavBar from '../../Shared/NavBar/NavBar.js';
import ChatBar from '../../Shared/Chat/ChatBar';


export default class Home extends React.Component{

    
    render(){
        
       
     return(
                <React.Fragment>
                    <NavBar />
                    <ChatBar />
                    <UserDetails />
                    <ListPhoto /> 
                </React.Fragment>
            );
        }
            
            
    }

