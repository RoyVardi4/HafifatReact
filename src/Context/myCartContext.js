import React, {useState, useContext} from 'react'

const MyCartContext = React.createContext()
const MyCartUpdateContext = React.createContext()
const MyCartRemoveContext = React.createContext()

export function useMyCart() {
    return useContext(MyCartContext)
}

export function useMyCartUpdate() {
    return useContext(MyCartUpdateContext)
}

export function useMyCartRemove() {
    return useContext(MyCartRemoveContext)
}

export function MyCartProvider({ children }) {
    const [myCart, setMyCart] = useState([])

    function updateMyCart(newItem) {
        setMyCart(
            [
                ...myCart,
                newItem
            ])
    }

    function removeFromMyCart(courseToRemove) {
        const newList = myCart.filter((course) => {
                        return course.name !== courseToRemove.name
                    })
        setMyCart([ ...newList ])
    }

    return (
        <MyCartContext.Provider value={myCart}>
            <MyCartUpdateContext.Provider value={updateMyCart}>
                <MyCartRemoveContext.Provider value={removeFromMyCart}>
                    {children}
                </MyCartRemoveContext.Provider>
            </MyCartUpdateContext.Provider>
        </MyCartContext.Provider>
    )
}