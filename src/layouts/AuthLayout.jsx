// src/components/AuthLayout.jsx (Final Version)
import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import PageLoader from '../components/common/PageLoader'

export default function AuthLayout({ authentication = true }) {
    const { isAuthenticated, initializing } = useAuthStore()
    const location = useLocation()

    if(initializing) return <PageLoader />

    if (authentication && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (!authentication && isAuthenticated) {
        const origin = location.state?.from?.pathname || "/"
        return <Navigate to={origin} replace />
    }

    return <Outlet />
}