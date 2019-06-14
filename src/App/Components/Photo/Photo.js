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
    }

    componentWillMount(){
        Axios.get("https://localhost:44310/api/userphoto/getPhotoinfo/"+this.props.match.params.photoId)
        .then(res =>{
                        this.setState({
                            photoInfo : res.data
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
                    <Col span={19}>
                        <h4>{this.state.photoInfo.title}</h4>
                    </Col>
                    <Col span ={1}>
                        {
                            this.state.photoInfo.userId + "" === localStorage.getItem("UserId") ?
                            <button className="delete-photo-button" onClick={this.handleClick}>
                                <Icon type="delete"/>
                            </button> :
                            <div></div>
                        }
                        
                    </Col>
                </Row>
                
            </div> 

            
            <Comments listComments = {this.state.photoInfo.comments} photoId = {this.state.photoInfo.userPhotoId}/>
            
            </>
            );
    }
}

export default withRouter(Photo);