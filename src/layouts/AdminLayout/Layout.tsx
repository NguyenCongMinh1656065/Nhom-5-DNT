import Navbar from "../../components/AdminComponents/Navbar/Navbar";

import { LayoutProps } from "../../utilities/utils";
import style from "./layout.module.css";
function Layout({ children }: LayoutProps) {
  return (
    <div className={`${style.admin}`}>
      <Navbar />
      <div className={`${style.main} d-flex flex-grow-1`}>{children}</div>
    </div>
  );
}

export default Layout;
