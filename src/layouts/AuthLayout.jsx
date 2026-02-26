// src/components/AuthLayout.jsx (Final Version)
import React, { useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import PageLoader from '../components/common/PageLoader'

export default function AuthLayout({ authentication = true }) {
    const navigate = useNavigate()
    const { isAuthenticated, loading } = useAuthStore()

    const location = useLocation()

    useEffect(() => {
        if (loading) return;

        if (authentication && !isAuthenticated) {
            navigate("/login", {
                replace: true,
                state: { from: location }
            });
            return;
        }

        if (!authentication && isAuthenticated) {
            navigate(location.state?.from?.pathname || "/", {
                replace: true
            });
        }
    }, [isAuthenticated, authentication, loading, navigate, location]);

    return loading ? <PageLoader /> : <Outlet />
}