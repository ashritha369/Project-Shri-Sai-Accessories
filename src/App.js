import "./categories.styles.scss";

const App = () => {
  const categories = [
    {
      id: 1,
      title: "CROWNS",
      imageUrl: "https://i.ibb.co/3FDXNtW/crowns.jpg",
    },
    {
      id: 2,
      title: "DRESSES",
      imageUrl: "https://i.ibb.co/Nm3sCt4/dresses.jpg",
    },
    {
      id: 3,
      title: "CROWNS+DRESSES",
      imageUrl: "https://i.ibb.co/93Vkxpn/crownsanddresses.jpg",
    },
    {
      id: 4,
      title: "VARMALAS",
      imageUrl: "https://i.ibb.co/FJYS8v9/varmalas.jpg",
    },
    {
      id: 5,
      title: "FULL SETS",
      imageUrl: " https://i.ibb.co/TqHX6NX/fullsets.jpg",
    },
  ];
  return (
    <div className="categories-container">
      {categories.map(({ title, id, imageUrl }) => (
        <div className="category-container" key={id}>
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
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
