# ensol-simulator-api

## Usage

You can access the API on the following address: https://zgmc7fplkh.execute-api.eu-west-1.amazonaws.com

### /simulate

Example: https://zgmc7fplkh.execute-api.eu-west-1.amazonaws.com/simulate?monthlyBillInEuro=200&latitude=43.684405&longitude=7.0111771&roofInclinationInDegrees=30&roofOrientation=S

Query params

```
{
  monthlyBillInEuro: number;
  latitude: number;
  longitude: number;
  roofInclinationInDegrees: number;
  roofOrientation: 'N' | 'W' | 'S' | 'E' | 'NW' | 'NE' | 'SW' | 'SE';
}
```

Response

```
{
  estimatedPanelCount: number;
  yearlyProducedEnergyInKWh: number;
  estimatedCosts: number;
}
```

## Test locally

First install dependencies with

```
yarn
```

To invoke locally a route, run

```
yarn serverless invoke local -f simulate --path functions/simulate.mock.json
```

You can change the given query parameters in .mock file

## Improvement tracks

### Tech

- Validate API inputs
- Improve errors handling
- Unit test services & add intgration test on functions

### Product

- PVGIS API seems to have option to compute radiation taking orientation and inclination into account, this might be something interesting to explore to replace hard coded mapping
- Interpolate the orientation efficiency loss curve to allow any roofInclinationInDegrees values instead of limiting to round values
- Fetch all technical constants (prices for example) from a database or a google sheet to allow multiple equipments to be in the final commercial proposition
