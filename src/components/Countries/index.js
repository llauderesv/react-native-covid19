import React, {useRef, useEffect, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import CountryItem, {ITEM_HEIGHT} from './Item';
import Covid19TrackerContext from '../../context/Covid19TrackerContext';

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({item, index}) => {
  return <CountryItem name={item.Country} code={item.ISO2} index={index} />;
};

const Countries = ({data}) => {
  const countriesRef = useRef(null);

  const {index} = useContext(Covid19TrackerContext);

  useEffect(() => {
    if (countriesRef) {
      countriesRef.current.scrollToIndex({
        index,
        animated: false,
      });
    }
  }, []);

  return (
    <FlatList
      ref={countriesRef}
      style={styles.lists}
      bounces={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.ISO2.toString()}
      ItemSeparatorComponent={ItemSeparator}
      windowSize={40}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  lists: {
    height: 300,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginHorizontal: 10,
  },
});

export default Countries;
