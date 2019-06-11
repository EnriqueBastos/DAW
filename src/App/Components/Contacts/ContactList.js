import React from 'react';
import Axios from 'axios';
import Contact from './Contact.js';
import {Row} from 'antd';
import NavBar from '../../Shared/NavBar/NavBar.js';
import ChatBar from '../../Shared/Chat/ChatBar.js';



export default class ContactList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contacts : []
        }
    }
    
    componentWillMount(){
        const userId = localStorage.getItem("UserId"); 
        Axios.get("https://localhost:44310/api/contacts/getFriends/"+userId).then(res =>{
            this.setState({
                contacts : <div>
                                <Row gutter={8} className ="contactGrid">
                                    {res.data.map((item , index) =>
                                        <Contact profile ={item} key ={index}/>
                                    )}
                                </Row>
                            </div>
            });

        });
    }
    
    render(){
       
        return(
            <div>
                <NavBar />
                <ChatBar />
                {this.state.contacts}
            </div>
            
            
        );
    }
}