import React from 'react';

// Context 
import {useMyProfile} from '../Context/myProfileContext'

// Components
import PleaseLogin from '../components/pleaseLogin'

export default function CoursesDone() {
    const profile = useMyProfile()
    
    return (
        <div>
            { 
                typeof profile === 'undefined'
                ?
                <PleaseLogin />
                :
                <h1 align="center" style={{paddingBottom:"415px"}}>Courses Done by {profile.name}</h1>
            }
        </div>
    );
}