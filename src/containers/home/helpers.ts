import {IChargingState} from '../../dtos/batterySocHistory';

export function constructInflectionPoints(
  batteryChargeHistory: IChargingState[],
) {
  let slope: 1 | -1 = 1;
  let inflectionPoints: (IChargingState & {state: string})[] = [
    {...batteryChargeHistory?.[0], state: 'Charging'},
  ];
  batteryChargeHistory?.reduce((prev, curr, index) => {
    if (prev) {
      const currSlope = curr?.chargingLevel - prev?.chargingLevel > 0 ? 1 : -1;
      if (currSlope != slope) {
        inflectionPoints.push({
          ...prev,
          state: currSlope > 0 ? 'Charging' : 'Consuming',
        });
        slope = currSlope;
      }
    }
    return curr;
  });
  return inflectionPoints;
}
