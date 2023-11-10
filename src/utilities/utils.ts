import { useUser } from "../contexts/UserContext/UserContext";
import { User as AuthUser } from "../contexts/UserContext/UserContext";
export enum EAdminPage {
  PRODUCT,
  CATEGORY,
  PROFILE,
  ORDER,
  CUSTOMER,
}
export type LayoutProps = {
  children: React.ReactNode;
};
export type Ward = {
  name: string;
};
export type District = {
  name: string;
  wards: Ward[];
};
export type Province = {
  name: string;
  districts: District[];
};
export interface SelectOptionProps {
  key: string;
  text: string;
}
export type Product = {
  id: number;
  productImage: string;
  productName: string;
  price: number;
  productDescription: string;
  category: number;
  brand: string;
};
export type CartItem = {};

export type User = {
  id: number;
  userName: string;
  fullName: string;
  password: string;
  email: string;
  phone: string;
  userType: number;
  totalPrice: number;
  rank: number;
};

export type Cart = {};

export type ProductInBill = {
  id: number;
  productId: number;
  orderId: number;
  productImage: string;
  productName: string;
  price: number;
  quantity: number;
};
export type BillDetail = {};
export type CustomerOrder = {
  id: number;
  customerId: number;
  customerName: string;
  phoneNumber: string;
  address: string;
  delivery: string;
  deliveryPrice: number;
  discount: string;
  discountPrice: number;
  finalPrice: number;
  status: string;
  products: ProductInBill[];
};
export function mapStateToStatus(state: number) {
  switch (state) {
    case 0:
      return {
        text: "Chờ xác nhận",
        color: "#ffd700",
      };
    case 1:
      return {
        text: "Đang xử lí",
        color: "#ff8c00",
      };
    case 2:
      return {
        text: "Đang vận chuyển",
        color: "#0000cd",
      };
    case 3:
      return {
        text: "Đã giao hàng",
        color: "#008000",
      };
    case 4:
      return {
        text: "Đã huỷ",
        color: "#ff0000",
      };
    default:
      return {
        text: "Trạng thái không xác định",
        color: "#000000",
      };
  }
}
export function checkPassword(password: string) {
  const numberPtn = new RegExp("[0-9]");
  const charPtn = new RegExp("[A-Za-z]");
  const specialCharPtn = new RegExp("\\W");

  return (
    numberPtn.test(password) &&
    charPtn.test(password) &&
    specialCharPtn.test(password)
  );
}
export function checkEmail(email: string) {
  const patterncheck = new RegExp("^\\w+@\\w+\\.(com|edu\\.vn|vn|gov)$");
  return patterncheck.test(email);
}
export function checkPhonenumber(phonenumber: string) {
  const patterncheck = new RegExp("^(0[0-9]{9,10})$|^(\\+(84)[0-9]{9,10})$");
  return patterncheck.test(phonenumber);
}
export function toMoney(realNumber: number) {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });
  const formated = formatter.format(realNumber);

  return formated.substring(1);
}

function matchUnicode(strToMatch: string, searchStr: string) {
  let regex = "";
  for (let x in searchStr.split("")) {
  }
}
export function checkSize(size: string) {
  const regex = new RegExp("M|L|XL|S|XXL|([1-9][0-9])");
  regex.test(size);
  return;
}
export function checkHexColor(color: string) {
  const pattern = new RegExp("(^#[a-f0-9]{6}$)|(^#[a-f0-9]{4}$)", "i");
  return pattern.test(color);
}
