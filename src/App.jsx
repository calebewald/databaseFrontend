import React from 'react';
import DataTable from './DataTable';
import LandingPage from './LandingPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/">Landing Page</Link></li>
                            <li><Link to="/DataTable">DataTable</Link></li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/DataTable" element={<DataTable />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;