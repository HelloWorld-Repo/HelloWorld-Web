import React, { useEffect } from "react";

import { useAuth } from "./contexts/auth";
import OtherRoutes from "./routes/OtherRoutes";
import SignRoutes from "./routes/SignRoutes";
import api from "./services/api";

const Route = () => {
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

        return Promise.reject(error?.response?.data?.message);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Route;
