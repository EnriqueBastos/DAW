import React from 'react';
import {Col} from 'antd';
import defaultUserPhoto from '../../../Images/defaultUserPhoto.png';
import "./Contact.css";
import {Link} from 'react-router-dom';



const Contact = ({profile}) =>(
    <>

                
        <Col className="gutter-row contact" span={5} key={profile.userId} style={{padding : 0}}>
            <Link to ={"/profile/"+profile.userId} >
                <div className="img-container-contact">
                    <img 
                    alt="photoProfile" 
                    className="contactPhoto" 
                    src={profile.photoProfile ? "data:image/png;base64," + profile.photoProfile: defaultUserPhoto}
                    /> 
                </div>
                <div className ="contactName">
                    <h2>{profile.userName + " " + profile.userLastName}</h2>
                </div>
            </Link>
        </Col>


    </>
);
export default Contact;