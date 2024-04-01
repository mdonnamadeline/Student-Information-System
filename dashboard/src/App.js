import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStudent from'./pages/AddStudent';
import Demo from './pages/Demo';
import ViewStudent from './pages/ViewStudent';
import ViewUser from './pages/ViewUser';
import Login from './pages/Login';

function App() {
    return (
        
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/addstudent' element={<AddStudent />} />
                <Route path='/viewstudent' element={<ViewStudent/>} />
                <Route path='/viewuser' element={<ViewUser/>} />
                <Route path='/login'element={<Login/>} />
                <Route path='/demo' element={<Demo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;