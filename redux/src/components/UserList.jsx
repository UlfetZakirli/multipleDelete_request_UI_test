/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import UserItem from './UserItem'

const UserList = ({ handleDeleteUser, handleCheck, handleCheckUser }) => {
    const { users, isLoading } = useSelector((store) => store.users)

    if (isLoading) {
        return <h3 className='text-center mt-5'>Loading ...</h3>
    }

    return !users.length ? <h4 className='text-center m-5'>Not users yet!</h4> : (
        <div>
            <h3 className='text-center mb-4'>Users</h3>
            {
                users.map((user) => (
                    <UserItem
                        key={user.id}
                        user={user}
                        handleDeleteUser={handleDeleteUser}
                        handleCheck={handleCheck}
                        handleCheckUser={handleCheckUser}
                    />
                ))
            }
            <button onClick={handleDeleteUser} className="btn mt-4 mx-3 btn-danger">Delete</button>

        </div>
    )
}

export default UserList