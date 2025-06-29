import './App.css'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/"></Route>
            <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    )
}

export default App
