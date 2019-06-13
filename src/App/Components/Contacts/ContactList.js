import React from 'react';
import Axios from 'axios';
import Contact from './Contact.js';
import {Row} from 'antd';



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
                contacts : res.data
            });

        });
    }
    
    render(){
       
        return(
            <div>
                {
                    this.state.contacts.length > 0 ?
                    <Row gutter={8} className ="contactGrid">
                        {this.state.contacts.map((item , index) =>
                            <Contact profile ={item} key ={index}/>
                        )}
                    </Row> :
                    <div className="no-contacts">
                        <h1>No tienes amigos agregados</h1>
                    </div>
                }
                
            </div>
            
            
        );
    }
}