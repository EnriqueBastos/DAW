import React from 'react';
import UserDetails from './UserDetails.js';
import "./Home.css";
import ListPhoto from './ListPhoto.js';


export default class Home extends React.Component{

    
    render(){
        
       
     return(
                <React.Fragment>
                    <UserDetails />
                    <ListPhoto /> 
                </React.Fragment>
            );
        }
            
            
    }

