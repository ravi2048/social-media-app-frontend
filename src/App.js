import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar.jsx";
import Profile from "./pages/profile/Profile";
import './style.scss';
import { useContext } from "react";
import { DarkThemeContext } from "./context/themeContext";
import { AuthUserContext } from "./context/authUserContext";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

function App() {
    const { currUser } = useContext(AuthUserContext);
    const { darkMode } = useContext(DarkThemeContext);
    const queryClient = new QueryClient();

    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={darkMode ? `theme-dark` : `theme-light`}>
                    <Navbar />
                    <div style={{ display: "flex" }}>
                        <Leftbar />
                        <div style={{flex: 6}}>
                            <Outlet />
                        </div>
                        <Rightbar />
                    </div>
                </div>  
            </QueryClientProvider>
        );
    };

    const ProtectedLayout = ({ children }) => {
        if (!currUser) {
            return <Navigate to='/login' />;
        }
        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/",
            element: (
                <ProtectedLayout>
                    <Layout />
                </ProtectedLayout>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/profile/:id",
                    element: <Profile />,
                },
            ],
        },
    ]);

    return (
        <div className='App'>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
