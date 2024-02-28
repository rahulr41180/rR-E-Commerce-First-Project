
import { useState, useEffect, useContext, createContext } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    // console.log('cartItems:', cartItems);
    const [totalCartPriceQuantity, setTotalCartPriceQuantity] = useState({
        totalPrice: 0,
        totalQuantity: 0
    });

    const [removeCartItemsStatus, setRemoveCartItemsStatus] = useState(false);

    useEffect(() => {
        // console.log("cart context initial render");
        const data = JSON.parse(localStorage.getItem("rReCom_CartItems"));
        // console.log('data4:', data)
        if (data === null) {
            setCartItems({})
        } else {

            setCartItems(data);
        }
    }, [removeCartItemsStatus])

    const handleCart = (element) => {
        // console.log("Hello here");
        // console.log('element1:', element)
        // console.log("cartItems[element?._id] :", cartItems[element?._id])


        setCartItems((prev) => {
            const itemId = element?._id
            // console.log('prev:', prev)
            // console.log('prev[element?._id]:', prev[element?._id])
            if (!prev[itemId]) {
                // console.log("false :", false);
                // const newState = { ...prev, [itemId]: [element, 1] }
                // console.log('newState2:', newState)
                return {

                    ...prev,
                    [itemId]: [element, 1]
                }
                // prev[element._id] = [element, 1];
            } else if (prev[element?._id]) {
                // console.log("true :", true);
                return {
                    ...prev,
                    [itemId]: [prev[itemId][0], prev[itemId][1] + 1]

                }
            }
        })
        // console.log('cartItems1:', cartItems);
    }

    const handleCartQuantity = (element, value) => {
        // console.log("Hello");
        // console.log('value:', value)

        // console.log('value:', typeof value)
        // console.log('element:', element)

        const quantityValue = value === "subtract" ? Number(element[1][1]) - 1 : Number(element[1][1]) + 1;
        // console.log('quantityValue:', quantityValue);
        // console.log('quantityValue:', typeof quantityValue);

        setCartItems((prev) => {
            if (quantityValue < 1) {

                const newState = { ...prev };
                delete newState[element[0]];
                localStorage.setItem("rReCom_CartItems", JSON.stringify(newState));
                return newState;
            } else if (quantityValue > 0) {
                // const newState = { ...prev };
                // newState[element[0]] = [element[1][0], quantityValue];
                // console.log('newState:', newState)
                return {

                    ...prev,
                    [element[0]]: [element[1][0], quantityValue]
                }
            }
        })
    }

    const handleRemoveItem = (element) => {
        setCartItems((prev) => {

            const newState = { ...prev };
            delete newState[element[0]];
            localStorage.setItem("rReCom_CartItems", JSON.stringify(newState));
            return newState;
        })
    }

    useEffect(() => {
        // console.log('cartItems2:', cartItems);
        
        if (Object.entries(cartItems).length > 0) {
            // console.log('Object.entries(cartItems).length:', Object.entries(cartItems).length);
            localStorage.setItem("rReCom_CartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    return (
        <CartContext.Provider value={[cartItems, setCartItems, handleCart, handleCartQuantity, handleRemoveItem, totalCartPriceQuantity, setTotalCartPriceQuantity, setRemoveCartItemsStatus]}>{children}</CartContext.Provider>
    )

}

export const useCartContext = () => {
    return useContext(CartContext);
}