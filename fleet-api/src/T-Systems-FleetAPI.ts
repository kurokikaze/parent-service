// Anything exported from this file is importable by other in-browser modules.
import { DataWrapper } from './DataWrapper';
import { FleetApi, SystemsApi } from './apis';
import { Configuration } from './apis/runtime';
import apiConfig from './fleetConfig.json';

const config = new Configuration(apiConfig)
export const myFleet = new FleetApi(config);

export const mySystem = new SystemsApi(config);

export const myWrapper = new DataWrapper(myFleet, mySystem);