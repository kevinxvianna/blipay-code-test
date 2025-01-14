import React, { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { CompanyCategory, PersonCategory } from '../../types';

type SimulationResultProps = {
  data: CompanyCategory | PersonCategory;
  clearSimulation: () => void;
};

export const SimulationResult: React.FC<SimulationResultProps> = ({
  data,
  clearSimulation,
}) => {
  const isSimulationApproved = data.credit_result.status === 'APPROVED';

  const RenderResult = useMemo(() => {
    if (isSimulationApproved) {
      return (
        <>
          <h1>
            Sua solicitação foi <strong>APROVADA!</strong>
          </h1>
          <h3>Valor máximo: {`R$ ${data.credit_result.max_amount},00`}</h3>
        </>
      );
    }

    return (
      <h1>
        Sua solicitação foi <strong>NEGADA!</strong>
      </h1>
    );
  }, [isSimulationApproved, data.credit_result.max_amount]);

  return (
    <>
      {RenderResult}
      <Button variant="success" onClick={clearSimulation}>
        Fazer outra simulação
      </Button>
    </>
  );
};
