import { Actiontype } from "../contants/actions_type";

const initialstate = {
  products: [],
};
export const productReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case Actiontype.SET_PRODUCT:
      return { ...state, products: payload };
    default:
      return state;
  }
};
export const productidReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case Actiontype.SELECTED_PEODUCT:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export const search = (state="", { type, payload }) => {
  switch (type) {
    case Actiontype.SEARCH_BY_OPT:
      return payload;
    default:
      return state;
  }
};
