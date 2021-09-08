import './App.css';
import { CookiesProvider } from 'react-cookie';

import MainApp from './MainApp';

const App = () => {
	return (
		<CookiesProvider>
			<MainApp />
		</CookiesProvider>
	);
};

export default App;
