import { useContext } from 'react'
import UserItem from './UserItem'
import UserContext from '../context/UserContext'

const UserList = () => {
    const { users, handleDeleteUser } = useContext(UserContext)

    return !users.length ? <h4 className='text-center m-5'>Not users yet!</h4> : (
        <div>
            <h3 className='text-center mb-4'>Users</h3>
            {
                users.map((user) => (
                    <UserItem
                        key={user.id}
                        user={user}
                    />
                ))
            }
            <button onClick={handleDeleteUser} className="btn mt-4 mx-3 btn-danger">Delete</button>

        </div>
    )
}

export default UserList