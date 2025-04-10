import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );
/*
categoriesArray looks like this : (5) [{…}, {…}, {…}, {…}, {…}]
Expanding it (categoriesArray) gives:
     0: {items: Array(8), title: 'CROWNS'}
     1: {title: 'CROWNS+DRESSES', items: Array(8)}
     2: {title: 'DRESSES', items: Array(8)}
     3: {items: Array(8), title: 'FULL SETS'}
     4: {items: Array(8), title: 'VARMALAS'}
     length: 5
[[Prototype]]: Array(0)
      */
export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());
  try {
    const categoriesArray = await getCategoriesAndDocuments("categories");
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};
