import * as React from 'react';
import {Button, Icon,Input} from 'antd';
import "../Styles/UploadPhoto.css";
import Axios from 'axios';

//const IncomingForm = require('formidable').IncomingForm;

let kike;

const handleFileRead = (e) =>{
    const content = kike.result;
    console.log(content);
}
export default class UploadPhotoButton extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            ImageBytes : null
        }
    }
    

    
    fileUploadHandler(){
        console.log(this.state);
        
    }

    handleClick (){
        var res = document.getElementById("uploadPhoto");
        
        if(res.style.display === "none" || res.style.display ===""){

            res.style.display = "flex";
         }else{
            
            res.style.display = "none";

        }
        
    }
    
    handleChange(e)
    {
        let files = e.target.files;
        let reader = new FileReader() ;
        reader.readAsArrayBuffer(files[0]);
        reader.onloadend =(e)=>{
        console.log(e.target.result);
            //var image = { ImageBytes : "new Uint8Array(e.target.result)," , Title : "en la playa"};
        this.setState({
            ImageBytes : btoa(String.fromCharCode.apply(null, new Uint8Array(e.target.result)))
        })
        
        console.log(this.state);
        
        Axios.post("https://localhost:44310/api/photo/UploadPhoto",this.state);
        };
        

        //console.log(selectorFiles);
    }

    

    
    render(){
        
        
        return(
            <div>
            <Button type ="Default" className ="NavBarButton" onClick = {this.handleClick}>
                <Icon type="upload" />
                        Subir foto
            </Button>
            <div className="bg-uploadPhoto" id="uploadPhoto">
                <div className="uploadPhoto-container">
                    <div className="close-uploadPhoto" onClick = {this.handleClick}>
                        +
                    </div>
                    <input type="file" onChange={ (e) => this.handleChange(e) } />
                    <button onClick ={this.fileUploadHandler}>Subir foto</button>
                    
                </div>

            </div>

            </div>
        );
    }
}