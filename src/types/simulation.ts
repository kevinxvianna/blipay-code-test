export type PersonCategory = {
  person: {
    name: string;
    cpf: number;
    age: number;
    city: string;
    monthlyIncome: number;
  };
  credit_result: {
    status: string;
    max_amount?: number;
  };
};

export type CompanyCategory = {
  company: {
    companyName: string;
    cnpj: number;
    city: string;
    monthlyRevenue: number;
  };
  credit_result: {
    status: string;
    max_amount?: number;
  };
};

export type AllSimulation = {
  companies?: CompanyCategory[];
  persons?: PersonCategory[];
};
