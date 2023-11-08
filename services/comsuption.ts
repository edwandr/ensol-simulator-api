import { MONTHS_IN_YEAR } from '../constants';

export const ELECTRICITY_PRICE_2023 = 0.2062; // in €/kWh

export const computeYearlyConsumptionInKWh = (monthlyBillInEuro: number) =>
  (monthlyBillInEuro * MONTHS_IN_YEAR) / ELECTRICITY_PRICE_2023;
