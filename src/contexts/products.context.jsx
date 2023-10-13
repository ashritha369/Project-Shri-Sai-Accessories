import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

import SHOP_DATA from "../shop-data.js";

export const ProductsContext = createContext({ products: [] });

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  /*passing all the data once to firestore cloud database, 
  once passed all the data will be stored there and even if we comment or take off below lines , 
  data inside the firestore database won't vanish*/
  useEffect(()=>{
    addCollectionAndDocuments('categories',SHOP_DATA)
  },[])
  const value = { products };
  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
};
