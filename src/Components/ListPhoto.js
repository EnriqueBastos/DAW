import React from 'react';
import Axios from 'axios';
import {Card } from 'antd';

const { Meta } = Card;

export default class ListPhoto extends React.Component{
    getPhotos(){
        Axios.get("https://localhost:44310/api/userphoto/getPhotos").then(res =>{
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
                {this.state.listPhoto.map( photo =>
                    <Card
                    hoverable
                    className ="cardPhoto"
                    cover={<img alt="photoProfile" src={"data:image/png;base64,"+photo.imageBytes} className="photoHome"/>}
                    key ={photo.id}
                    >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                )}
                    
                        
                    
                </div>
                
                
            );
        }
    }
}