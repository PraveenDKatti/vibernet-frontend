// src/components/AuthLayout.jsx (Final Version)
import React, {useEffect} from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import authStore from '../store/authStore'
import PageLoader from '../common/PageLoader'

export default function AuthLayout({ authentication = true }) {
    const navigate = useNavigate()
    const { isAuthenticated, loading } = authStore()

    useEffect(() => {
        if (!loading) {
            if (authentication && !isAuthenticated) navigate("/signin")
            if (!authentication && isAuthenticated) navigate("/")
        }
    }, [isAuthenticated, authentication, loading, navigate])

    return loading ? <PageLoader /> : <Outlet />
}