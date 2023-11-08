import { Callback, Context, Handler } from 'aws-lambda';
import { computeYearlyConsumptionInKWh } from '../services/comsuption';
import { computePanelYearlyProductionInKWh } from '../services/production';
import { getLocationMeanYearlyRadiation } from '../third-parties/pvgis';
import { RoofInclination, RoofOrientation } from '../types';

interface SimulateQueryParams {
  monthlyBillInEuro: number;
  latitude: number;
  longitude: number;
  roofInclinationInDegrees: RoofInclination;
  roofOrientation: RoofOrientation;
}

const handler: Handler = async (
  {
    queryStringParameters: {
      monthlyBillInEuro,
      latitude,
      longitude,
      roofInclinationInDegrees,
      roofOrientation,
    },
  }: { queryStringParameters: SimulateQueryParams },
  _: Context,
  callback: Callback,
) => {
  try {
    const customerConsumptionInKWh = computeYearlyConsumptionInKWh(monthlyBillInEuro);
    const locationMeanYearlyRadiation = await getLocationMeanYearlyRadiation(latitude, longitude);

    const panelYearlyProductionInKWh = computePanelYearlyProductionInKWh(
      locationMeanYearlyRadiation,
      roofOrientation,
      roofInclinationInDegrees,
    );

    const estimatedPanelCount = Math.ceil(customerConsumptionInKWh / panelYearlyProductionInKWh);

    callback(undefined, {
      statusCode: 200,
      body: JSON.stringify({
        estimatedPanelCount,
        yearlyProducedEnergyInKWh: estimatedPanelCount * panelYearlyProductionInKWh,
      }),
    });
  } catch (error: any) {
    callback(error);
  }
};
export { handler };
