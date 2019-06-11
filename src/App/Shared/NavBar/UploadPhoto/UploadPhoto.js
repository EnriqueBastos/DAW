import * as React from 'react';
import {Button, Icon} from 'antd';
import "./UploadPhoto.css";
import UploadPhotoInputFile from './UploadPhotoForm.js';



export default class UploadPhotoButton extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            
            ImageBytes : null
        }
    }
    


    handleClick (){
        var res = document.getElementById("uploadPhoto");
        
        if(res.style.display === "none" || res.style.display ===""){

            res.style.display = "flex";
         }else{
            
            res.style.display = "none";

        }
        
    }
    
    
    
    render(){
        
        
        return(
            <div>
            <Button type ="Default" className ="NavBarButton" onClick = {this.handleClick}>
                <Icon type="upload" />
                        Subir foto
            </Button>
            <div className="bg-uploadPhoto" id="uploadPhoto" >
                <div className="uploadPhoto-container">
                    <div className="close-uploadPhoto" onClick = {this.handleClick}>
                        +
                    </div>
                    <UploadPhotoInputFile/>
                    
                    
                </div>

            </div>

            </div>
        );
    }
}