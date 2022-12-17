import React, { createContext, useState } from "react";

export const logincontext = createContext(null);
const Contextprovider = ({ children }) => {
  const [cartitem, setcartitem] = useState("");
  return <logincontext.Provider value={{cartitem, setcartitem}}>{children}</logincontext.Provider>;
};

export default Contextprovider;
