import React from 'react';
import Axios from 'axios';
import './Photo.css';
import Comments from './Comments';
import NavBar from '../../Shared/NavBar/NavBar';
import { Row, Col } from 'antd';
import {Link} from 'react-router-dom';

export default class Photo extends React.Component{
    constructor(){
        super();
        this.state = {
            photoInfo : {}
        }
    }
    /*
    <div className="photo-container ">
                    {console.log(this.state)}
                    <img 
                    alt="photoProfile" 
                    src={"data:image/png;base64,"+ this.state.photoInfo.imageBytes}
                    className  = "photoInfo"
                    />
                    
                    <Comments listComments = {this.state.photoInfo.comments} photoId = {this.state.photoInfo.userPhotoId}/>
                </div>
    */
    

    componentWillMount(){

        Axios.get("https://localhost:44310/api/userphoto/getPhotoinfo/"+this.props.match.params.photoId)
        .then(res =>{
                        this.setState({
                            photoInfo : res.data
                        });
                    }
            
            );
    }

    render(){
        return (
            <React.Fragment>
            <NavBar />
            <div className="card-photo-details" >
                <div className="photo-container">
                    <img 
                        alt="photoProfile" 
                        src={"data:image/png;base64,"+ this.state.photoInfo.imageBytes}
                        className  = "photoHome"
                        />
                    
                </div>
                
                
                
            </div>
            <div className="user-title-photo">
                <Row>
                    <Col span={4}>
                        <Link to ={"/profile/" + this.state.photoInfo.userId}><h2>{this.state.photoInfo.userName}</h2></Link>
                    </Col>
                    <Col span={20}>
                        <h4>{this.state.photoInfo.title}</h4>
                    </Col>
                </Row>
                
            </div> 

            
            <Comments listComments = {this.state.photoInfo.comments} photoId = {this.state.photoInfo.userPhotoId}/>
            
            </React.Fragment>
            );
    }
}