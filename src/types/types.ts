export interface WeatherData{
    name: string,
    timezone: number,
    cod: string,
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
        country: string
    }
    wind: {
        speed: number,
    };
}

export interface HeaderFunction{
    onSearch: (city: string) => void,
    onBack: () => void,
    error: string
}

export interface WeatherViewInfos{
    cityname: string,
    timelocal: string,
    description: string,
    temperature: number,
    mintemp: number,
    maxtemp: number,
    feelslike: number,
    country: string
}