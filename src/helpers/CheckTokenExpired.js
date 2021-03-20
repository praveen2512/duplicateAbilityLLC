import jwtDecode from 'jwt-decode';

const tokenIsExpired = tok => {
	try {
		const decoded = jwtDecode(tok);
		return Date.now() >= decoded.exp * 1000;
	} catch (error) {
		return null;
	}
};

export default tokenIsExpired;
