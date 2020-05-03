import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ActivityIndicator size="large" color="#1c313a" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: 120,
    height: 80,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
  },
});

export default Loader;
