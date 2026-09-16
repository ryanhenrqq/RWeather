export interface WeatherData{
    name: string,
    timezone: number,
    main: {
        temp: number,
        feels_like: number,
        maxtemp: number,
        mintemp:number,
        humidity: number
    },
    weather: Array<{
        description: string,
        icon: string,
    }>
    wind: {
        speed: number,
    };
}

export interface HeaderFunction{
    onSearch: (city: string) => void
}

export interface WeatherViewInfos{
    cityname: string,
    timelocal: string
    temperature: number,
    mintemp: number,
    maxtemp: number,
    feelslike: number
}