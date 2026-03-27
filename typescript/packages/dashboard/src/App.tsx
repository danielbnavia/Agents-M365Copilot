import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import ApiExplorer from "./pages/ApiExplorer";
import GettingStarted from "./pages/GettingStarted";
import Overview from "./pages/Overview";
import Packages from "./pages/Packages";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Overview />} />
				<Route path="packages" element={<Packages />} />
				<Route path="api-explorer" element={<ApiExplorer />} />
				<Route path="getting-started" element={<GettingStarted />} />
			</Route>
		</Routes>
	);
}

export default App;
