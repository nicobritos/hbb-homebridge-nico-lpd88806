import {API, HAP} from 'homebridge';
import {LPD8806Accessory} from './accessories/LPD8806Accessory';

let hap: HAP;

/*
 * Initializer function called when the plugin is loaded.
 */
export = (api: API) => {
    hap = api.hap;
    api.registerAccessory("nico-lpd8806", LPD8806Accessory);
};
