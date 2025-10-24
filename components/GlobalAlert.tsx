import { CustomAlert } from '@/components/ui/CustomAlert';
import { useAlert } from '@/contexts/AlertContext';
import React from 'react';

export const GlobalAlert: React.FC = () => {
    const { alertState, hideAlert } = useAlert();

    return (
        <CustomAlert
            visible={alertState.visible}
            title={alertState.title}
            message={alertState.message}
            buttons={alertState.buttons}
            onClose={hideAlert}
        />
    );
};
