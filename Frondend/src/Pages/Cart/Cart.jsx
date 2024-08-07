import React, { useContext } from 'react'
import "../Cart/Cart.css"
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {

  const {cartItems, food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);

  const navigate=useNavigate();

console.log(food_list);
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
{food_list.map((item,index)=>{
  if (cartItems[item._id]>0) {
    return(
      <div className="">
      <div className="cart-items-title cart-items-item">
       <img src={url+"/images/"+item.image} alt="" />
       <p>{item.name}</p>
       <p>{item.name}</p>
       <p>{cartItems[item._id]}</p>
       <p>{item.price*cartItems[item._id]}</p>
       <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>
      </div>
      <hr />
      </div>
    )
  }
})}       
      </div>
<div className="cart-bottom">
  <div className="cart-total">
    <h2>Cart Total</h2>
    <div className="">
      <div className="cart-total-details">
        <p>SubTotal</p>
        <p>${getTotalCartAmount()}</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <p>Delivery Fee</p>
        <p>${getTotalCartAmount()==0?0:2}</p>
      </div>
      <hr />
      <div className="cart-total-details">
        <b>Total</b>
        <b>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</b>
      </div>
    </div>
    <button onClick={()=>navigate('/order')}>PROCED TO CHECKOUT</button>
    </div>

    <div className="cart-promocode">
      <div className="">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!</p>
        <div className="cart-promocode-input">
          <input type="text" placeholder='promo code' />
          <button>Submit</button>
        </div>
      </div>
    </div>
    
    </div>      
    </div>
  )
}




// import React, { useContext } from 'react';
// import "../Cart/Cart.css";
// import { StoreContext } from '../../Context/StoreContext';
// import { useNavigate } from 'react-router-dom';

// export default function Cart() {
//   const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
//   const navigate = useNavigate();

//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Image</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <hr />
//         {foodList.map((item) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div key={item._id} className="cart-items-item">
//                 <img src={`${url}/images/${item.image}`} alt={item.name} />
//                 <p>{item.name}</p>
//                 <p>${item.price.toFixed(2)}</p>
//                 <p>{cartItems[item._id]}</p>
//                 <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
//                 <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
//                 <hr />
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div className="cart-total-details">
//             <p>SubTotal</p>
//             <p>${getTotalCartAmount().toFixed(2)}</p>
//           </div>
//           <hr />
//           <div className="cart-total-details">
//             <p>Delivery Fee</p>
//             <p>${getTotalCartAmount() === 0 ? '0.00' : '2.00'}</p>
//           </div>
//           <hr />
//           <div className="cart-total-details">
//             <b>Total</b>
//             <b>${(getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2)).toFixed(2)}</b>
//           </div>
//           <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
//         </div>
//         <div className="cart-promocode">
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, commodi!</p>
//           <div className="cart-promocode-input">
//             <input type="text" placeholder='promo code' />
//             <button>Submit</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
