import { createContext, useState } from "react";


const addCartItem=(cartItems,productToAdd)=>{
   //find if cartItems contains productsToAdd

    //if found, increment quantity

    //return new array with modified cartItems/ new cart item
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems:[],
  addItemToCart:()=>{}
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems,setCartItems]=useState([]);

  const addItemToCart=(productToAdd)=>{

  setCartItems(addCartItem(cartItems,productToAdd))

  }
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


//We know that the format of 'product' is 
/*
product
{
  id,
  name,
  price,
  imageUrl
}

// format of cartItem inside cartDropdown are
Cart Item
{
  id,
  name,
  price,
  imageUrl,
  quantity
}


*/