import HTTP from "./HTTP";

const URL: string = 'https://en.wikipedia.org/w/api.php';

interface IPage {
    pageid: number;
    ns: number;
    title: string;
    extract: string;
}

export interface IGetInformationParams {
    city: string;
}

export interface ICityInfo {
    batchcomplete: string;
    warnings: {
        extracts: {
            "*": string;
        }
    },
    query: {
        pages: {
            [field: string]: IPage;
        }
    },
    limits: {
        extracts: number;
    }
}


export interface IWikipediaService {
    getInformation(params: IGetInformationParams): Promise<ICityInfo>;
}

export default class WikipediaService implements IWikipediaService {
    getInformation(params: IGetInformationParams): Promise<ICityInfo> {  
        return HTTP.get(`${URL}?action=query&titles=${params.city}&prop=extracts&exlimit=max&format=json&origin=*`);
    }
}