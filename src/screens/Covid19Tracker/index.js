import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import FilterCountry from '../../components/FilterCountry';
import request from '../../common/request';
import Loader from '../../components/Loader';
import CovidStatus from '../../components/CovidStatus';
import Covid19TrackerContext from '../../context/Covid19TrackerContext';

const Covid19Tracker = () => {
  const {Provider} = Covid19TrackerContext;

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    index: 0,
    code: 'PH',
    country: 'Philippines',
  });

  const [status, setStatus] = useState({recovered: 0, active: 0, deaths: 0});

  useEffect(() => {
    fetchCountryStatus(data.country);
  }, [data.country]);

  const fetchCountryStatus = useCallback(
    async country => {
      try {
        setLoading(true);

        const response = await request.get(
          `live/country/${country.toLocaleLowerCase()}/status/confirmed`,
        );

        // get latest update
        if (response.data.length > 0) {
          const hasProvince = response.data.some(item => item.Province);

          if (hasProvince) {
            const {active, deaths, recovered} = response.data.reduce(
              (accu, curr) => {
                if (accu['province'] !== curr['Province']) {
                  accu['active'] += curr['Active'];
                  accu['deaths'] += curr['Deaths'];
                  accu['recovered'] += curr['Recovered'];
                  accu['province'] = curr['Province'];
                }

                return accu;
              },
              {active: 0, deaths: 0, recovered: 0, province: ''},
            );

            setStatus({active, deaths, recovered});
          } else {
            const data = response.data[response.data.length - 1];
            const {Active: active, Deaths: deaths, Recovered: recovered} = data;
            setStatus({active, deaths, recovered});
          }
        } else {
          setStatus({active: 0, deaths: 0, recovered: 0});
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [data.country],
  );

  const onPressItem = ({code, country, index}) => {
    setVisible(false);

    setData({code, country, index});
  };

  const setVisibleLists = () => {
    setVisible(prevState => !prevState);
  };

  return (
    <Provider
      value={{
        visible,
        setVisibleLists,
        onPress: onPressItem,
        index: data.index,
        code: data.code,
        country: data.country,
      }}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <SafeAreaView style={styles.container}>
          {loading && <Loader />}
          <View style={styles.wrapper}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Covid-19 Update</Text>
            </View>
            <FilterCountry />
          </View>
          <CovidStatus
            recovered={status.recovered}
            deaths={status.deaths}
            active={status.active}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 30,
    zIndex: 999,
  },
  headingContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#1c313a',
    textTransform: 'uppercase',
  },
  status: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  label: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
});

export default Covid19Tracker;
