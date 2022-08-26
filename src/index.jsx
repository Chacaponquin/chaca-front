import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Home,
  Api,
  // Docs,
  SignUp,
  MySchema,
  Landing,
} from "./containers";
import { appRoutes } from "./shared/routes/app/appRoutes";

import UserProvider, { UserContext } from "./shared/context/UserContext";
import NoUserRoute from "./shared/routes/protected/NoUserRoute";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { useContext } from "react";
import LoaderContainer from "./shared/components/Loader/LoaderContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppRoutes = () => {
  const { loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="w-screen overflow-hidden h-screen flex justify-center items-center">
        <LoaderContainer
          className={"w-[200px] esm:w-[120px]"}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={appRoutes.AUTH_ROUTES.LOGIN}
          element={<NoUserRoute children={<Login />} />}
        />
        <Route
          path={appRoutes.AUTH_ROUTES.SIGN_UP}
          element={<NoUserRoute children={<SignUp />} />}
        />

        <Route path="/" element={<App />}>
          <Route path={appRoutes.ROOT} element={<Landing />} />
          <Route path={appRoutes.HOME} element={<Home />} />
          <Route path={appRoutes.API} element={<Api />} />
          {/*<Route path={appRoutes.DOCS} element={<Docs />} />*/}
          <Route path={appRoutes.MY_SCHEMA} element={<MySchema />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <React.StrictMode>
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </React.StrictMode>
);
