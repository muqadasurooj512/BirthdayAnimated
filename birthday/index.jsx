// src/screens/birthday/index.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackgroundAnimation from '../../components/animated';
import TextAnimated from '../../components/textAnimated';
const Birthday = () => {
  return (
    <View style={styles.container}>
      <BackgroundAnimation />
      <View>
      <TextAnimated />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Birthday;
