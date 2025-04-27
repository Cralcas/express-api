export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
}

export interface Founder {
  name: string;
  role: string;
}

export interface IStartup {
  id: number;
  name: string;
  industry: string;
  founded: number;
  country: string;
  continent: string;
  business_address: BusinessAddress;
  founders: Founder[];
  employees: number;
  website: string;
  mission_statement: string;
  description: string;
  is_seeking_funding: boolean;
  has_mvp: boolean;
}
