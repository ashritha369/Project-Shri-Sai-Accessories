import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../shop-data.js";

export const ProductsContext = createContext({ products: [] });

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap=await getCategoriesAndDocuments();
      console.log(categoryMap);
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
    };
    getCategoriesMap();
  },[]);

  /*passing all the data inside SHOP_DATA(local file) once to 'firestore cloud database', 
  once passed all the data will be stored there and even if we comment or take off below lines , 
  data inside the firestore database won't vanish*/
  /*useEffect(()=>{
    addCollectionAndDocuments('categories',SHOP_DATA)
  },[])*/
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
