import React from 'react';
import Axios from 'axios';
import NavBar from './NavBar';
import {Row, Col , Divider} from 'antd';
import "../Styles/Music.css";
export default class Music extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listMusic : []
        }
    }

    getListMusic(){
        const userId = localStorage.getItem("UserId");
        Axios.get('https://localhost:44310/api/getmusic/'+userId)
        .then(res =>{
            
                this.setState({
                    listMusic : res.data
                });
        } 
            );
    }

    componentWillMount(){
        this.getListMusic();
    }

    render(){
        if(this.state.listMusic == null){
            return <div></div>;
        }else{
            return(
                
                <div>
                <NavBar />
                <Divider orientation="left"><h2>Musica favorita</h2></Divider>
                <Row gutter={8} className ="musicGrid">
                    {this.state.listMusic.map(item =>
                        <Col key ={item.musicId} className="gutter-row" span={6}>
                        <iframe key ={item.musicId} width="80%" height="100%" src={item.urlVideo} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            
                        </Col>
                     
                     )}
                </Row>
                </div>
            );
        }
        
    }
}