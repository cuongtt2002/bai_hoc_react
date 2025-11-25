import { ReactNode, createContext, useState } from "react";
import Loading from "./Loading";

type Props = {
  children?: ReactNode;
};

type LoadingDataType = {
  loading: boolean;
  show: () => void;
  hide: () => void;
};

const LoadingData = createContext<LoadingDataType | undefined>(undefined);

const LoadingDataProvider = (props: Props) => {
  const { children } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value: LoadingDataType = {
    loading: isLoading,
    show: () => setIsLoading(true),
    hide: () => setIsLoading(false),
  };

  return (
    <LoadingData.Provider value={value}>
      {isLoading && <Loading />}
      {children}
    </LoadingData.Provider>
  );
};

export { LoadingData, LoadingDataProvider };
