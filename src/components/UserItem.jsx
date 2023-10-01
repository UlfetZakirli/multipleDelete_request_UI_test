/* eslint-disable react/prop-types */

const UserItem = ({ user, handleCheck, handleCheckUser }) => {
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

export default UserItem