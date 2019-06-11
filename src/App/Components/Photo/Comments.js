import React from 'react';
import { 
    Row , Col , Form , Icon
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Axios from 'axios';
import {Link} from 'react-router-dom'


export class CommentList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            UserId : localStorage.getItem("UserId"),
            CommentText : "",
            
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if(!err){
                await this.setState({
                    UserPhotoId : this.props.photoId,
                    CommentText : values.commentText
                });
                
            Axios.post("https://localhost:44310/api/userphotocomment/addcomment",this.state).then(res =>{
                document.location.reload();
            });
            }
        
        });
    }

    render(){

        const { getFieldDecorator } = this.props.form;


        if(this.props.listComments){
            return (
                <div className ="comment-bg">
                    
                        <Form onSubmit={this.handleSubmit} className="form-comments">
                                <Row>
                                    <Col span={21}>
                                        <Form.Item >
                                            {getFieldDecorator(`commentText`, {
                                            rules: [
                                                {
                                                required: true,
                                                message: 'Introduce commentario!',
                                                },
                                            ],
                                            })(<TextArea className="comment-text"  placeholder ="Introduce comentario..."/>)}
                                        
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <button htmltype="submit" onClick = {this.handleSubmit} className="button-comments"><Icon type="arrow-right" /></button>
                                    </Col>

                                </Row>
                                
                                
                            
                        </Form>
                        
                            <div className="list-comment-container">
                                {this.props.listComments.length === 0 ?
                                    <div className="comment-container">
                                        <h1 style={{textAlign : 'center' , marginTop : '2.5%' , fontStyle : 'oblique'}}>No hay comentarios</h1>
                                    </div> :
                                    this.props.listComments.map(comment =>(
                                        <Row className ="comment-container">
                                            <Col span={6}>
                                                <Link to ={"/profile/" + comment.userId}><h2>{comment.userName}</h2></Link>
                                            </Col>
                                            <Col span={18}>
                                                <p>{comment.commentText}</p>
                                            </Col>
                                        </Row>
                                    ))
                                }
                            </div>
                            
                        </div>
                    
                    );
            
        }else{
            return <div></div>;
        }
    
        
    }
}

const Comments = Form.create({ name: 'comments' })(CommentList);

export default Comments;