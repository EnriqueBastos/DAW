import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';



export default class ListPhoto extends React.Component{
    getPhotos(){
        Axios.get("https://localhost:44310/api/userphoto/getPhotoContacts/"+localStorage.getItem("UserId")).then(res =>{
            this.setState({
                listPhoto : res.data
            });
        });
    }
    componentWillMount(){
        this.getPhotos();
    }

    render(){
        if(this.state === null){
            return < div/>
        }else{
            return(
                <div className="listPhoto">
                {this.state.listPhoto.map( (photo , index) =>
                    <div className="card-photo" key ={index}>
                        <Link to ={"/photo/"+photo.userPhotoId} >
                            <div className ="photo-container">
                                <img alt="photoProfile" width="100"  src={"data:image/png;base64,"+photo.imageBytes} className="photoHome"/>
                            </div>
                        </Link>
                        
                        <div className="photo-info">
                            <Link to = {"/profile/" + photo.userId}>
                                <p style={{color:'rgb(0, 130, 170)'}}>{photo.userName}</p>
                            </Link>
                            <p style={{marginLeft:"2%" , fontSize : "0.9em"}}>
                                {photo.title}
                            </p>
                            
                        </div>
                    </div>
                    
                    
                    
                    
                )}
                    
                        
                    
                </div>
                
                
            );
        }
    }
}