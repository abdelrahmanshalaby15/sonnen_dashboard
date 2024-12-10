import batterySOCMocks from "../mocks/batterySOC";

export const getBatterySocHistory = async () => {
  return batterySOCMocks.chargingStates;
  // TODO: remove mock and use real data when API is deployed
  const response = await fetch("/api/battery-soc-history");
  return response.json();
};
