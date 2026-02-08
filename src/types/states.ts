
export type StateRow = {
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
};

export type CreateStatePayload = {
  name: string;
  country_id: number;
};