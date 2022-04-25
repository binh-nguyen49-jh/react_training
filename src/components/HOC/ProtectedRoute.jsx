import React from 'react'
import {Navigate} from 'react-router-dom'
export default async function ProtectedRoute({children}) {
    const {checkExpiration} = useAuth();
    const isAuthenticated = await checkExpiration();
    if (isAuthenticated) {
        return children;
    } else {
        return <Navigate to ="/authentication"></Navigate>;
    }
};
