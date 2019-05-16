import React from 'react';

export default class LogOut extends React.Component{

    handleClick(){
        localStorage.removeItem("UserId");
        window.location.href='./login';
    }

    render(){
        return(
            <p className="NavBarItem" onClick={this.handleClick}>Salir</p>
        );
    }
}