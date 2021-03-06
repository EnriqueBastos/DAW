import React from 'react';
import 'antd/dist/antd.css';
import './Login.css';
import logo from "../../../Images/logo.png";
import Register from './Register.js';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';

import {
    Form, Icon, Input, Button,message
  } from 'antd';

  
  class NormalLoginForm extends React.Component {
    

    handleSubmit = (e) => {
      
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            Axios.post('https://localhost:44310/api/User/getUserId', values)
            .then(res =>{
                console.log(res.data);

                if(res.data.userId === -1){
                  message.error("Has introducido mal los datos");
                }
                else{
                  message.success("Has iniciado sesion");
                  localStorage.setItem("UserId", res.data.userId);
                  localStorage.setItem("BackgroundApp", res.data.backgroundApp);
                  
                  window.location = "/home";
                }
                }
              );
        }
      });
    }
  
    render() {
      
      const { getFieldDecorator } = this.props.form;
      
      return (
          
            
        <div className = "loginForm">
          <img src = {logo} alt ="logo" />
          <div className="loginInput">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item>
                  {getFieldDecorator('Email', {
                  rules: [{ required: true, message: 'Introduce tu usuario' }],
                  })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" allowClear autoFocus/>
                  )}
              </Form.Item>
              <Form.Item>
                  {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Introduce tu contraseña' }],
                  })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" allowClear/>
                  )}
              </Form.Item>
              
              <Form.Item>
                  {/* {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
                  })(
                  <Checkbox>Recordarme</Checkbox>
                  )} */}
                  
                  <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                  </Button>
                  <br />

                  <Register />
                  
                  
              </Form.Item>
            </Form>
            </div>
        </div>
      );
    }
  }
  
  const Login = Form.create({ name: 'login' })(NormalLoginForm);
  export default withRouter(Login);
  
  
  

