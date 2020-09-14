import React, {useState, useContext} from 'react'

const MyCartContext = React.createContext()
const MyCartUpdateContext = React.createContext()
const MyCartRemoveContext = React.createContext()
const MyCartRemoveAllContext = React.createContext()


export function useMyCart() {
    return useContext(MyCartContext)
}

export function useMyCartUpdate() {
    return useContext(MyCartUpdateContext)
}

export function useMyCartRemove() {
    return useContext(MyCartRemoveContext)
}

export function useMyCartRemoveAll() {
    return useContext(MyCartRemoveAllContext)
}

export function MyCartProvider({ children }) {
    const [myCart, setMyCart] = useState([])

    // Add one
    function updateMyCart(newItem) {
        setMyCart(
            [
                ...myCart,
                newItem
            ])
    }

    // Remove one
    function removeFromMyCart(courseToRemove) {
        const newList = myCart.filter((course) => {
                        return course.name !== courseToRemove.name
                    })
        setMyCart([ ...newList ])
    }

    // Remove all
    function removeAllFromMyCart() {
        setMyCart([])
    }

    return (
        <MyCartContext.Provider value={myCart}>
            <MyCartUpdateContext.Provider value={updateMyCart}>
                <MyCartRemoveContext.Provider value={removeFromMyCart}>
                    <MyCartRemoveAllContext.Provider value={removeAllFromMyCart}>
                        {children}
                    </MyCartRemoveAllContext.Provider>
                </MyCartRemoveContext.Provider>
            </MyCartUpdateContext.Provider>
        </MyCartContext.Provider>
    )
}