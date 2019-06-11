import React from 'react';
import {Input , Button , Icon, Form } from 'antd';

export class Search extends React.Component{
    
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err,values) =>{
            if(!err){
                document.location.href ='/contacts/'+values.userName;
                
            }
            
            
        });
    }
    render(){

        const { getFieldDecorator } = this.props.form;

        return(
            <React.Fragment>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <li  className ="searchInput">
                    <Form.Item>
                        {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '  ' }],
                        })(
                            <Input	type ="text" className ="NavBarItem"/>
                        )}
                        
                    </Form.Item>
                 </li>
                
                <li className ="searchBtn">
                    <p className ="NavBarItem">
                    
                        <Button type ="Default" className ="NavBarButton" htmlType="submit">
                        <Icon type="search" />
                            Buscar contacto
                        </Button>
                    </p>
                </li>

            </Form>
            </React.Fragment>
        );
    }
}

const SearchContact = Form.create({ name: 'searchContact' })(Search);

export default SearchContact;