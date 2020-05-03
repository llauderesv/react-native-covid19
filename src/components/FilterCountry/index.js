import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import countries from '../../data/country.json';
import Covid19TrackerContext from '../../context/Covid19TrackerContext';
import Countries from '../Countries';
import CountryItem from '../CountryItem';

const FilterCountry = () => {
  const searchInputRef = useRef(null);

  const {code, country, setVisibleLists, visible} = useContext(
    Covid19TrackerContext,
  );

  const [data, setData] = useState(countries);
  const [filterText, setFilterText] = useState(null);

  useEffect(() => {
    setData(countries);
  }, []);

  useEffect(() => {
    if (visible) {
      searchInputRef.current.focus();
    } else {
      setData(countries);
    }
  }, [visible]);

  useEffect(() => {
    if (filterText) {
      const filterCountries = countries.filter(item =>
        item.Country.includes(filterText),
      );
      setData(filterCountries);
    }
  }, [filterText]);

  const onChangeText = text => {
    setFilterText(text);
  };

  return (
    <TouchableWithoutFeedback onPress={setVisibleLists}>
      <View style={styles.container}>
        {visible ? (
          <TextInput
            ref={searchInputRef}
            style={styles.searchText}
            onTouchStart={setVisibleLists}
            autoCompleteType="off"
            onChangeText={onChangeText}
          />
        ) : (
          <CountryItem name={country} code={code} />
        )}
        {visible && <Countries data={data} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filter: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  searchText: {
    height: 50,
  },
});

export default FilterCountry;
