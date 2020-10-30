import {APIUtils, NumericBoolean} from './APIUtils';
import {AxiosResponse} from 'axios';

interface LPD8806Response {
    mode: string,
    on: boolean,
    color: [
        number, // Hue
        number, // Saturation
        number, // Brightness
    ]
}

interface LPD8806Options {
    on: NumericBoolean,
    brightness: number,
    hue: number,
    saturation: number
}

/**
 * status is zero if the request was executed successfully
 */
interface PostLightResponse {
    "status": number | string
}

export abstract class LPD8806API {
    static getState(): Promise<AxiosResponse<LPD8806Response>> {
        return APIUtils.get();
    }

    static setPower(on: boolean): Promise<AxiosResponse<LPD8806Response>> {
        return APIUtils.post(
            {
                on: on ? 1 : 0
            } as Partial<LPD8806Options>
        );
    }

    static setHue(hue: number): Promise<AxiosResponse<LPD8806Response>> {
        return APIUtils.post(
            {
                hue
            } as Partial<LPD8806Options>
        );
    }

    static setBrightness(brightness: number): Promise<AxiosResponse<LPD8806Response>> {
        return APIUtils.post(
            {
                brightness
            } as Partial<LPD8806Options>
        );
    }

    static setSaturation(saturation: number): Promise<AxiosResponse<LPD8806Response>> {
        return APIUtils.post(
            {
                saturation
            } as Partial<LPD8806Options>
        );
    }
}
