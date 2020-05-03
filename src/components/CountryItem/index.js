import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const CountryItem = ({name, code}) => {
  return (
    <View style={styles.item}>
      <Image
        source={{uri: `https://www.countryflags.io/${code}/flat/64.png`}}
        style={styles.image}
      />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
});

export default CountryItem;
