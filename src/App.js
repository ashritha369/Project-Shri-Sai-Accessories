import { Routes, Route} from "react-router-dom";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import Authentication from "./components/routes/authentication/authentication.component";
import Shop from "./components/routes/shop/shop.component";
import Checkout from "./components/routes/checkout/checkout.component";
import './responsiveness/media-query.styles.scss'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

/*

In the context of React Router, the * (asterisk or wildcard) is used as a placeholder 
to match any value in the specified part of the URL. In your example:<Route path="shop/*" element={<Shop />} /> */