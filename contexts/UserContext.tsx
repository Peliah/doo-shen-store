import { User } from '@/utils/database';
import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => { },
});

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
