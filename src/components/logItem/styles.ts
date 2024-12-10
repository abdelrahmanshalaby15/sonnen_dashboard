import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: '#f7f7f8',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0040fa',
  },
  key: {
    color: '#242424',
    fontWeight: 'bold',
    fontSize: 16,
  },
  state: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
  charging: {
    color: '#5BC236',
  },
  discharging: {
    color: '#fa8e2a',
  },
});
