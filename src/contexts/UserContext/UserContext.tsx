import { createContext, useState, useContext, useEffect, Context } from "react";
import { Customer } from "../../components/AdminComponents/Customers/Customers";

export type User = Customer;

type UserContextType = [
  user: User | undefined,
  setUser: (user: User | undefined) => void
];

const userContext = createContext<UserContextType>([
  undefined,
  (user: User | undefined) => {},
]) as Context<UserContextType>;
type UserProps = {
  children: React.ReactNode;
};
function UserContext({ children }: UserProps) {
  const [user, setUser] = useState<undefined | User>(() => {
    const userFromLocal = JSON.parse(localStorage.getItem("user") || "{}");
    if (userFromLocal.id == undefined) {
      return undefined;
    }
    return userFromLocal as User;
  });
  return (
    <userContext.Provider value={[user, setUser]}>
      {children}
    </userContext.Provider>
  );
}
export function useUser() {
  return useContext(userContext);
}
export default UserContext;
