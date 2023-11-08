const PANEL_COST_IN_EURO = 170;
const INVERTER_COST_IN_EURO = 166.5;
const TECHNICAL_VISIT_COSTS_IN_EURO = 250;
const ADMINISTRATIVE_COSTS_IN_EURO = 250;

// This function is a simplified interpolation of data
// in "Material & Installation > Solution 30 BPU Implémentation" sheet
// The real function has steps that are not represented here
const computeInstallationCost = (panelCount: number) => panelCount * 60 + 2144;

export const computeCostsInEuro = (panelCount: number) => {
  const rawMaterialCostsInEuro = (PANEL_COST_IN_EURO + INVERTER_COST_IN_EURO) * panelCount;

  return (
    rawMaterialCostsInEuro +
    computeInstallationCost(panelCount) +
    TECHNICAL_VISIT_COSTS_IN_EURO +
    ADMINISTRATIVE_COSTS_IN_EURO
  );
};
