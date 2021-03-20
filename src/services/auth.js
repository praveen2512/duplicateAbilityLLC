import React, { useContext } from 'react';
import { createContext, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

// persit methods
const authStorageKey = '@auth';
const persistAuth = auth => {
	localStorage.setItem(authStorageKey, JSON.stringify(auth));
};
const removePersistedAuth = () => {
	localStorage.removeItem(authStorageKey);
};
export const getPersistedAuth = () => {
	return JSON.parse(localStorage.getItem(authStorageKey));
};

const AuthContext = createContext({
	auth: null,
	user: {},
	setAuth: () => {},
	clearAuth: () => {}
});

const AuthProvider = ({ children }) => {
	const [auth, saveAuth] = useState();

	const setAuth = useCallback(
		auth => {
			saveAuth(auth);
			persistAuth(auth);
		},
		[saveAuth]
	);

	const clearAuth = useCallback(() => {
		setAuth(null);
		removePersistedAuth();
	}, [setAuth]);

	return (
		<AuthContext.Provider value={{ auth, setAuth, clearAuth, user: {} }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.element
};

export default AuthProvider;

export const useAuth = () => {
	return { ...useContext(AuthContext), getPersistedAuth };
};
