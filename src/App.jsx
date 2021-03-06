import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainLinks from './components/MainLinks';
import { Lab1 } from './pages/lab1/lab1';
import { Lab2 } from './pages/lab2/lab2';
import Lab3 from './pages/lab3/lab3';
import Lab4 from './pages/lab4/lab4';
import  Lab5  from './pages/lab5/lab5';
function App() {
	return (
		<BrowserRouter basename='/AMO'>
			<div className='container my-8 mx-auto'>
				<Link to='/' className='text-xl font-bold block text-center'>
					АМО Лабораторні , Грицюк Максим ІО-02
				</Link>
				<MainLinks />
				<Routes>
					<Route path='/lab1' element={<Lab1 />} />
					<Route path='/lab2' element={<Lab2 />} />
					<Route path='/lab3' element={<Lab3 />} />
					<Route path='/lab4' element={<Lab4 />} />
					<Route path='/lab5' element={<Lab5 />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
