import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import ForgotPassword from "./authentication/ForgotPassword";
import Profile from "./authentication/Profile";
import UpdateProfile from "./authentication/UpdateProfile";
import PrivateRoute from "./authentication/PrivateRoute";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Drive */}


                    {/* Profile */}
                    <Route path="/user" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />

                    {/* Auth */}
                    <Route path="/signup" Component={Signup} />
                    <Route path="/login" Component={Login} />
                    <Route path="/forgot-password" Component={ForgotPassword} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
