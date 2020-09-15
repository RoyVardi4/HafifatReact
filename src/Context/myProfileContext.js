import React, {useState, useContext} from 'react'

const MyProfileContext = React.createContext()
const MyProfileUpdateContext = React.createContext()


export function useMyProfile() {
    return useContext(MyProfileContext)
}

export function useMyProfileChange() {
    return useContext(MyProfileUpdateContext)
}

export function MyProfileProvider({ children }) {
    const [myProfile, setMyProfile] = useState(
        // {
        //     name: "Roy Vardi"
        // }
    )

    // Change Profile
    function chnageMyProfile(newUser) {
        setMyProfile(newUser)
    }

    // // Remove one
    // function removeFromMyCart(courseToRemove) {
    //     const newList = myCart.filter((course) => {
    //                     return course.name !== courseToRemove.name
    //                 })
    //     setMyCart([ ...newList ])
    // }

    // // Remove all
    // function removeAllFromMyCart() {
    //     setMyCart([])
    // }

    return (
        <MyProfileContext.Provider value={myProfile}>
            <MyProfileUpdateContext.Provider value={chnageMyProfile}>
                {/* <MyCartRemoveContext.Provider value={removeFromMyCart}>
                    <MyCartRemoveAllContext.Provider value={removeAllFromMyCart}> */}
                        {children}
                    {/* </MyCartRemoveAllContext.Provider>
                </MyCartRemoveContext.Provider> */}
            </MyProfileUpdateContext.Provider>
        </MyProfileContext.Provider>
    )
}