import { Provider } from "react-redux";
import { stored } from "@/services/Stored";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={stored}>{children}</Provider>;
};
