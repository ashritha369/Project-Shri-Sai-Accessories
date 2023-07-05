import "./categories.styles.scss";

const App = () => {
  const categories = [
    {
      id: 1,
      title: "CROWNS",
    },
    {
      id: 2,
      title: "DRESSES",
    },
    {
      id: 3,
      title: "CROWNS+DRESSES",
    },
    {
      id: 4,
      title: "VARMALAS",
    },
    {
      id: 5,
      title: "FULL SETS",
    },
  ];
  return (
    <div className="categories-container">
      {categories.map(({ title, id }) => (
        <div className="category-container" key={id}>
          <div className="background-image" />
          <div className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
