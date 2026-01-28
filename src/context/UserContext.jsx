import { createContext, useState } from "react";

export const UserContext = createContext;

const UserProvider = ({}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
};
