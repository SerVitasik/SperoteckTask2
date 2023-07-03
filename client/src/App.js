import { BrowserRouter } from "react-router-dom";
import useRoutes from './hooks/use-routes';
import AuthContext from './context/AuthContext';
import useAuth from './hooks/use-auth';

function App() {
  const { login, logout, userId, token, isReady } = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);

  return (
    <AuthContext.Provider value={{ login, logout, userId, token, isReady, isLogin }}>
      <div className='app'>
        <BrowserRouter>
          {routes}
        </BrowserRouter >
      </div>
    </AuthContext.Provider>
  );
}

export default App;
