import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import "./shop.styles.scss";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { setCategoriesMap } from "../../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      // console.log(categoryMap);
      dispatch(setCategoriesMap(categoryMap));
      /*
        'categoryMap' is an Object we receive it like below
        Object:{
            crowns: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            crowns+dresses: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            dresses: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            full sets: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            varmalas: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            [[Prototype]]: Object
          }
        */
      /*
       we learned about Objects (Hash Table data structure) being better for
        searching for items than Array. 
        This is a common computing optimization when talking about data structures. 
       */
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
