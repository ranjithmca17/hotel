import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{

    const [cartItems,setCartItems]=useState({});

    const[food_list,setFoodlist]=useState([])
    const url="http://localhost:4000";
    const[token,setToken]=useState('')

    // const addToCart= async (itemId)=>{
    //     if (!cartItems[itemId]) {
    //         setCartItems((prev)=>({...prev,[itemId]:1}))
    //     }
    //     else{
    //         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    //     }
    //     if(token){
    //         await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    //     }
    // }


    // const removeFromCart=(itemId)=>{
    //     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    // }
    
    const addToCart = async (itemId) => {
        try {
            if (token) {
                // Fetch the food item to get stock
                const item = foodList.find(product => product._id === itemId);
                if (!item) return;

                // Check stock before adding
                if (item.stock <= 0) {
                    alert("Item out of stock");
                    return;
                }

                // Update cart state
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: (prev[itemId] || 0) + 1
                }));

                // Post to server to update cart
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );

                // Reduce stock on server
                await axios.post(
                    `${url}/api/food/updateStock`,
                    { itemId, change: -1 },
                    { headers: { token } }
                );
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            if (cartItems[itemId] > 0) {
                // Update cart state
                setCartItems((prev) => {
                    const updatedCart = { ...prev };
                    if (updatedCart[itemId] > 1) {
                        updatedCart[itemId] -= 1;
                    } else {
                        delete updatedCart[itemId];
                    }
                    return updatedCart;
                });

                // Post to server to update cart
                if (token) {
                    await axios.post(
                        `${url}/api/cart/remove`,
                        { itemId },
                        { headers: { token } }
                    );

                    // Increase stock on server
                    await axios.post(
                        `${url}/api/food/updateStock`,
                        { itemId, change: 1 },
                        { headers: { token } }
                    );
                }
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };





 const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
        if (cartItems[item]>0) {
            let itemInfo=food_list.find((product)=>product._id== item)
        totalAmount+=itemInfo.price*cartItems[item];

        }
            }
            return totalAmount;
 }


 const fetchFoodList= async()=>{
    const response=await axios.get(url+"/api/food/list");

    setFoodlist(response.data.data);
 }

const loadCartdata= async (token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
}
 useEffect(()=>{

async function loadData(){
    await fetchFoodList()
    if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartdata(localStorage.getItem("token"));
    }
 }
 loadData();
 },[])

const ContextValue={
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
}


    return(
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;





// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//     const [cartItems, setCartItems] = useState({});
//     const [foodList, setFoodList] = useState([]);
//     const [token, setToken] = useState('');
//     const url = "http://localhost:4000";

//     const addToCart = async (itemId) => {
//         try {
//             if (token) {
//                 // Fetch the food item to get stock
//                 const item = foodList.find(product => product._id === itemId);
//                 if (!item) return;

//                 // Check stock before adding
//                 if (item.stock <= 0) {
//                     alert("Item out of stock");
//                     return;
//                 }

//                 // Update cart state
//                 setCartItems((prev) => ({
//                     ...prev,
//                     [itemId]: (prev[itemId] || 0) + 1
//                 }));

//                 // Post to server to update cart
//                 await axios.post(
//                     `${url}/api/cart/add`,
//                     { itemId },
//                     { headers: { token } }
//                 );

//                 // Reduce stock on server
//                 await axios.post(
//                     `${url}/api/food/updateStock`,
//                     { itemId, change: -1 },
//                     { headers: { token } }
//                 );
//             }
//         } catch (error) {
//             console.error("Error adding to cart:", error);
//         }
//     };

//     const removeFromCart = async (itemId) => {
//         try {
//             if (cartItems[itemId] > 0) {
//                 // Update cart state
//                 setCartItems((prev) => {
//                     const updatedCart = { ...prev };
//                     if (updatedCart[itemId] > 1) {
//                         updatedCart[itemId] -= 1;
//                     } else {
//                         delete updatedCart[itemId];
//                     }
//                     return updatedCart;
//                 });

//                 // Post to server to update cart
//                 if (token) {
//                     await axios.post(
//                         `${url}/api/cart/remove`,
//                         { itemId },
//                         { headers: { token } }
//                     );

//                     // Increase stock on server
//                     await axios.post(
//                         `${url}/api/food/updateStock`,
//                         { itemId, change: 1 },
//                         { headers: { token } }
//                     );
//                 }
//             }
//         } catch (error) {
//             console.error("Error removing from cart:", error);
//         }
//     };

//     const getTotalCartAmount = () => {
//         return Object.keys(cartItems).reduce((total, itemId) => {
//             const itemInfo = foodList.find((product) => product._id === itemId);
//             return total + (itemInfo ? itemInfo.price * cartItems[itemId] : 0);
//         }, 0);
//     };

//     const fetchFoodList = async () => {
//         try {
//             const response = await axios.get(`${url}/api/food/list`);
//             setFoodList(response.data.data);
//         } catch (error) {
//             console.error("Error fetching food list:", error);
//         }
//     };

//     const loadCartData = async (token) => {
//         try {
//             const response = await axios.post(
//                 `${url}/api/cart/get`,
//                 {},
//                 { headers: { token } }
//             );
//             setCartItems(response.data.cartData);
//         } catch (error) {
//             console.error("Error loading cart data:", error);
//         }
//     };

//     useEffect(() => {
//         const loadData = async () => {
//             await fetchFoodList();
//             const storedToken = localStorage.getItem("token");
//             if (storedToken) {
//                 setToken(storedToken);
//                 await loadCartData(storedToken);
//             }
//         };
//         loadData();
//     }, []);

//     const contextValue = {
//         foodList,
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         getTotalCartAmount,
//         url,
//         token,
//         setToken
//     };

//     return (
//         <StoreContext.Provider value={contextValue}>
//             {props.children}
//         </StoreContext.Provider>
//     );
// };

// export default StoreContextProvider;
