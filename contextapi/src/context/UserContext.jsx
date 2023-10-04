import axios from 'axios'
import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/users'
})

export const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([])
    const [checkedUser, setCheckedUser] = useState([])


    useEffect(() => {
        const getUsers = async () => {
            const res = await axiosInstance.get()
            const data = await res.data
            setUsers(data)
            setCheckedUser(data.filter((user) => user.checked).map(user => user.id))
        }
        getUsers()
    }, [])


    const handleCheck = (user) => {
        if (!checkedUser.includes(user.id) || !user.checked) {
            setCheckedUser([...checkedUser, user.id])
        } else {
            setCheckedUser((checkedUser.filter((id) => id !== user.id)))
        }
    }

    const handleDeleteUser = async () => {
        setUsers(users.filter(user => !checkedUser.includes(user.id)))
        if (checkedUser.length) {
            setCheckedUser([])


            // deleted multiple users here 
            await Promise.all([
                checkedUser.forEach((id) => {
                    axiosInstance.delete(`/${id}`)
                })
            ])

        } else {
            alert('Please select users!')
        }
    }

    const handleCheckUser = async (updatedUser) => {
        const res = await axiosInstance.patch(`/${updatedUser.id}`, updatedUser)
        const data = await res.data
        setUsers(users.map((user) => user.id == updatedUser.id ? { ...user, ...data } : user))
    }


    const providerValue = {
        users,
        handleCheck,
        handleCheckUser,
        handleDeleteUser
    }



    return (
        <UserContext.Provider value={providerValue}>
            {children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default UserContext