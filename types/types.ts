export type UserData = {
   id: number;
   acc_number: string;
   balance: number;
   auth_id: string;
   city: string;
   first_name: string;
   last_name: string;
   zip: string;
   card_number: string;
};

export type LoginFormInputs = {
   password: string;
   email: string;
};
export type RegisterFormInputs = {
   firstName: string;
   lastName: string;
   password: string;
   email: string;
   city: string;
   zip: number;
};
