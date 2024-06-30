import * as SecureStore from 'expo-secure-store'

const tokenManager = {
    getToken() {
        return SecureStore.getItemAsync('secure_token');
    },

    setToken(token: string) {
        SecureStore.setItemAsync('secure_token',token);
    },

    removeToken() {
        SecureStore.deleteItemAsync('secure_token');
    },

    getAuthHeaders() {
        const token = this.getToken();
        if (!token) {
            throw new Error("No token available");
        }
        return {
            headers: { authorization: `Bearer ${token}` }
        };
    }
}

export default tokenManager;