import UserList from "./components/UserList"
import { UserProvider } from "./context/UserContext"

const App = () => {

  return (
    <UserProvider>
      <UserList />
    </UserProvider>
  )
}

export default App