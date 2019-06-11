import React from 'react';
import {
    Form,DatePicker, Select ,message ,Upload
} from 'antd';
import defaultUserPhoto from '../../../../Images/defaultUserPhoto.png';
import moment from 'moment';


  
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
            loading : false,
            imageUrl : "data:image/png;base64," + this.props.profile.photoProfile
        }
    }
    
    handleSubmit = (e) => {
        
          e.preventDefault();
          var ImageBytes = this.state.imageUrl.split(",")[1];
            
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
        
        console.log("Ver info",info);
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

    render(){

        

        const imageUrl = this.state.imageUrl;
        const { getFieldDecorator } = this.props.form;
        
        return(
            <React.Fragment>
                <h1>Ajustes usuario</h1>
                <Form onSubmit={this.handleSubmit}>
                <div className="change-value-settings changePhotoProfile">
                    <p >Cambiar foto de perfil</p>
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
                                initialValue: '123',
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
                </div>
                </Form>
                
                
            </React.Fragment>
            
        );
    }
}

const SettingsForm = Form.create({ name: 'settings' })(SettingsFormulary);
export default SettingsForm;