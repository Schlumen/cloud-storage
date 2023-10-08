import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route exact path="/" Component={Dashboard} />
                            <Route path="/signup" Component={Signup} />
                            <Route path="/login" Component={Login} />
                        </Routes>
                    </AuthProvider>
                </Router>
            </div>
        </Container>

    );
}

export default App;
