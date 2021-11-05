import React from "react";

import { useAuth } from "./contexts/auth";
import OtherRoutes from "./routes/OtherRoutes";
import SignRoutes from "./routes/SignRoutes";

const Route = () => {
  const { signed } = useAuth();

  console.log(signed);

  return signed ? <OtherRoutes /> : <SignRoutes />;
};

export default Route;
