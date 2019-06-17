import React from 'react';
import {Row , Col , Icon} from 'antd';
import {Link} from 'react-router-dom';
import Axios from 'axios';


export default class PhotoHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            numLikes : this.props.photo.likesPhotoDtos.length
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount(){
        var isLike = this.props.photo.likesPhotoDtos.some( 
            photo => parseInt(localStorage.getItem("UserId")) === photo.userId
            );
        this.setState({isLike});
    }

    handleClick(){
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
            UserPhotoId : this.props.photo.userPhotoId
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
            UserPhotoId : this.props.photo.userPhotoId
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
            <div className="card-photo">
                        <Link to ={"/photo/"+this.props.photo.userPhotoId} >
                            <div className ="photo-container">
                                <img alt="photoProfile" width="100"  src={"data:image/png;base64,"+this.props.photo.imageBytes} className="photoHome"/>
                            </div>
                        </Link>
                        
                        <div className="photo-info">
                            <Row>
                                <Col span = {4}>
                                    <Link to = {"/profile/" + this.props.photo.userId}>
                                        <p style={{color:'rgb(0, 130, 170)'}}>{this.props.photo.userName}</p>
                                    </Link>
                                </Col>
                                <Col span = {17}>
                                    <p style={{marginLeft:"2%" , fontSize : "0.9em"}}>
                                        {this.props.photo.title}
                                    </p>
                                </Col>
                                <Col span = {3} style={{ fontSize : "1.2em"}}>
                                    <p>{this.state.numLikes}</p>
                                    <button className ="button-like" onClick = {this.handleClick}>
                                        <Icon type="heart" theme="filled" style={this.state.isLike ? {color : "red"} : {color:"grey"}}/>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    </div>
        );
    }
}