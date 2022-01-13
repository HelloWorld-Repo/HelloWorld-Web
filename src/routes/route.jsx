import React, { useEffect } from "react";

import { useAuth } from "../contexts/auth";
import OtherRoutes from "./OtherRoutes";
import SignRoutes from "./SignRoutes";
import api from "../services/api";

const Routes = () => {
  const { signed, signOut } = useAuth();

  useEffect(() => {
    api.interceptors.response.use(
      function (response) {
        return response?.data?.data;
      },
      function (error) {
        if (error?.response?.status === 401) {
          signOut();
        }

        return Promise.reject(error?.response?.data);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Routes;
