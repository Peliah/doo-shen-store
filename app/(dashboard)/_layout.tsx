import { Stack } from 'expo-router';
import React from 'react';

export default function DashboardLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="product" options={{ headerShown: false }} />
        </Stack>
    );
}
