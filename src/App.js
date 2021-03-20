import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import AuthProvider from '../src/services/auth'
import AppRoutes from './Routes';


const App = () => {

	return (

		<AuthProvider>
			<Router>
				<React.Suspense fallback={<div>Loading Page...</div>}>
					<AppRoutes />
				</React.Suspense>
			</Router>
		</AuthProvider>

	);
};

export default App;