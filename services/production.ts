import { RoofInclination, RoofOrientation } from '../types';

// Panel: DualSun Flash 425 Shingle Black
export const SYSTEM_EFFICENCY_PERCENTAGE = 0.8;
export const PANEL_AREA_IN_M2 = 2.08;
export const PANEL_PHOTOVOLTAIC_EFFICIENCY_PERCENTAGE = 0.2;
export const PANEL_EFFICIENCY_LOSSES_PERCENTAGES: {
  [orientation: string]: {
    [inclination: string]: number;
  };
} = {
  S: { 10: 0.7, 20: 0.2, 30: 0.0, 40: 0.0, 50: 0.3, 60: 0.7, 70: 0.14, 80: 0.23 },
  E: { 10: 0.14, 20: 0.16, 30: 0.19, 40: 0.23, 50: 0.28, 60: 0.33, 70: 0.38, 80: 0.44 },
  W: { 10: 0.14, 20: 0.16, 30: 0.19, 40: 0.23, 50: 0.28, 60: 0.33, 70: 0.38, 80: 0.44 },
  SE: { 10: 0.1, 20: 0.7, 30: 0.6, 40: 0.9, 50: 0.1, 60: 0.15, 70: 0.2, 80: 0.28 },
  SW: { 10: 0.1, 20: 0.7, 30: 0.6, 40: 0.9, 50: 0.1, 60: 0.15, 70: 0.2, 80: 0.28 },
};

export const computePanelYearlyProductionInKWh = (
  yearlyRadiation: number,
  roofOrientation: RoofOrientation,
  roofInclinationInDegrees: RoofInclination,
) => {
  const orientationEfficiencyLoss =
    PANEL_EFFICIENCY_LOSSES_PERCENTAGES[roofOrientation][roofInclinationInDegrees];

  return (
    yearlyRadiation *
    SYSTEM_EFFICENCY_PERCENTAGE *
    PANEL_PHOTOVOLTAIC_EFFICIENCY_PERCENTAGE *
    (1 - orientationEfficiencyLoss) *
    PANEL_AREA_IN_M2
  );
};
