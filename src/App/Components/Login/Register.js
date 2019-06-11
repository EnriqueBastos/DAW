import React from 'react';
import {withRouter} from 'react-router-dom';
import {
    Drawer, Form, Button, Col, Row, Input,  DatePicker,
  } from 'antd';
import Axios from 'axios';

  
    
  class DrawerForm extends React.Component {
    state = { visible: false };
  
    
    handleSubmit = (e)=> {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        debugger;
        if (!err) {
          var loginDto = {
            Email : values.Email,
            Password : values.Password
          }
         
          Axios.post('https://localhost:44310/api/user/AddUser',values).then(res =>{
            Axios.get('https://localhost:44310/api/User/getUserId',loginDto).then(response =>{
              localStorage.setItem("UserId",res.data);
              this.props.match.history.push("/home");
            })
          });
          

        }
      });
    }

    showDrawer = () => {
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
          <Button type="link" onClick={this.showDrawer}>
            ¡ Registrate ahora !
          </Button>
          <Drawer
            title="Crear nueva cuenta"
            width={720}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Nombre">
                    {getFieldDecorator('Name', {
                      rules: [{ required: true, message: 'Introduzca nombre de usuario' }],
                    })(<Input placeholder="Nombre del usuario" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Apellidos">
                    {getFieldDecorator('LastName', {
                      rules: [{ required: true, message: 'Introduzca su apellido' }],
                    })(
                      <Input placeholder="Introduzca apellidos del usuario" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email">
                    {getFieldDecorator('Email', {
                      rules: [{ required: true, message: 'Introduzca email' }],
                    })(
                      <Input placeholder="Introduzca email" />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label="Fecha de nacimiento">
                    {getFieldDecorator('DateBirthDay', {
                      rules: [{ required: true, message: 'Introduzca fecha de nacimiento' }],
                    })(
                      <DatePicker
                        style={{ width: '100%' }}
                        getPopupContainer={trigger => trigger.parentNode}
                        placeholder ="Selecciona fecha"
                      />
                    )}
                  </Form.Item>
                </Col>
                
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Contraseña">
                    {getFieldDecorator('Password', {
                      rules: [{ required: true, message: 'Introduzca contraseña' }],
                    })(
                        <Input type="password" placeholder="Introduce contraseña" />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Color de la aplicacion">
                    {getFieldDecorator('Background-App', {
                      rules: [{ required: true, message: 'Introduzca color' }],
                    })(
                        <Input type="color"  />
                    )}
                  </Form.Item>
                </Col>
               
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                    {/*<Form.Item label="Tipo de cuenta">
                      {getFieldDecorator('Private', {
                        rules: [{ required: true, message: 'Elija el tipo de cuenta' }],
                      })(
                        <Select placeholder="Pública / Privada">
                          <Option value="public">Pública</Option>
                          <Option value="private">Privada</Option>
                        </Select>
                      )}
                    </Form.Item>*/}
                  </Col>
              </Row>
              <br/>
              
              
              <Button onClick={this.handleSubmit} type="primary" htmlType ="submit" style={{ marginRight: 20, marginLeft: 270,marginTop:50 }}>
                Crear
              </Button>
              <Button onClick={this.onClose} >
                Cancelar
              </Button>
            </Form>
          </Drawer>
        </div>
      );
    }
  }
  
const Register = Form.create()(DrawerForm);

export default withRouter(Register);
  