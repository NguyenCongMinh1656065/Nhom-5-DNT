import { EAdminPage } from "../../utilities/utils";
import Products from "../../components/AdminComponents/Product/Products/Products";
import Layout from "../../layouts/AdminLayout/Layout";
import { useAdminPageContext } from "../../contexts/AdminPageContext/AdminPageContext";
import Profile from "../../components/Profile/Profile";
import Orders from "../../components/AdminComponents/Order/Orders/Orders";
import Auth from "../../components/AdminComponents/Auth/Auth";

type AdminPageProps = {
  children: React.ReactNode;
};

function AdminPage({ children }: AdminPageProps) {
  return (
    <Auth>
      <Layout>{children}</Layout>
    </Auth>
  );
}

export default AdminPage;
