// import React, { useContext} from 'react'
// import "./FoodItem.css"
// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../Context/StoreContext';


// export default function FoodItem({id,name,price,description,image,stock}) {
  
//     const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
//   // console.log(url);
    
//   return (
//     <div className='food-item'>
//       <div className="food-item-img-container">
//         <img src={url+"/images/"+image} alt="" className='food-item-image'/>
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//             <p>{name}</p>
//             <img src={assets.rating_starts} alt="" />
//             {
//                 !cartItems[id]
//                 ? <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
//                 : <div className="food-item-counter">
//                     <img className='count' onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
//                     <p>{cartItems[id]}</p>
//                     <img className='count' onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
//                 </div>
//             }
//         </div>
//         <p className="food-item-description">
//             {description}
//         </p>
//         <p className="food-item-price">
//             ${price}
//         </p>
//         <p className="food-item-price">
//            Stock : {stock}
//         </p>
//       </div>
//     </div>
//   )
// }




import React, { useContext } from 'react';
import "./FoodItem.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

export default function FoodItem({ id, name, price, description, image, stock }) {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const isInCart = cartItems[id] > 0;

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={`${url}/images/${image}`} alt={name} className='food-item-image' />
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="food-item-name">{name}</p>
          <img src={assets.rating_stars} alt="Rating Stars" className="food-item-rating" />
          {isInCart ? (
            <div className="food-item-counter">
              <img
                className='count add'
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="Add"
              />
              <p className="food-item-quantity">{cartItems[id]}</p>
              <img
                className='count remove'
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="Remove"
              />
            </div>
          ) : (
            <img
              className='add'
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
              alt="Add"
            />
          )}
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price.toFixed(2)}</p>
        <p className="food-item-stock">Stock: {stock}</p>
      </div>
    </div>
  );
}
