import React from 'react';
import Axios from 'axios';
import './Photo.css';
import Comments from './Comments';
import { Row, Col, Icon } from 'antd';
import {Link , withRouter} from 'react-router-dom';

class Photo extends React.Component{
    constructor(){
        super();
        this.state = {
            photoInfo : {}
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickLike = this.handleClickLike.bind(this);
    }

    componentWillMount(){
        Axios.get("https://localhost:44310/api/userphoto/getPhotoinfo/"+this.props.match.params.photoId)
        .then(res =>{
            var isLike = res.data.likesPhotoDtos.some( 
                photo => parseInt(localStorage.getItem("UserId")) === photo.userId
                );
                this.setState({
                    photoInfo : res.data,
                    numLikes : res.data.likesPhotoDtos.length,
                    isLike
                });
             }
            );
    }

    handleClick(){
        var photo = {
            PhotoId : this.state.photoInfo.photoId
        }
        Axios.post("https://localhost:44310/api/userphoto/DeletePhoto" , photo)
            .then(res =>{
                this.props.history.push("/profile/" + this.state.photoInfo.userId);
            });
    }
    handleClickLike(){
        if(this.state.isLike){
            this.dislikePhoto();
        }else{
            this.likePhoto();
        }
    }
    likePhoto(){
        var isLike = !this.state.isLike;
        var numLikes = this.state.numLikes;
        var likeDto = {
            UserId : parseInt(localStorage.getItem("UserId")),
            UserPhotoId : this.props.match.params.photoId
        }
        Axios.post("https://localhost:44310/api/LikesPhoto/addlike" , likeDto).then(()=>{
            this.setState({
                 numLikes : numLikes + 1,
                 isLike
                 
                })
        });
    }
    dislikePhoto(){
        var isLike = !this.state.isLike;
        var numLikes = this.state.numLikes;
        var likeDto = {
            UserId : parseInt(localStorage.getItem("UserId")),
            UserPhotoId : this.props.match.params.photoId
        }
        Axios.post("https://localhost:44310/api/LikesPhoto/deletelike" , likeDto).then(()=>{
            this.setState({ 
                numLikes : numLikes - 1,
                isLike
            })
        })
    }

    render(){
        return (
            <>
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
                    <Col span={17}>
                        <h4>{this.state.photoInfo.title}</h4>
                    </Col>
                    <Col span ={1}>
                        {
                            this.state.photoInfo.userId + "" === localStorage.getItem("UserId") ?
                            <button className="delete-photo-button" onClick={this.handleClick}>
                                <Icon type="delete"/>
                            </button> :
                            ""
                        }
                        
                    </Col>
                    <Col span ={2} style = {{fontSize : "2em"}}>
                        <p style={{float : "left"}}>{this.state.numLikes}</p>
                        <button className ="button-like" onClick ={this.handleClickLike}>
                            <Icon type="heart" theme="filled" style={this.state.isLike ? {color : "red"} : {color:"grey" }}/>
                        </button>
                    </Col>
                </Row>
                
            </div> 

            
            <Comments listComments = {this.state.photoInfo.comments} photoId = {this.state.photoInfo.userPhotoId}/>
            
            </>
            );
    }
}

export default withRouter(Photo);