import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            // toast.error('Select Product Size');
            toast.error('Select Product Size', {
                position: "bottom-right",
            });
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartCount = () => {
        let toatlCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        toatlCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message);
                }
            }
        }

        return toatlCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}});
            if (response.data.success) {
                // console.log("Cart Data: ", response.data.cartData); // Check the structure here
                setCartItems(response.data.cartData);
            } else {
                setCartItems({}); // Reset cart items on failure
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            setCartItems({}); // Reset cart items on error
            toast.error(error.message);
        }
    }


    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const fetchCart = async () => {
            if (!token && localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await getUserCart(localStorage.getItem('token'));
            }
        };
    
        fetchCart();
    }, [])



    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearchBar,
        setShowSearchBar, cartItems, setCartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl, token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;