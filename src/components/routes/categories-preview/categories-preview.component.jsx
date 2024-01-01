import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../../contexts/categories.context";
import CategoryPreview from "../../category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      <div className="catergories-preview-list-of-all">
        {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })}
      </div>
    </Fragment>
  );
};

export default CategoriesPreview;
