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
    const [myProfile, setMyProfile] = useState()

    // Change Profile
    function chnageMyProfile(newUser) {
        setMyProfile(newUser)
    }

    return (
        <MyProfileContext.Provider value={myProfile}>
            <MyProfileUpdateContext.Provider value={chnageMyProfile}>
                {children}
            </MyProfileUpdateContext.Provider>
        </MyProfileContext.Provider>
    )
}