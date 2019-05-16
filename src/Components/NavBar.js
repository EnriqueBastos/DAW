import React from 'react';
import logo from '../Images/logo.png';
import "../Styles/NavBar.css";
import {Link} from "react-router-dom";
import {Icon , Button, Input} from 'antd';
import UploadPhotoButton from './UploadPhoto.js';
import LogOut from './LogOut.js';


const NavBar = () =>(
    
    
    <div className = "NavBar">
        
        <ul>
            <li>
                <Link to ="/home">
                    <img src = {logo}  alt ="logo" className ="logo" />
                </Link>
            </li>
            <li>
                <Link to ="/home" >
                    <Icon type="home" theme="filled" />
                    Inicio
                </Link>
            </li>
            <li>
                <Link to ="/contacts" >
                <Icon type="team" />
                    Amigos
                </Link>
            </li>
            <li>
                <Link to ="/music" >
                <Icon type="youtube" />
                    Música
                </Link>
            </li>
            <li>
                <Link to ="/Login" >
                <Icon type="user" />
                    Perfil
                </Link>
            </li>
            <li className ="uploadPhoto">
                <div className ="NavBarItem">
                    <UploadPhotoButton />
                </div>
                
                
               
            </li>
            <li  className ="searchInput">
                <Input	type ="text" className ="NavBarItem"/>
            </li>
            <li className ="searchBtn">
                <p className ="NavBarItem">
                
                    <Button type ="Default" className ="NavBarButton">
                    <Icon type="search" />
                        Buscar contacto
                    </Button>
                </p>
            </li>
            <li>
                
                <LogOut />
            </li>
            
        </ul>
    </div>
    
);

export default NavBar;



