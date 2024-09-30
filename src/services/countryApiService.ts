import axios from 'axios';
import {Country} from "../types/Country";


const API_URL = 'https://restcountries.com/v3.1';
const FIELDS = 'name,flags,population,languages,currencies,capital,region,subregion,timezones,cca3';

export const fetchAllCountries = async (): Promise<Country[]> => {
    try {
        const response = await axios.get<Country[]>(`${API_URL}/all?fields=${FIELDS}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
