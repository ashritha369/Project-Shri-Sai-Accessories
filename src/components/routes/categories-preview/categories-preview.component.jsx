import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../../store/categories/category.selector";
import CategoryPreview from "../../category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
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
