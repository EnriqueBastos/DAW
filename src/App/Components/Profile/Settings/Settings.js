import React from 'react';
import { Icon } from 'antd';
import './Settings.css';
import SettingsForm from './SettingsForm';

export default class Settings extends React.Component{
    handleClick(){
        var res = document.getElementById("settings-bg-container");
        
        if(res.style.display === "none" || res.style.display ===""){
            res.style.display = "flex";
        }else{
            res.style.display = "none";
        }
    }
    render(){
        return  (
            <>
                {console.log("PRKIFEOEW" ,this.props.profile)}
                <button onClick = {this.handleClick} className="settings-button"><Icon type="setting" /></button>
                <div className="settings-bg-container" id="settings-bg-container">
                    <div className="settings-container" >
                    <div className="close-settings" onClick = {this.handleClick}>
                            +
                    </div>
                        <SettingsForm profile= {this.props.profile} handleSaveChanges = {this.props.handleSaveChanges}/>
                    </div>
                </div>
            </>
        
        )
    }
}