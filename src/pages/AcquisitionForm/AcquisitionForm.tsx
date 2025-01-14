import React, { useEffect, useMemo } from 'react';

import { Person, Company } from './Forms';
import * as S from './AcquisitionForm.styles';
import { CustomerTypes } from '../../types';
import { useSetLoanSimulations } from '../../hooks/useSetLoanSimulations/useSetLoanSimulations';
import { SimulationResult } from '../../components/SimulationResult';

export const AcquisitionForm: React.FC = () => {
  const [formType, setFormType] = React.useState<CustomerTypes | null>(null);
  const { getValue, removeItem } = useSetLoanSimulations(formType);

  const simulationData = getValue();

  useEffect(() => {
    if (window.location.pathname.includes('person')) {
      setFormType(CustomerTypes.PERSON);
    } else if (window.location.pathname.includes('company')) {
      setFormType(CustomerTypes.COMPANY);
    }
  }, []);

  const RenderForm = useMemo(() => {
    if (simulationData) {
      return (
        <SimulationResult data={getValue()} clearSimulation={removeItem} />
      );
    }

    if (formType === CustomerTypes.PERSON) {
      return <Person />;
    } else if (formType === CustomerTypes.COMPANY) {
      return <Company />;
    }
  }, [formType, simulationData, getValue, removeItem]);

  return <S.Container>{RenderForm}</S.Container>;
};

export default AcquisitionForm;
