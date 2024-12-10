import React from 'react';
import {Dimensions, FlatList, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {useQuery} from '@tanstack/react-query';
import {getBatterySocHistory} from '../../apis/batterySocHistory';
import {LineChart} from 'react-native-chart-kit';
import {IChargingState} from '../../dtos/batterySocHistory';
import moment from 'moment';
import {constructInflectionPoints} from './helpers';
import {LogItem} from '../../components/logItem';

export function HomeWrapper() {
  const {data} = useQuery({
    queryKey: ['batterySocHistory'],
    queryFn: getBatterySocHistory,
  });
  const data2 = {
    labels: data
      ?.map((item: IChargingState) => moment(item.date).format('HH'))
      ?.filter((_level: any, index: number) => index % 2 === 0),
    datasets: [
      {
        data: data
          ?.map((item: IChargingState) => item.chargingLevel)
          .filter((_level: any, index: number) => index % 2 === 0),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#242424',
    backgroundGradientFrom: '#000000',
    backgroundGradientTo: '#0040fa',
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '1',
      strokeWidth: '2',
      stroke: '#ffffff',
    },
  };

  const renderStateItem = ({
    item,
  }: {
    item: IChargingState & {state: 'Charging' | 'Consuming'};
  }) => {
    return (
      <LogItem
        date={item.date}
        chargingLevel={item.chargingLevel}
        state={item.state}
      />
    );
  };
  return data ? (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.graphWrapper}>
          <LineChart
            style={styles.graph}
            data={data2}
            height={250}
            width={Dimensions.get('screen').width - 32}
            //   xLabelsOffset={20}
            yAxisSuffix="%"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            bezier
          />
        </View>
      </SafeAreaView>
      <Text style={styles.header}>Battery History</Text>
      <FlatList
        data={constructInflectionPoints(data)}
        renderItem={renderStateItem}
        keyExtractor={(item: IChargingState) => item.internalEventId.toString()}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  ) : (
    <></>
  );
}
