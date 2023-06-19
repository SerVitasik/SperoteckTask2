import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../components/MainPage";
import Login from "../components/Login";
import Registration from "../components/Registration";

const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path='/login' exact element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};

export default useRoutes;