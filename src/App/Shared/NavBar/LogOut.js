import React from 'react';

export default class LogOut extends React.Component{

    handleClick(){
        localStorage.removeItem("UserId");
        localStorage.removeItem("BackgroundApp");
        window.location.href='../../';
    }

    render(){
        return(
            <p className="NavBarItem LogOut" onClick={this.handleClick}>Salir</p>
        );
    }
}