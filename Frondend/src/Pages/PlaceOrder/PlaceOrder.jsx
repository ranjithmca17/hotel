// import React, { useContext, useEffect, useState } from 'react'
// import "../PlaceOrder/PlaceOrder.css"
// import { StoreContext } from '../../Context/StoreContext'
// import axios from 'axios';

// export default function PlaceOrder() {

//   const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);

//   const [data,setData]=useState({

//   firstName:"",
//   lastName:"",
//   email:"",
//   street:"",
//   city:"",
//   state:"",
//   zipcode:"",
//   country:"",
//   phone:""
//   })


//   const ProceedOrder = async (event) => {
//     event.preventDefault();
  
//     // Filter items with quantity > 0 and map to new array
//     const orderItems = food_list
//       .filter(item => cartItems[item._id] > 0)
//       .map(item => ({
//         ...item,
//         quantity: cartItems[item._id]
//       }));
  
//    let orderData={
//     address:data,
//     items:orderItems,
//     amount:getTotalCartAmount()+2,
//    }
//    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

//    if(response.data.success){
//     const {session_url}=response.data;
//     window.location.replace(session_url);
//    }
//     else{
//       alert("error");
//     }
//     // Further logic for submitting the order
//   };
  
// const onChangeHandler=(event)=>{
// const name=event.target.name;
// const value=event.target.value;

// setData(prev=>({
//   ...prev,[name]:value}));
// }

// useEffect(()=>{
// console.log(data);

// },[data])

//   return (
//     <div>
//        <form className="place-order" onSubmit={ProceedOrder}>
//         <div className="place-order-left">
//           <p className="title">Delivery Information</p>

//           <div className="multi-fields">
//             <input required type="text" placeholder='First Name' name='firstName' value={data.firstName} onChange={onChangeHandler} />
//             <input required type="text" placeholder='Last Name' name='lastName' value={data.lastName} onChange={onChangeHandler} />
//           </div>
//           <input required type="email" placeholder='Email address' name='email' value={data.email} onChange={onChangeHandler} />
//           <input required type="text" placeholder='Street' name='street' value={data.street} onChange={onChangeHandler} />

//           <div className="multi-fields">
//             <input required type="text" placeholder='City' name='city' value={data.city} onChange={onChangeHandler} />
//             <input required type="text" placeholder='State' name='state' value={data.state} onChange={onChangeHandler} />
//           </div>

//           <div className="multi-fields">
//             <input required type="text" placeholder='Zip code' name='zipcode' value={data.zipcode} onChange={onChangeHandler} />
//             <input required type="text" placeholder='Country' name='country' value={data.country} onChange={onChangeHandler} />
//           </div>
//           <input type="text" required placeholder='Phone' name='phone' value={data.phone} onChange={onChangeHandler} />
//         </div>
        
//         <div className="place-order-right">
//           <div className="cart-total">
//             <h2>Cart Total</h2>
//             <div className="">
//               <div className="cart-total-details">
//                 <p>SubTotal</p>
//                 <p>${getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Delivery Fee</p>
//                 <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <b>Total</b>
//                 <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//               </div>
//             </div>
//             <button type='submit'>PROCEED TO PAYMENT</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }







import React, { useContext, useEffect, useState } from 'react';
import '../PlaceOrder/PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const validateForm = () => {
    let valid = true;
    const errors = {};

    Object.keys(data).forEach(key => {
      if (data[key].trim() === '') {
        errors[key] = 'This field is required';
        valid = false;
      } else {
        errors[key] = '';
      }
    });

    setFormErrors(errors);
    return valid;
  };

  const ProceedOrder = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Exit if the form is not valid
    }

    const orderItems = food_list
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to payment gateway
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order');
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(data); // Log whenever data changes
  }, [data]);

  return (
    <div>
      <form className="place-order" onSubmit={ProceedOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input required type="text" placeholder="First Name" name="firstName" value={data.firstName} onChange={onChangeHandler} />
            {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
            <input required type="text" placeholder="Last Name" name="lastName" value={data.lastName} onChange={onChangeHandler} />
            {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
          </div>

          <input required type="email" placeholder="Email address" name="email" value={data.email} onChange={onChangeHandler} />
          {formErrors.email && <span className="error">{formErrors.email}</span>}

          <input required type="text" placeholder="Street" name="street" value={data.street} onChange={onChangeHandler} />
          {formErrors.street && <span className="error">{formErrors.street}</span>}

          <div className="multi-fields">
            <input required type="text" placeholder="City" name="city" value={data.city} onChange={onChangeHandler} />
            {formErrors.city && <span className="error">{formErrors.city}</span>}
            <input required type="text" placeholder="State" name="state" value={data.state} onChange={onChangeHandler} />
            {formErrors.state && <span className="error">{formErrors.state}</span>}
          </div>

          <div className="multi-fields">
            <input required type="text" placeholder="Zip code" name="zipcode" value={data.zipcode} onChange={onChangeHandler} />
            {formErrors.zipcode && <span className="error">{formErrors.zipcode}</span>}
            <input required type="text" placeholder="Country" name="country" value={data.country} onChange={onChangeHandler} />
            {formErrors.country && <span className="error">{formErrors.country}</span>}
          </div>

          <input required type="text" placeholder="Phone" name="phone" value={data.phone} onChange={onChangeHandler} />
          {formErrors.phone && <span className="error">{formErrors.phone}</span>}
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
