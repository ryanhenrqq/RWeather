interface CountryInfo{
    name:string,
    phoneCode:number,
} // feature: adicionar um de moeda e de iso de moeda
//   lista salva no firefox
export const countryNames: Record<string, CountryInfo> = {
    BR: {
        name:'Brasil',
        phoneCode:55,
    },
    US: {
        name:'Estados Unidos',
        phoneCode:1
    },
    PT: {
        name:'Portugal',
        phoneCode:351
    },
    AR: {
        name:'Argentina',
        phoneCode:54
    },
    CL: {
        name:'Chile',
        phoneCode:56
    },
    UY: {
        name:'Uruguay',
        phoneCode:598
    },
    PY: {
        name:'Paraguay',
        phoneCode:595
    },
    CO: {
        name:'Colômbia',
        phoneCode:57
    },
    PE: {
        name:'Peru',
        phoneCode:51
    },
    MX: {
        name:'México',
        phoneCode:52
    },
    CA: {
        name:'Canadá',
        phoneCode:1
    },
    GB: {
        name:'Reino Unido',
        phoneCode:44
    },
    FR: {
        name:'França',
        phoneCode:33
    },
    DE: {
        name:'Alemanha',
        phoneCode:49
    },
    IT: {
        name:'Itália',
        phoneCode:39
    },
    ES: {
        name:'Espanha',
        phoneCode:34
    },
    JP: {
        name:'Japão',
        phoneCode:81
    },
    CN: {
        name:'China',
        phoneCode:86
    },
    AU: {
        name:'Australia',
        phoneCode:61
    },
    IE: {
        name:'Irlanda',
        phoneCode:353
    },
    RU: {
        name:'Rússia',
        phoneCode:7
    },
    BE: {
        name:'Bielorússia',
        phoneCode:375
    },
    VE: {
        name:'Venezuela',
        phoneCode:58
    },
    MO: {
        name:'Mônaco',
        phoneCode:377
    },
    SE: {
        name:'Suécia',
        phoneCode:46
    },
    CH: {
        name:'Suíça',
        phoneCode:41
    },
    TH: {
        name:'Thailândia',
        phoneCode:66
    },
    UA: {
        name:'Ucrânia',
        phoneCode:380
    },
    VA: {
        name:'Vaticano',
        phoneCode:379
    },
    KR: {
        name:'Coréia do Sul',
        phoneCode:82
    },
    QA: {
        name:'Catar',
        phoneCode:974
    },
    PO: {
        name:'Polônia',
        phoneCode:48
    },
    HT: {
        name:'Haiti',
        phoneCode:509
    },
}

const coolLocs = [
    { name: "Tóquio", lat: 35.6762, lon: 139.6503 },
    { name: "Nova York", lat: 40.7128, lon: -74.0060, },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Reykjavik", lat: 64.1466, lon: -21.9426 },

    { name: "Longyearbyen", lat: 78.2232, lon: 15.6267 },
    { name: "Ushuaia", lat: -54.8019, lon: -68.3030 },
    { name: "Chefchaouen", lat: 35.1688, lon: -5.2636 },
    { name: "Oymyakon", lat: 63.4641, lon: 142.7737 },
    { name: "Timbuktu", lat: 16.7666, lon: -3.0026 },
    { name: "Queenstown", lat: -45.0312, lon: 168.6626 },
    { name: "Nuuk", lat: 64.1836, lon: -51.7216 },
]

export function getRandomPresetLocation() {
    const randomIndex = Math.floor(Math.random() * coolLocs.length);
    return coolLocs[randomIndex];
}