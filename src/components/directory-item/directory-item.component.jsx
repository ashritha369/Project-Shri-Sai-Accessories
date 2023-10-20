import "./directory-item.styles.scss";
import { Link } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  const [firstPart, secondPart] = title.split('+');
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <Link to={`/shop/${title.toLowerCase()}`}>
          {/* <h2 className="responsive-title">{title}</h2> */}
          <h2 className="responsive-title">
          {firstPart}
          <span className="break-line" aria-hidden="true"></span>
          {secondPart}
        </h2>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  );
};

export default DirectoryItem;
