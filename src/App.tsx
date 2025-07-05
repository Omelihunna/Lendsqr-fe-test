import './App.css'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import Users from "./pages/Users.tsx";
import UserDetailsPage from "./pages/UserDetailsPage.tsx";
import FilterModal from "./components/dashboard/modals/FilterModal.tsx";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/"></Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard/*" element={<DashboardLayout />}>
                    <Route index element={<Users />} />
                    <Route index path="users" element={<Users />} />
                    <Route path="users/:id" element={<UserDetailsPage />} />
                </Route>
            </Routes>
            <FilterModal />
        </>
    )
}

export default App
