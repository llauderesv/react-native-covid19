import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CovidStatus = ({recovered = 0, deaths = 0, active = 0}) => {
  const getTotalCases = () => {
    return recovered + active + deaths;
  };

  return (
    <View style={{flex: 3}}>
      <View style={styles.totalCasesContainer}>
        <Text style={styles.total} numberOfLines={1}>
          {getTotalCases()}
        </Text>
        <Text style={styles.label}>Total Cases</Text>
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.item}>
          <Text style={[styles.number, styles.recovered]} numberOfLines={1}>
            {recovered}
          </Text>
          <Text style={styles.label}>Recovered</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.number, styles.deaths]} numberOfLines={1}>
            {deaths}
          </Text>
          <Text style={styles.label}>Deaths</Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.number, styles.active]} numberOfLines={1}>
            {active}
          </Text>
          <Text style={styles.label}>Active</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
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
  totalCasesContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    color: '#455a64',
    fontSize: 45,
    fontWeight: 'bold',
  },
  number: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  recovered: {
    color: '#4caf50',
  },
  deaths: {
    color: '#f44336',
  },
  active: {
    color: '#2196f3',
  },
  label: {
    fontSize: 13,
    marginTop: 10,
    color: 'gray',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default CovidStatus;
