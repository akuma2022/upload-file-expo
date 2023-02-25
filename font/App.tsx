import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: false,
      });
      if (result.type === 'success') {
        setSelectedFile(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <Button title="Pick File" onPress={pickFile} />
      {selectedFile ? (
        <Text>Selected File: {selectedFile.name}</Text>
      ) : (
        <Text>No file selected</Text>
      )}
    </View>
  );
};

export default App;