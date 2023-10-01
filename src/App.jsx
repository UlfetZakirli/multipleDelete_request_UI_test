import axios from "axios"
import { useEffect, useState } from "react"
import UserList from "./components/UserList"

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/users'
})

const App = () => {
  const [users, setUsers] = useState([])
  const [checkedUser, setCheckedUser] = useState([])

  console.log(checkedUser);

  const handleCheck = (user) => {
    if (!checkedUser.includes(user.id) || !user.checked) {
      setCheckedUser([...checkedUser, user.id])
    } else {
      setCheckedUser((checkedUser.filter((id) => id !== user.id)))
    }
  }


  useEffect(() => {
    const getUsers = async () => {
      const res = await axiosInstance.get()
      const data = await res.data
      setUsers(data)
      setCheckedUser(data.filter((user) => user.checked).map(user => user.id))
    }
    getUsers()
  }, [])



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

  return (
    <div>
      <UserList
        users={users}
        handleDeleteUser={handleDeleteUser}
        handleCheck={handleCheck}
        handleCheckUser={handleCheckUser}
      />
    </div>
  )
}

export default App