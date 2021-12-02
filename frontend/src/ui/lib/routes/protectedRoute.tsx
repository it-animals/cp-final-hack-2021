import React from "react";

export const protectedRoute =
  (Route: (() => JSX.Element) | CT<unknown>) => (data: any) => {
    //if (!userData) return <Redirect to={"/login"} />;
    return <Route />;
  };
