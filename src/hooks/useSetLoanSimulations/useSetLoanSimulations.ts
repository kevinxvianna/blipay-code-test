import {
  ALL_SIMULATIONS_KEY,
  SINGLE_SIMULATION_KEY,
} from '../../constants/keys';
import { CustomerTypes } from '../../types';
import { useLocalStorage } from '../useLocalStorage/useLocalStorage';

export const useSetLoanSimulations = (type: CustomerTypes | null) => {
  const { setValue, getValue, removeItem } = useLocalStorage(
    `${SINGLE_SIMULATION_KEY}-${type}`,
  );

  const SimulationCategory =
    type === CustomerTypes.PERSON ? 'persons' : 'companies';
  const { setValue: setAllSimulationsValue, getValue: getAllSimulationsValue } =
    useLocalStorage(ALL_SIMULATIONS_KEY);

  const setSimulation = (value: object) => {
    const data = getAllSimulationsValue();
    const hasData = data !== null;
    const hasCategory = hasData && Boolean(data[SimulationCategory]);

    setValue(value);

    if (hasData) {
      if (hasCategory) {
        setAllSimulationsValue({
          ...data,
          [SimulationCategory]: [...data[SimulationCategory], { ...value }],
        });

        return;
      }

      setAllSimulationsValue({
        ...data,
        [SimulationCategory]: [{ ...value }],
      });
    } else {
      setAllSimulationsValue({
        [SimulationCategory]: [{ ...value }],
      });
    }
  };

  return {
    setValue: setSimulation,
    getValue,
    removeItem,
  };
};
