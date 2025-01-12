import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import "./shop.styles.scss";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { setCategories } from "../../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments("categories");
      console.log(categoriesArray);
      dispatch(setCategories(categoriesArray));
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
    };
    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
