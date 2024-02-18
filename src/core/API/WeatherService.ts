import HTTP from "./HTTP";

const URL: string = 'http://api.weatherapi.com/v1/current.json';
const API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY;


export interface ICurrent {
    cloud: number;
    condition: {
        code: number;
        icon: string;
        text: string;
    }
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    humidity: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
}

export interface ILocation {
    country: string;
    lat: number;
    localtime: string;
    localtime_epoch: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
}

export interface IGetWeatherParams {
    city: string;
}

export interface IWeatherInfo {
    location: ILocation;
    current: ICurrent;
}

export interface IWeatherService {
    getWeather(params: IGetWeatherParams): Promise<IWeatherInfo>;
}

export default class WeatherService implements IWeatherService {
    getWeather(params: IGetWeatherParams): Promise<IWeatherInfo> {
        return HTTP.get(`${URL}?key=${API_KEY}&q=${params.city}`);
    }
}