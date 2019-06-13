import React from 'react';
import logo from '../../../Images/logo.png';
import "./NavBar.css";
import {Link , withRouter} from "react-router-dom";
import {Icon } from 'antd';
import UploadPhotoButton from './UploadPhoto/UploadPhoto.js';
import LogOut from './LogOut.js';
import SearchContact from './SearchContact/SearchContact.js';


class NavBar extends React.Component{
    render(){
        
            return(   
                    <div className = "NavBar" >
                    
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
                            <Link to ={"/profile"} >
                            <Icon type="user" />
                                Perfil
                            </Link>
                        </li>
                        <li className ="uploadPhoto">
                            <div className ="NavBarItem">
                                <UploadPhotoButton />
                            </div>
                            
                            
                        
                        </li>
                        <SearchContact />

                        <li>
                            
                            <LogOut />
                        </li>
                        
                    </ul>
                </div>
            )
        }
            
    
}


export default withRouter(NavBar);



