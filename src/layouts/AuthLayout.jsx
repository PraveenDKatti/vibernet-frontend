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
        if (!loading) {
            if (authentication && !isAuthenticated) {
                navigate("/login", {
                    replace: true,
                    state: { from: location }
                });
            }
            if (!authentication && isAuthenticated) navigate("/")
        }
    }, [isAuthenticated, authentication, loading, navigate])

    return loading ? <PageLoader /> : <Outlet />
}