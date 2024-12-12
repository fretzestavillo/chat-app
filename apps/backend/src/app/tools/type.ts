export type Inputs = {
  sender: string;
  message: string;
};

export type CreateMessage = {
  sender: string;
  message: string;
};

export type MessageList = {
  id: string;
  sender: string;
  message: string;
  created_at: Date;
};
