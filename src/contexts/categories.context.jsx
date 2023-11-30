import { createContext, useState, useEffect } from "react";
// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({ categoriesMap: {} });

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
      setCategoriesMap(categoryMap)
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

  /*passing all the data inside SHOP_DATA(local file) once to 'firestore cloud database', 
  once passed all the data will be stored there and even if we comment or take off below lines , 
  data inside the firestore database won't vanish*/
  /*useEffect(()=>{
    addCollectionAndDocuments('categories',SHOP_DATA)
  },[])*/
  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
