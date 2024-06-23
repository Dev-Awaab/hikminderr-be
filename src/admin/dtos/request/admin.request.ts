export type CreatedAdmin = {
  firstName: string;

  lastName: string;

  email: string;

  staffId: string;

  password: string;
};

export type AdminQuery = { id: string; email: string };

export type UpdateAdmin = {
  staffId: string;

  firstName?: string;

  lastName?: string;

  gender?: string;

  department?: string;

  image?: string;

  phoneNo?: string
};
