import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const S3_BUCKET = 'your-s3-bucket-name';
const REGION = 'your-s3-bucket-region';
const ACCESS_KEY = 'your-aws-access-key';
const SECRET_KEY = 'your-aws-secret-key';

const getSignedUrl = (file) => {
  const fileName = encodeURIComponent(file.name);
  const fileType = encodeURIComponent(file.type);
  return axios.get(`/api/s3/signed-url?fileName=${fileName}&fileType=${fileType}`)
    .then(response => response.data.url);
};

const uploadFile = (file, signedUrl, onProgress) => {
  return axios.put(signedUrl, file, {
    headers: {
      'Content-Type': file.type,
      'x-amz-acl': 'public-read'
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress(percentCompleted);
    }
  });
};

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleChange = async (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      setProgress(0);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const imageUrl = info.file.response.url;
      setImageUrl(imageUrl);
      message.success('Image uploaded successfully');
    }
    if (info.file.status === 'error') {
      setLoading(false);
      message.error('Image upload failed');
    }
  };

  const handleBeforeUpload = async (file) => {
    const signedUrl = await getSignedUrl(file);
    await uploadFile(file, signedUrl, setProgress);
    return { abort: false };
  };

  return (
    <Upload
      name="image"
      listType="picture-card"
      className="image-uploader"
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="image" style={{ width: '100%' }} /> : uploadButton}
      {loading && <LoadingOutlined style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}
      {progress > 0 && <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${progress}%`, height: 5, backgroundColor: 'green' }}></div>}
    </Upload>
  );
};

export default UploadImage;
