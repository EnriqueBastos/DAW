import React from 'react';
import ProfilePhotos from './ProfilePhotos.js';
import "./Profile.css";
import ProfileDetails from './ProfileDetails.js';
import NavBar from '../../Shared/NavBar/NavBar.js';



export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId : this.props.match.params.id === undefined ? localStorage.getItem("UserId") : this.props.match.params.id 
        }
        
    }

    render(){
        
        return (
            <React.Fragment>
                <NavBar />
                
                <ProfileDetails userId = {this.state.userId}/>
                <ProfilePhotos  userId = {this.state.userId}/>
            </React.Fragment>
        );
    }
}