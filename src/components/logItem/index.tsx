import moment from 'moment';
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

interface ILogItemProps {
  date: string;
  chargingLevel: number;
  state: 'Charging' | 'Consuming';
}

export function LogItem({date, chargingLevel, state}: ILogItemProps) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.key}>Time</Text>
        <Text style={styles.timeText}>{moment(date).format('LT')}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.key}>Battery Level</Text>
        <Text style={styles.levelText}>{chargingLevel}%</Text>
      </View>

      <Text
        style={[
          styles.state,
          state === 'Charging' ? styles.charging : styles.discharging,
        ]}>
        {state}
      </Text>
    </View>
  );
}
