import React from 'react';
import NavBar from './NavBar.js';
import UserDetails from './UserDetails.js';
import "../Styles/Home.css";
import ListPhoto from './ListPhoto.js';


export default class Home extends React.Component{

    
    render(){
        
       
     return(
                <React.Fragment>
                    <NavBar />
                    <UserDetails />
                    <ListPhoto /> 
                </React.Fragment>
            );
        }
            
            
    }

