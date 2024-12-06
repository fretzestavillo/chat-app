import { create } from 'zustand';

interface ServerMessage {
  name: string;
  message: string;
}

interface BearState {
  serverData: ServerMessage[];
  addData: (by: ServerMessage) => void;
}

const useBearStore = create<BearState>()((set) => ({
  serverData: [],
  addData: (by) =>
    set((state) => ({
      serverData: [...state.serverData, by],
    })),
}));

export default useBearStore;
