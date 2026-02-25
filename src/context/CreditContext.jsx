import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApp } from './AppContext';

const CreditContext = createContext(undefined);

export const useCredits = () => {
    const context = useContext(CreditContext);
    if (!context) {
        throw new Error('useCredits must be used within a CreditProvider');
    }
    return context;
};

export const CreditProvider = ({ children }) => {
    const { user, setUser } = useApp();
    const [credits, setCredits] = useState(user?.credits || 12);
    const [totalCreditsPurchased, setTotalCreditsPurchased] = useState(user?.total_credits_purchased || 0);
    const [isLoading, setIsLoading] = useState(false);

    // Sync credits from user object in AppContext if it changes
    useEffect(() => {
        if (user) {
            setCredits(user.credits);
            setTotalCreditsPurchased(user.total_credits_purchased || 0);
        }
    }, [user]);

    const refreshCredits = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('https://puresoul-2026.onrender.com/api/credits', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const newCredits = data.credits;
                const newTotalPurchased = data.total_credits_purchased || 0;

                setCredits(newCredits);
                setTotalCreditsPurchased(newTotalPurchased);

                // Sync with AppContext and localStorage
                const updatedUser = {
                    ...user,
                    credits: newCredits,
                    total_credits_purchased: newTotalPurchased,
                    is_pro: data.is_pro,
                    is_pro_plus: data.is_pro_plus
                };
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        } catch (error) {
            console.error('Failed to refresh credits:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const consumeCredit = async () => {
        if (!user) return;
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('https://puresoul-2026.onrender.com/api/credits/use', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                const newCredits = data.credits;
                const newTotalPurchased = data.total_credits_purchased !== undefined ? data.total_credits_purchased : totalCreditsPurchased;

                setCredits(newCredits);
                setTotalCreditsPurchased(newTotalPurchased);

                // Sync with AppContext and localStorage
                const updatedUser = {
                    ...user,
                    credits: newCredits,
                    total_credits_purchased: newTotalPurchased,
                    is_pro: data.is_pro,
                    is_pro_plus: data.is_pro_plus
                };
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                setUser(updatedUser);

                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to consume credit:', error);
            return false;
        }
    };

    const addCredits = async (amount) => {
        if (!user) return;
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('https://puresoul-2026.onrender.com/api/credits/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });
            if (response.ok) {
                const data = await response.json();
                const newCredits = data.credits;
                const newTotalPurchased = data.total_credits_purchased;

                setCredits(newCredits);
                setTotalCreditsPurchased(newTotalPurchased);

                // Sync with AppContext and localStorage
                const updatedUser = {
                    ...user,
                    credits: newCredits,
                    total_credits_purchased: newTotalPurchased,
                    is_pro: data.is_pro,
                    is_pro_plus: data.is_pro_plus
                };
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                setUser(updatedUser);
            }
        } catch (error) {
            console.error('Failed to add credits:', error);
        }
    };

    return (
        <CreditContext.Provider value={{
            credits,
            totalCreditsPurchased,
            consumeCredit,
            addCredits,
            refreshCredits,
            isLoading
        }}>
            {children}
        </CreditContext.Provider>
    );
};
