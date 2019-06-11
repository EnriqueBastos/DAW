import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

export default class ProfilePhotos extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            listPhotos : []
        }
    }

    
    componentWillMount(){
        Axios.get("https://localhost:44310/api/userphoto/getPhotosProfile/"+this.props.userId)
        .then(res =>{
            this.setState({
                listPhotos : res.data
                    
                
            });
        });
    }
    render(){
        if(this.state.listPhotos.length > 0){
            return (
                <div className="profileGallery">
                    {console.log(this.state)}
                    
                            {this.state.listPhotos.map( (photo , index) =>
                                
                                <Link to ={"/photo/"+photo.userPhotoId} key ={index}>
                                    <img alt="photoProfile" src={"data:image/png;base64,"+photo.imageBytes} className="imageProfile"/>
                                </Link>
                                
                            )}
                        
                </div>
            );
        }else{
            return (
            <div className="profileGallery">
                <h1>No hay ninguna foto subida</h1>
            </div>);
        }
        
    }
}