import { Upload, Icon, message , Form } from 'antd';
import React from 'react';
import Axios from 'axios';



function beforeUpload(file) {
  /*const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }*/
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return  isLt2M;
}

class UploadPhoto extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      loading : false,
    }
    
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.imageUrl){
        var ImageBytes = this.state.imageUrl.split(",")[1];
        this.props.form.validateFieldsAndScroll((err, values) => {
          var AddPhotoDto = {
            UserId : localStorage.getItem("UserId"),
            ImageBytes : ImageBytes,
            Title : values.Title
          }
          Axios.post("https://localhost:44310/api/UserPhoto/AddPhoto",AddPhotoDto).then(res =>{
            document.location.reload();
          });
        });
    }else{
      message.error("No has introducido ninguna foto");
    }
    
      
      
      
      
    
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
 

  render() {
    
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              
            {imageUrl ? <img src={imageUrl} alt="avatar" className="uploadButton"/> : uploadButton}
          </Upload>
          <Form.Item>
            {getFieldDecorator('Title', {
              rules : [{required: false}]
              })(
                <input type="text" placeholder="Introduce titulo" id="titlePhoto"/>
              )}
              
          </Form.Item>
            
          <br />
          <button htmltype="sumbit"> Subir foto</button>
      </Form>
    );
  }
}

const UploadPhotoForm = Form.create({ name: 'login' })(UploadPhoto);

export default UploadPhotoForm;