import {createContext} from 'react';

export default createContext({
  code: 'PH',
  country: 'Philippines',
  index: 0,
  visible: false,
  onPress: ({country, code, index}) => {},
  setVisibleLists: () => {},
});
