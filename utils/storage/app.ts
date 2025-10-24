import { STORAGE_KEYS, StorageUtils } from './base';

// App State Management
export class AppStorage {
    static async isFirstLaunch(): Promise<boolean> {
        try {
            const firstLaunchValue = await StorageUtils.getItem<string>(STORAGE_KEYS.FIRST_LAUNCH);
            // If no value exists, it's the first launch
            if (firstLaunchValue === null) {
                return true;
            }
            // Return true if the stored value is 'true', false otherwise
            return firstLaunchValue === 'true';
        } catch (error) {
            console.error('Error checking first launch:', error);
            return true;
        }
    }

    static async setFirstLaunch(isFirstLaunch: boolean): Promise<void> {
        await StorageUtils.saveItem(STORAGE_KEYS.FIRST_LAUNCH, isFirstLaunch ? 'true' : 'false');
    }

    static async setFirstLaunchComplete(): Promise<void> {
        await StorageUtils.saveItem(STORAGE_KEYS.FIRST_LAUNCH, 'false');
    }

    static async getAppState(): Promise<any> {
        return await StorageUtils.getItem(STORAGE_KEYS.APP_STATE);
    }

    static async saveAppState(state: any): Promise<void> {
        await StorageUtils.saveItem(STORAGE_KEYS.APP_STATE, state);
    }

    static async clearAllData(): Promise<void> {
        const keys = Object.values(STORAGE_KEYS);
        await StorageUtils.clearAll(keys);
    }

}
