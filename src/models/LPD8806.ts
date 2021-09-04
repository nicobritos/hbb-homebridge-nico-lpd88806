export class LPD8806 {
    private _on: boolean = false;
    private _brightness: number = 0;
    private _hue: number = 0;
    private _saturation: number = 0;

    public get on(): boolean {
        return this._on;
    }

    public set on(value: boolean) {
        this._on = value;
    }

    public get brightness(): number {
        return this._brightness;
    }

    public set brightness(value: number) {
        this._brightness = value;
    }

    public get hue(): number {
        return this._hue;
    }

    public set hue(value: number) {
        this._hue = value;
    }

    public get saturation(): number {
        return this._saturation;
    }

    public set saturation(value: number) {
        this._saturation = value;
    }
}
