// components/FileUploader.tsx

import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

interface CustomFile extends File {
  preview: string;
}

interface FileUploaderProps {
  onUpload: (files: CustomFile[]) => void;
  title: string;
}

interface FileUploaderProps {}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, title }) => {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    const filesWithPreview: CustomFile[] = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFiles(filesWithPreview);
  };

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onUpload(files);
      setFiles([]);
    }, 2000);
  };

  return (
    <Grid container md={5} xs={12} display={'flow'}>
      <Typography variant='h6' color={'primary'} textAlign={'center'} mb={3}>
        {title}
      </Typography>
      <Grid item display={'grid'} mb={3}>
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <Paper
              {...getRootProps()}
              elevation={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2
              }}
            >
              <input {...getInputProps()} />
              <Typography variant='body1' gutterBottom>
                یک تصویر را در اینجا بکشید و رها کنید یا برای انتخاب یکی کلیک
                کنید.
              </Typography>
            </Paper>
          )}
        </Dropzone>
      </Grid>

      {files.length > 0 && (
        <Grid item display={'grid'} justifyContent={'center'}>
          <Grid item>
            {files.map((file) => (
              <Grid key={file.name}>
                <Image
                  src={file.preview}
                  alt={file.name}
                  height={300}
                  width={300}
                  style={{
                    borderRadius: '4px'
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item justifyContent={'center'}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleUpload}
              disabled={loading}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'بارگذاری'
              )}
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default FileUploader;
