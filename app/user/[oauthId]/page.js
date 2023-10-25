import React from 'react'
import { getUser } from '@/app/api/UserService'


const UserProfilePage = async ({ params: { oauthId } }) => {


    const userData = await getUser(oauthId)
    return (
        <div>
            <h1>{JSON.stringify(userData.data)}</h1>
        </div>
    )
}

export default UserProfilePage
