import WeatherService, { type IWeatherService } from "./WeatherService";
import WikipediaService, { type IWikipediaService } from './WikipediaService';

interface ApiClient {
  githubService: IWeatherService;
  wikipediaService: IWikipediaService;
}

class ApiClient implements ApiClient {
  public weatherService: WeatherService;
  public wikipediaService: WikipediaService;

  constructor() {
    this.weatherService = new WeatherService();
    this.wikipediaService = new WikipediaService();
  }
}

const Api = new ApiClient();

export default Api;
