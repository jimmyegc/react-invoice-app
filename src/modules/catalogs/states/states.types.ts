export interface StateEntity {
  id: number;
  name: string;
  country: {
    id: number;
    name: string;
  };
}

export interface StateFormValues {
  name: string;
  countryId: number;
}
