import React from 'react';

export default class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profile : this.props.profile
        }
    }

    render(){
        return(
        <div className="contact">
            <h1>{this.state.profile.userName}</h1>
        </div>
            );
    }
}