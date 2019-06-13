import React from 'react';
import ProfilePhotos from './ProfilePhotos.js';
import "./Profile.css";
import ProfileDetails from './ProfileDetails.js';



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
                <ProfileDetails userId = {this.props.match.params.id === undefined ? localStorage.getItem("UserId") : this.props.match.params.id}/>
                <ProfilePhotos  userId = {this.props.match.params.id === undefined ? localStorage.getItem("UserId") : this.props.match.params.id}/>
            </React.Fragment>
        );
    }
}