import { createContext, useContext, useState } from "react";
import { EAdminPage } from "../../utilities/utils";

type AdminPageContextType = [EAdminPage, (p: EAdminPage) => void];

const adminPageContext = createContext([
  EAdminPage.PRODUCT,
  (p: EAdminPage) => {},
] as AdminPageContextType);

type AdminPageContextProps = {
  children: React.ReactNode;
};

function AdminPageContext({ children }: AdminPageContextProps) {
  const [page, setPage] = useState(EAdminPage.PRODUCT);
  return (
    <adminPageContext.Provider value={[page, setPage]}>
      {children}
    </adminPageContext.Provider>
  );
}

export function useAdminPageContext() {
  return useContext(adminPageContext);
}

export default AdminPageContext;
