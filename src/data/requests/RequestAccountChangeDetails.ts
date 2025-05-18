export type RequestAccountChangeDetails = {
  first_name?: string;
  last_name?: string;
  gender_id?: number;
  birthdate?: string;
  mobile_number?: string;
  phone_number?: string;
  address?: {
    territory_id: number;
    type_id: number;
    zip: string;
    street: string;
    house_number: string;
  };
};
