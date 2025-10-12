import React from "react";
import { NavLink } from "react-router-dom";


interface boutton {
    title: string;
    link: string;
    style?: string; // devra contenuir le background, hover et la couluer du text
}


 
const Boutton: React.FC<{ product: boutton }> = ({ product }) => {
  return (
   <NavLink
  to={product.link}
  className={`text-center border-2 font-bold py-3 w-50 px-4 rounded transition-all duration-500 ${product.style ? product.style : ""}`}
>
  {product.title}
</NavLink>
  );
};



export default Boutton;