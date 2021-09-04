import {
    Service,
    CharacteristicValue,
    CharacteristicSetCallback,
    CharacteristicGetCallback, AccessoryConfig, API, Logging,
    CharacteristicEventTypes,
    HAP,
} from 'homebridge';
import {LPD8806} from '../models/LPD8806';
import {LPD8806API} from '../api/LPD8806API';
import {AccessoryPlugin} from 'homebridge/lib/api';
import {APIUtils} from '../api/APIUtils';

interface LightConfiguration extends AccessoryConfig {
    url: string | undefined
}

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class LPD8806Accessory implements AccessoryPlugin {
    private readonly informationService: Service;
    private readonly service: Service;
    private light: LPD8806 = new LPD8806();
    private log: Logging;
    private hap: HAP;
    private config: LightConfiguration;

    constructor(log: Logging, config: AccessoryConfig, api: API) {
        this.log = log;
        this.hap = api.hap;
        this.config = config as LightConfiguration;

        if (!this.config.url) {
            throw new Error("URL not supplied");
        }

        APIUtils.URL = this.config.url;

        this.service = new this.hap.Service.Lightbulb(config.name);

        // register handlers
        this.service.getCharacteristic(this.hap.Characteristic.On)
            .on(CharacteristicEventTypes.SET, this.setOn.bind(this))
            .on(CharacteristicEventTypes.GET, this.getOn.bind(this));
        this.service.getCharacteristic(this.hap.Characteristic.Brightness)
            .on(CharacteristicEventTypes.SET, this.setBrightness.bind(this))
            .on(CharacteristicEventTypes.GET, this.getBrightness.bind(this));
        this.service.getCharacteristic(this.hap.Characteristic.Hue)
            .on(CharacteristicEventTypes.SET, this.setHue.bind(this))
            .on(CharacteristicEventTypes.GET, this.getHue.bind(this));
        this.service.getCharacteristic(this.hap.Characteristic.Saturation)
            .on(CharacteristicEventTypes.SET, this.setSaturation.bind(this))
            .on(CharacteristicEventTypes.GET, this.getSaturation.bind(this));

        // set accessory information
        this.informationService = new this.hap.Service.AccessoryInformation()
            .setCharacteristic(this.hap.Characteristic.Manufacturer, 'Nico')
            .setCharacteristic(this.hap.Characteristic.Model, 'ESP8266')
            .setCharacteristic(this.hap.Characteristic.SerialNumber, 'Nico-LPD8806');
    }

    public getServices(): Service[] {
        return [
            this.informationService,
            this.service
        ];
    }

    /**
     * Handle "SET" requests from HomeKit
     * These are sent when the user changes the state of an accessory, for example, turning on a LPD8806 bulb.
     */
    private async setOn(value: CharacteristicValue, callback: CharacteristicSetCallback) {
        // implement your own code to turn your device on/off
        this.light.on = value as boolean;

        try {
            await LPD8806API.setPower(this.light.on);
            callback(null, this.light.on)
        } catch (e) {
            this.log.error("Error setting LPD8806 status: " + e);
            callback(e);
        }
    }

    /**
     * Handle the "GET" requests from HomeKit
     * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a LPD8806 bulb is on.
     *
     * GET requests should return as fast as possible. A long delay here will result in
     * HomeKit being unresponsive and a bad user experience in general.
     *
     * @example
     * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
     */
    private getOn(callback: CharacteristicGetCallback) {
        this.refreshState();

        // the first argument should be null if there were no errors
        // the second argument should be the value to return
        callback(null, this.light.on);
    }

    /**
     * Handle "SET" requests from HomeKit
     * These are sent when the user changes the state of an accessory, for example, turning on a LPD8806 bulb.
     */
    private async setBrightness(value: CharacteristicValue, callback: CharacteristicSetCallback) {
        // implement your own code to turn your device on/off
        this.light.brightness = value as number;

        try {
            await LPD8806API.setBrightness(this.light.brightness);
            callback(null, this.light.brightness)
        } catch (e) {
            this.log.error("Error setting LPD8806 brightness: " + e);
            callback(e);
        }
    }

    /**
     * Handle the "GET" requests from HomeKit
     * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a LPD8806 bulb is on.
     *
     * GET requests should return as fast as possible. A long delay here will result in
     * HomeKit being unresponsive and a bad user experience in general.
     *
     * @example
     * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
     */
    private getBrightness(callback: CharacteristicGetCallback) {
        this.refreshState();

        // the first argument should be null if there were no errors
        // the second argument should be the value to return
        callback(null, this.light.brightness);
    }

    /**
     * Handle "SET" requests from HomeKit
     * These are sent when the user changes the state of an accessory, for example, turning on a LPD8806 bulb.
     */
    private async setSaturation(value: CharacteristicValue, callback: CharacteristicSetCallback) {
        // implement your own code to turn your device on/off
        this.light.saturation = value as number;

        try {
            await LPD8806API.setSaturation(this.light.saturation);
            callback(null, this.light.saturation)
        } catch (e) {
            this.log.error("Error setting LPD8806 saturation: " + e);
            callback(e);
        }
    }

    /**
     * Handle the "GET" requests from HomeKit
     * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a LPD8806 bulb is on.
     *
     * GET requests should return as fast as possible. A long delay here will result in
     * HomeKit being unresponsive and a bad user experience in general.
     *
     * @example
     * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
     */
    private getSaturation(callback: CharacteristicGetCallback) {
        this.refreshState();

        // the first argument should be null if there were no errors
        // the second argument should be the value to return
        callback(null, this.light.saturation);
    }

    /**
     * Handle "SET" requests from HomeKit
     * These are sent when the user changes the state of an accessory, for example, turning on a LPD8806 bulb.
     */
    private async setHue(value: CharacteristicValue, callback: CharacteristicSetCallback) {
        // implement your own code to turn your device on/off
        this.light.hue = value as number;

        try {
            await LPD8806API.setHue(this.light.hue);
            callback(null, this.light.hue)
        } catch (e) {
            this.log.error("Error setting LPD8806 hue: " + e);
            callback(e);
        }
    }

    /**
     * Handle the "GET" requests from HomeKit
     * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a LPD8806 bulb is on.
     *
     * GET requests should return as fast as possible. A long delay here will result in
     * HomeKit being unresponsive and a bad user experience in general.
     *
     * @example
     * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
     */
    private getHue(callback: CharacteristicGetCallback) {
        this.refreshState();

        // the first argument should be null if there were no errors
        // the second argument should be the value to return
        callback(null, this.light.hue);
    }

    /**
     * This function refreshes the device's state async
     * @private
     */
    private refreshState(): void {
        this.setRefreshState();

        LPD8806API.getState()
            .then(value => {
                this.light.on = value.data.on;
                this.light.brightness = value.data.color[2] || 0;
                this.light.hue = value.data.color[0] || 0;
                this.light.saturation = value.data.color[1] || 0;

                this.setRefreshState();
            })
            .catch(reason => {
                this.log.error("Error getting state for light bulb: " + reason);
            });
    }

    private setRefreshState(): void {
        this.service.updateCharacteristic(this.hap.Characteristic.On, this.light.on);
        this.service.updateCharacteristic(this.hap.Characteristic.Brightness, this.light.brightness);
        this.service.updateCharacteristic(this.hap.Characteristic.Hue, this.light.hue);
        this.service.updateCharacteristic(this.hap.Characteristic.Saturation, this.light.saturation);
    }
}
