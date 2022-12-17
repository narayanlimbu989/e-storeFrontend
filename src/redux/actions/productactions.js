import { Actiontype } from "../contants/actions_type";
export const setproduct = (products) => {
  return {
    type: Actiontype.SET_PRODUCT,
    payload: products,
  };
};

export const selectproductid = (product) => {
  return {
    type: Actiontype.SELECTED_PEODUCT,
    payload: product,
  };
};

export const searchbyopt = (opts) => {
  return {
    type: Actiontype.SEARCH_BY_OPT,
    payload: opts,
  };
};
