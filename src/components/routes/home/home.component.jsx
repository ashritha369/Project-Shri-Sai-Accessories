import Directory from "../../directory/directory.component";

const Home = () => {
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
    <div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
