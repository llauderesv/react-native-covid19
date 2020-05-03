import React, {useContext, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import Covid19TrackerContext from '../../../context/Covid19TrackerContext';
import CountryItem from '../../CountryItem';

export const ITEM_HEIGHT = 61;

const Item = ({name, code, index}) => {
  const {onPress} = useContext(Covid19TrackerContext);

  const onItemSelected = useCallback(() => {
    onPress({country: name, code, index});
  }, [name, code, index]);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onItemSelected}>
      <CountryItem name={name} code={code} />
    </TouchableOpacity>
  );
};

export default Item;
