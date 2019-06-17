import React from 'react';
import {
    Form,DatePicker, Select ,message ,Upload
} from 'antd';
import defaultUserPhoto from '../../../../Images/defaultUserPhoto.png';
import moment from 'moment';
import colours from '../../../Data/Colours';
import Axios from 'axios';


  
  function beforeUpload(file) {
    
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return  isLt2M;
  }

class SettingsFormulary extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            loading : false
        }
    }
    
    handleSubmit = (e) => {
        
          e.preventDefault();
          
          var ImageBytes = this.state.imageUrl ? this.state.imageUrl.split(",")[1] : this.props.profile.photoProfile;
            
          this.props.form.validateFieldsAndScroll((err, values) => {
            
            if (!err) {
                const profile = {
                    Id : localStorage.getItem("UserId"),
                    Name : values.Name,
                    LastName : values.LastName,
                    Email : values.Email,
                    Password : values.Password,
                    Description : values.Description,
                    DateBirthday : values.DateBirthDay,
                    BackgroundApp : values.BackgroundApp,
                    PhotoProfile : ImageBytes,
                    Private : values.Private === "public" ? false : true

                }
                
                this.props.handleSaveChanges(profile);
                
            }else{
                message.error("No puedes dejar campos en blanco");
            }
          });
      }

      getDataURL(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

      
      handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
    
        if (info.file.status === 'done') {
          this.getDataURL(info.file.originFileObj, imageUrl =>
                this.setState({
                  imageUrl,
                  loading: false,
                }),
              );
        }
      };
      handleDeleteUser(){
          var userDto = {
              Id : parseInt(localStorage.getItem("UserId"))
          }
          Axios.post("https://localhost:44310/api/user/deleteuser" , userDto).then( () =>{
            window.location.href='../../';
          });
      }

    render(){

        

        const imageUrl = this.state.imageUrl ? this.state.imageUrl : "data:image/png;base64," + this.props.profile.photoProfile;
        const { getFieldDecorator } = this.props.form;
        
        return(
            <>
                <h1>Ajustes usuario</h1>
                <div className="settings-container-overflow">
                <Form onSubmit={this.handleSubmit}>
                <div className="change-value-settings changePhotoProfile">
                    <p>Cambiar foto de perfil</p>
                    <div>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {
                            imageUrl !== "data:image/png;base64,null" && imageUrl !== "data:image/png;base64," ?
                                <img src={imageUrl} alt="avatar" id="change-photo"/> :
                                <img src={defaultUserPhoto} alt="PhotoProfile" id="change-photo"/>
                        }
                    </Upload>
                     </div>
                </div>
                <div className="change-value-settings">
                    <p >Cambiar nombre</p>
                    
                        <Form.Item className="settings-column">
                            {getFieldDecorator('Name', {
                                initialValue: this.props.profile.userName,
                                rules: [{ required: true, message: ' ' }],
                                })(

                                    <input type ="text"/>

                            )}
                        </Form.Item>
                    
                </div>
                <div className="change-value-settings">
                    <p >Cambiar apellidos</p>
                        <Form.Item className="settings-column">
                            {getFieldDecorator('LastName', {
                                initialValue: this.props.profile.userLastName,
                                rules: [{ required: true, message: ' ' }],
                                })(

                                    <input type ="text"/>

                            )}
                        </Form.Item>
                </div>
                <div className="change-value-settings">
                    <p >Cambiar email</p>
                    <Form.Item className="settings-column">
                            {getFieldDecorator('Email', {
                                initialValue: this.props.profile.email,
                                rules: [{ required: true, message: ' ' }],
                                })(

                                    <input type ="text"/>

                            )}
                    </Form.Item>
                </div>
                <div className="change-value-settings">
                    <p >Cambiar contraseña</p>
                    <Form.Item className="settings-column">
                            {getFieldDecorator('Password', {
                                initialValue: this.props.profile.password,
                                rules: [{ required: true, message: ' ' }],
                                })(

                                    <input type ="password"/>

                            )}
                    </Form.Item>
                </div>
                <div className="change-value-settings changePhotoProfile">
                    <p >Cambiar descripción</p>
                    <Form.Item className="settings-column" style = {{marginTop : '-24px'}}>
                            {getFieldDecorator('Description', {
                                initialValue: this.props.profile.description,
                                rules: [{ required: true, message: ' ' }],
                                })(

                                    <textarea className="textArea-settings"
                                    style = {{
                                        width:'90%',
                                        marginTop : '1em', 
                                        fontSize : '0.8em',
                                        fontStyle: 'oblique',
                                        lineHeight: '20px',
                                        height: '7em',
                                        resize : 'none',
                                        padding: '10px'
                                        
                                    }}>
                                    
                                    </textarea>
                            )}
                    </Form.Item>
                    
                </div>
                <div className="change-value-settings">
                    <p >Cambiar fecha nacimiento</p>
                    <Form.Item className="settings-column">
                        {getFieldDecorator('DateBirthDay', {
                        initialValue : moment(this.props.profile.dateBirthday, 'YYYY/MM/DD'),
                        rules: [{ required: true, message: ' ' }],
                        })(
                        <DatePicker
                            style={{ width: '100%', border : 'none' }}
                            
                            getPopupContainer={trigger => trigger.parentNode}
                            
                        />
                        )}
                    </Form.Item>
                </div>
                <div className="change-value-settings">
                    <p>Cambiar color aplicación</p>
                    <Form.Item className ="settings-column">
                        {getFieldDecorator('BackgroundApp', {
                        rules: [{ required: true, message: ' ' }],
                        })(
                        <Select placeholder="Selecciona un color">
                            {colours.map( ({name , colour} , index) => {
                                return <Select.Option  key = {index} style={{color : colour , backgroundColor : colour}} value ={colour}>{name}</Select.Option>
                            })}
                        </Select>
                        )}
                    </Form.Item>
                </div>
                <div className="change-value-settings">
                    <p >Cambiar privacidad</p>
                    <Form.Item className="settings-column">
                        {getFieldDecorator('Private', {
                            initialValue : this.props.profile.private ? "Privada" : "Pública",
                            rules: [{ required: true, message: 'Elija el tipo de cuenta' }],
                        })(
                            <Select>
                                <Select.Option value="public">Pública</Select.Option>
                                <Select.Option value="private">Privada</Select.Option>
                            </Select>
                            
                        )}
                      </Form.Item>
                </div>
                <div className = "change-value-button">
                    <button htmltype="submit">Guardar cambios</button>
                    <button className="delete-user" onClick ={this.handleDeleteUser}>Borrar usuario</button>
                </div>
                </Form>
                </div>
                
                
                
            </>
            
        );
    }
}

const SettingsForm = Form.create({ name: 'settings' })(SettingsFormulary);
export default SettingsForm;