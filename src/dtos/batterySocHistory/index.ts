export interface IBatteryChargeHistory {
  chargingStates: IChargingState[];
}

export interface IChargingState {
  date: string;
  chargingLevel: number;
  internalEventId: number;
}
