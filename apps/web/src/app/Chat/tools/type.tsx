export type Inputs = {
  sender: string;
  message: string;
};

export type SignUpInput = {
  firstName: string;
  lastName: string;
};

export type MessageList = {
  id: string;
  sender: string;
  message: string;
  created_at: Date;
};
