import { Callback, Context, Handler } from 'aws-lambda';

interface SimulateQueryParams {
  monthlyBillInEuro: number;
  latitude: number;
  longitude: number;
  roofInclinationInDegrees: number;
  roofOrientation: 'N' | 'W' | 'S' | 'E' | 'NW' | 'NE' | 'SW' | 'SE';
}

const handler: Handler = (
  { queryStringParameters }: { queryStringParameters: SimulateQueryParams },
  _: Context,
  callback: Callback,
) => {
  // TODO: Simulate the necessary setup given queryStringParameters

  callback(undefined, {
    statusCode: 200,
    body: JSON.stringify({ queryStringParameters }),
  });
};
export { handler };
