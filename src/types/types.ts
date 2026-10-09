export interface GeoSearchData{
    continent:string,
    principalSubdivision:string,
    countryName:string,
    localityInfo:{
        administrative: InformAdminInfos[],
        informative: InformAdminInfos[]
    }
}

interface InformAdminInfos{
    name?: string,
    description?: string,
    adminLevel?:number
}

export interface WeatherData{
    name: string,
    timezone: number,
    cod: string,
    visibility: number,
    clouds: {
        all: number
    },
    coord: {
        lat: number,
        lon:number
    },
    main: {
        temp: number,
        feels_like: number,
        temp_max: number,
        temp_min:number,
        humidity: number
    },
    weather: Array<{
        description: string,
        icon: string,
    }>
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    }
    wind: {
        speed: number,
        deg: number
    };
}

export interface HeaderFunction{
    onSearch: (city: string) => void,
    onBack: () => void,
    onLoading: () => void,
    onLoadingFail: () => void,
    error: string,
    geolocPerms: () => void,
}

export interface WeatherViewInfos{
    cityname: string,
    timelocal: string,
    description: string,
    temperature: number,
    mintemp: number,
    maxtemp: number,
    feelslike: number,
    country: string,
    humidity: number,
    windspeed: number,
    winddir:number,
    lat: number,
    lon: number,
    visibility: number,
    sunrise:string,
    sunset:string,
    clouds: number,
    timezone: number,
    geodata: GeoSearchData|null,
    onSearch: (city:string) => void
}

export interface CleanViewNames{
    onSearch: (city: string) => void,
}