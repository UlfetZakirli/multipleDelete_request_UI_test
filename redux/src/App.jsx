import { useEffect, useState } from "react"
import UserList from "./components/UserList"
import { useDispatch, useSelector } from "react-redux"
import { deleteUserAsync, getUsersAsync, updateUserAsync } from "./redux/userSlice"


const App = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((store) => store.users)
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
    dispatch(getUsersAsync())
  }, [dispatch])

  useEffect(() => {
    setCheckedUser(users.filter((user) => user.checked).map(item => item.id))
    console.log('effect');
  }, [users])


  const handleDeleteUser = async () => {
    if (checkedUser.length) {
      dispatch(deleteUserAsync(checkedUser))
      setCheckedUser([])
    } else {
      alert('Please select users!')
    }
  }

  const handleCheckUser = async (updatedUser) => {
    dispatch(updateUserAsync(updatedUser))
  }

  return (
    <div>
      <UserList
        handleDeleteUser={handleDeleteUser}
        handleCheck={handleCheck}
        handleCheckUser={handleCheckUser}
      />
    </div>
  )
}

export default App