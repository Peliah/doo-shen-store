import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AlertButton {
    text: string;
    onPress: () => void;
    style?: 'default' | 'cancel' | 'destructive';
}

interface AlertState {
    visible: boolean;
    title: string;
    message: string;
    buttons: AlertButton[];
}

interface AlertContextType {
    showAlert: (title: string, message: string, buttons: AlertButton[]) => void;
    hideAlert: () => void;
    alertState: AlertState;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
    children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [alertState, setAlertState] = useState<AlertState>({
        visible: false,
        title: '',
        message: '',
        buttons: [],
    });

    const showAlert = (title: string, message: string, buttons: AlertButton[]) => {
        setAlertState({
            visible: true,
            title,
            message,
            buttons,
        });
    };

    const hideAlert = () => {
        setAlertState(prev => ({
            ...prev,
            visible: false,
        }));
    };

    return (
        <AlertContext.Provider value={{ showAlert, hideAlert, alertState }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
