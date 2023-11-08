import axios from 'axios';
import sumBy from 'lodash/sumBy';
import { MONTHS_IN_YEAR } from '../constants';

const PVGIS_API_URL = 'https://re.jrc.ec.europa.eu/api';

interface MonthlyRadiationResponse {
  outputs: {
    monthly: {
      year: number;
      month: number;
      'H(i_opt)_m': number; // in kWh/m2/month
    }[];
  };
}

export const getLocationMeanYearlyRadiation = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get<MonthlyRadiationResponse>(`${PVGIS_API_URL}/MRcalc`, {
      params: {
        lat: latitude,
        lon: longitude,
        optrad: 1,
        outputformat: 'json',
      },
    });
    const monthlyRadiations = response.data.outputs.monthly;
    const totalRadiation = sumBy(monthlyRadiations, (monthlyResult) => monthlyResult['H(i_opt)_m']);

    return (totalRadiation / monthlyRadiations.length) * MONTHS_IN_YEAR;
  } catch (error) {
    throw new Error(`An error occured while fetching radiation on PVGIS_API: ${error}`);
  }
};
