import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
const FileInput = () => {
  const [files, setFiles] = useState<any>(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false,
      multiple:true
    });

    if (result.type === 'success') {
      setFiles(result.uri);
    }
  };
const handleUploadFile = (file: any) => {
  console.log('file:', file);
  if (token) {
      let formData = new FormData();
      file.forEach((value: any) => {
          formData.append('files', value);
      });
      FileUploadApi.postUploadFile(formData)
          .then(async (res) => {
              const FileUpload = await res.data.map((item: any, index: any) => ({
                  Path: item.path,
                  FileName: item.filename,
                  FileSize: item.size,
              }));
              payload = {
                  ...payload,
                  FileUpload: FileUpload,
              };
              PostTask();
          })
          .catch((error) => {
              console.log('--upload error ==', error);
          });
  }
};
const handleSubmit = () => {
  //
  if (fileUploadTask?.length > 0) {
      handleUploadFile(fileUploadTask);
  } else {
      PostTask();
  }
};

  return (
    <View style={styles.container}>
      <Button title="Select file" onPress={()=>pickDocument()} />
      <Button title="Upload file" onPress={()=>{}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FileInput;
