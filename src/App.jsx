import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddedTasks from './pages/AddedTasks';
import CreateTask from './pages/CreateTask';
import DetailedTask from './pages/DetailedTask';

export default function App() {
    return (
        <Router className="font-['FiraGO']">
            <Navbar />
            <Routes>
                <Route path="/" element={<AddedTasks />} />
                <Route path="/create-task" element={<CreateTask />} />
                <Route path="/task/:id" element={<DetailedTask />} />
            </Routes>
        </Router>
    );
}