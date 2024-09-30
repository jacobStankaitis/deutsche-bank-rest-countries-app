import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {Country} from "../types/Country";
import {fetchAllCountries} from "./countryApiService";


describe('apiService', () => {
    const API_URL = 'https://restcountries.com/v3.1';
    const FIELDS =
        'name,flags,population,languages,currencies,capital,region,subregion,timezones,cca3';
    const mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset();
    });

    describe('fetchAllCountries', () => {
        it('should fetch the list of countries successfully', async () => {
            const mockCountries: Country[] = [
                {
                    name: { common: 'Estonia', official: 'Republic of Estonia' },
                    cca3: 'EST',
                    flags: { png: 'https://flagcdn.com/w320/ee.png', svg: 'https://flagcdn.com/ee.svg' },
                    population: 1325648,
                    region: 'Europe',
                    timezones: ['UTC+02:00'],
                    capital: ['Tallinn'],
                    subregion: 'Northern Europe',
                    languages: { est: 'Estonian' },
                    currencies: { EUR: { name: 'Euro', symbol: '€' } },
                },
            ];

            mock
                .onGet(`${API_URL}/all?fields=${FIELDS}`)
                .reply(200, mockCountries);

            const countries = await fetchAllCountries();

            expect(countries).toEqual(mockCountries);
        });

        it('should throw an error when the API call fails', async () => {
            mock
                .onGet(`${API_URL}/all?fields=${FIELDS}`)
                .networkError();

            await expect(fetchAllCountries()).rejects.toThrow('Network Error');
        });
    });
});
