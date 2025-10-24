import { initializeDatabase } from '@/utils/database';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface DatabaseContextType {
    isInitialized: boolean;
    error: string | null;
}

const DatabaseContext = createContext<DatabaseContextType>({
    isInitialized: false,
    error: null,
});

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) {
        throw new Error('useDatabase must be used within a DatabaseProvider');
    }
    return context;
};

interface DatabaseProviderProps {
    children: React.ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initDB = async () => {
            try {
                await initializeDatabase();
                setIsInitialized(true);
                setError(null);
            } catch (err) {
                console.error('Failed to initialize database:', err);
                setError(err instanceof Error ? err.message : 'Unknown database error');
                setIsInitialized(false);
            }
        };

        initDB();
    }, []);

    return (
        <DatabaseContext.Provider value={{ isInitialized, error }}>
            {children}
        </DatabaseContext.Provider>
    );
};
