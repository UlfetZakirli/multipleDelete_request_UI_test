import PropTypes from 'prop-types'

import { useContext } from 'react'
import UserContext from '../context/UserContext'

const UserItem = ({ user }) => {
    const { handleCheck, handleCheckUser } = useContext(UserContext)

    return (
        <div
            className="card my-2"
            style={{ cursor: 'pointer' }}
            onClick={() => handleCheckUser({ ...user, checked: !user.checked })}
        >
            <div
                className={`card-body  ${user.checked && "bg-secondary text-white"}`}
                onClick={() => handleCheck(user)}
            >
                <h5 className="card-title text-center">#{user.id}</h5>
                <p className="card-text text-center">{user.username}</p>
            </div>
        </div >
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItem