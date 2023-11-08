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
