import React from 'react';
import Axios from 'axios';
import PhotoHome from './PhotoHome';



export default class ListPhoto extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            listPhoto : []
        }
    }
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
            return(
                <div className="listPhoto">
                    {this.state.listPhoto.map( (photo , index) =>
                        <PhotoHome key={index} photo = {photo}/>
                    )}
                </div>
            );
    }
}