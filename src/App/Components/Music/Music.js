import React from 'react';
import Axios from 'axios';
import AddMusicForm from './AddMusicForm';
import {Row, Col , message ,  Icon} from 'antd';
import {withRouter} from 'react-router-dom';
import "./Music.css";
import {Link} from 'react-router-dom';

class Music extends React.Component{
    
    constructor(props){
        
        super(props);
        this.state = {
            listMusic : []
        }
    }
    handleAddMusic(urlVideoIframe){
        const musicDto = {
            UserId : localStorage.getItem("UserId"),
            UrlVideo : urlVideoIframe

        }
        
        Axios.post("https://localhost:44310/api/Music/AddMusic",musicDto).then(res =>{
                
                message.success("Video añadido");
            }
        );
    }

    componentWillMount(){
        const userId = this.props.match.params.userId ? this.props.match.params.userId : localStorage.getItem("UserId");
        Axios.get('https://localhost:44310/api/music/getmusic/'+userId)
        .then(res =>{
                this.setState({
                    listMusic : res.data.musicDtos,
                    userName : res.data.userName
                });
            } 
        );
    }

    handleClick(musicId){
        var music = {
            musicId : musicId
        }
        Axios.post("https://localhost:44310/api/music/DeleteMusic" , music).then( () =>{
            var listMusic = this.state.listMusic.filter( m => m.musicId !== musicId);
            this.setState({listMusic});
            }
                
                
        );
    }

    render(){
        if(this.state.listMusic == null){
            return <div></div>;
        }else{
            return(
                
                <div className="music">
                    {
                        this.props.match.params.userId ?
                        <h1 className="user-music">
                            <Link to={"/profile/" + this.props.match.params.userId}>{"Música de " + this.state.userName}</Link>
                        </h1> :
                        <AddMusicForm handleAddMusic = {this.handleAddMusic} /> 
                    }
                    <Row gutter={8} className ="musicGrid">
                        {
                            
                            this.state.listMusic.length > 0 ?
                            this.state.listMusic.map((video , index) =>
                                <Col key ={index} className="gutter-row youtube-video" span={8}>
                                    {
                                        this.props.match.params.userId ? 
                                        <button className="copy-music" onClick ={()=> this.handleAddMusic(video.urlVideo)}>
                                            Añadir a mi música
                                        </button> :
                                        <button className="delete-video" onClick={() => this.handleClick(video.musicId)}>
                                            <Icon type="close" />
                                        </button>
                                    }
                                    
                                    <iframe 
                                    key ={video.musicId}
                                    title = {video.musicId} 
                                    width="80%" 
                                    src={video.urlVideo} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen>
                                    </iframe>
                                                
                                </Col>
                                        
                            ) :
                            <h1 style ={{textAlign : "center" , fontStyle : "oblique" , padding :"10%"}}>No hay música</h1>


                        }
                    </Row>
                </div>
            );
        }
        
    }
}

export default withRouter(Music);