import React from 'react';
import { Form, Input, Button, Icon, Row, Col } from 'antd';
import {withRouter} from 'react-router-dom';
class AddMusic extends React.Component{
    handleSubmit= e =>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {

            var UrlVideo = values.urlVideo.split("watch?v=");
            UrlVideo = UrlVideo[0] + "embed/" + UrlVideo[1];
            this.props.handleAddMusic(UrlVideo);
            
        });
    }
    
    render(){
        const {getFieldDecorator} = this.props.form;
        return(
            <Form onSubmit={this.handleSubmit} className="addmusic-form">
                <Form.Item >
                    <Row gutter={8}>
                        <Col span ={18}>
                            {getFieldDecorator('urlVideo', {
                            rules: [{ required: true, message: ' ' }],
                            })(
                                <Input 
                                prefix={<Icon type="customer-service" />} 
                                placeholder="   Inserta url youtube" 
                                autoFocus/>
                                
                            )}
                        </Col>
                        <Col span ={6}>
                            <Button type="default" htmlType="submit">Agregar video</Button>
                        </Col>
                    </Row>
                    
                    
                </Form.Item>
                
                
            </Form>
        );
    }
}
const AddMusicForm = Form.create({ name: 'addMusic' })(AddMusic);

export default withRouter(AddMusicForm);