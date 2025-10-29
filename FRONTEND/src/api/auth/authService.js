import request from '../fetchWrapper';

/**
 * Login with username and password or PIN
 * @param {Object} credentials - { username, password } or { username, pin }
 * @returns {Promise<Object>} - { token, user }
 */
export const login = async (credentials) => {
    return await request('/auth/login', {
        method: 'POST',
        body: credentials,
    });
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
    return await request('/auth/logout', {
        method: 'POST',
    });
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - { token, user }
 */
export const register = async (userData) => {
    return await request('/auth/register', {
        method: 'POST',
        body: userData,
    });
};

/**
 * Verify current session
 * @returns {Promise<Object>} - { user }
 */
export const verifySession = async () => {
    return await request('/auth/verify', {
        method: 'GET',
    });
};

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise<Object>}
 */
export const requestPasswordReset = async (email) => {
    return await request('/auth/password-reset/request', {
        method: 'POST',
        body: { email },
    });
};

/**
 * Reset password with token
 * @param {Object} data - { token, newPassword }
 * @returns {Promise<Object>}
 */
export const resetPassword = async (data) => {
    return await request('/auth/password-reset/confirm', {
        method: 'POST',
        body: data,
    });
};