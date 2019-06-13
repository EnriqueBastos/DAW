import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

export default class ProfilePhotos extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            listPhotos : [],
            userId : this.props.userId
        }
        this.getProfilePhotos = this.getProfilePhotos.bind(this);
    }

    
    componentWillMount(){
        this.getProfilePhotos();
    }
    componentDidUpdate(){
        if(this.state.userId !== this.props.userId){
            this.getProfilePhotos();
            this.setState({
                userId : this.props.userId
            })
        }
    }
    getProfilePhotos(){
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
                            {this.state.listPhotos.map( (photo , index) =>
                                <Link to ={"/photo/"+photo.userPhotoId} key ={index}>
                                    <img alt="photoProfile" src={"data:image/png;base64,"+photo.imageBytes} className="imageProfile"/>
                                </Link>
                                
                            )}
                        
                </div>
            );
        }else{
            return (
                <h1 className="no-photos-gallery">No hay ninguna foto subida</h1>
                );
        }
        
    }
}