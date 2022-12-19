import { createContext, ReactElement, useEffect, useState } from "react";
import { DataTransform } from "../helpers/DataTransform";
import { FileConfigOption, NoUserLimits } from "../interfaces/config.iterface";
import { Schema, SchemasResp } from "../interfaces/options.interface";
import { API_ROUTES, axiosInstance } from "../routes/api/API_ROUTES";

const AppConfigContext = createContext<{
  noUserLimits: NoUserLimits;
  schemas: Schema[];
  initialFetchLoading: boolean;
  errorInitialFetch: boolean;
  fileConfig: FileConfigOption[];
}>({
  noUserLimits: {} as any,
  errorInitialFetch: false,
  initialFetchLoading: true,
  schemas: [],
  fileConfig: [],
});

const AppConfigProvider = ({
  children = <></>,
}: {
  children: ReactElement;
}) => {
  // user limits of documents
  const [noUserLimits, setNoUserLimits] = useState<NoUserLimits>({
    LIMIT_DATASETS: 3,
    LIMIT_DOCUMENTS: 500,
  });

  // options for the fields
  const [schemas, setSchemas] = useState<Schema[]>([]);

  // files config for exportation
  const [fileConfig, setFileConfig] = useState<FileConfigOption[]>([]);

  // loading de la carga inicial de informacion
  const [initialFetchLoading, setInitialFetchLoading] = useState(true);

  // estado por si hay un error en la carga inicial
  const [errorInitialFetch, setErrorInitialFetch] = useState(false);

  useEffect(() => {
    Promise.all([
      InitialFetchs.NO_USER_LIMITS(),
      InitialFetchs.FILE_CONFIG(),
      InitialFetchs.API_OPTIONS(),
    ])
      .then((data) => {
        setNoUserLimits(data[0]);
        setSchemas(DataTransform.initialFieldsTransform(data[2]));
        setFileConfig(data[1]);
      })
      .catch((error) => setErrorInitialFetch(true))
      .finally(() => setInitialFetchLoading(false));
  }, []);

  const data = {
    initialFetchLoading,
    errorInitialFetch,
    schemas,
    fileConfig,
    noUserLimits,
  };

  return (
    <AppConfigContext.Provider value={data}>
      {children}
    </AppConfigContext.Provider>
  );
};

const InitialFetchs = {
  NO_USER_LIMITS: async () => {
    const { data } = await axiosInstance.get<NoUserLimits>(
      API_ROUTES.GET_NO_USER_LIMITS
    );
    return data;
  },
  FILE_CONFIG: async () => {
    return (
      await axiosInstance.get<FileConfigOption[]>(API_ROUTES.GET_FILE_OPTIONS)
    ).data;
  },
  API_OPTIONS: async () => {
    return (await axiosInstance.get<SchemasResp[]>(API_ROUTES.GET_API_OPTIONS))
      .data;
  },
};

export default AppConfigProvider;
export { AppConfigContext };