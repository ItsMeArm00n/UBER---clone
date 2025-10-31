import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    }

    const updateCaptainStatus = async (status) => {
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/captains/status`,
                { status },
                {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                }
            );
            
            if (response.data.captain) {
                setCaptain(response.data.captain);
            }
            
            setIsLoading(false);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update status');
            setIsLoading(false);
            throw err;
        }
    }

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
        updateCaptainStatus
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};
export default CaptainContext;
