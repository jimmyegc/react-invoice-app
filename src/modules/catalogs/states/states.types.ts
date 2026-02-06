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
  country_id: number;
}
