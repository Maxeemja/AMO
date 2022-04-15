import { useFormik } from 'formik';
import { useState } from 'react';
import { LabHeader } from '../../components/LabHeader';
import taskImg from '../../assets/lab5/taskImg.png';
import { calcEquation } from './calc';
import { TextField, Button } from '@mui/material';
export default function Lab5() {
	const [result, setResult] = useState('');
	const handleFile = (e) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target.result.split(' ');
			const res = Object.keys(formik.values).map((k, i) => {
				return Object.fromEntries([[k, text[i]]]);
			});
			formik.setValues(Object.assign(...res));
		};
		reader.readAsText(e.target.files[0]);
		document.forms[0].fileInput.value = '';
	};
	const formik = useFormik({
		initialValues: {
			a11: '',
			a21: '',
			a31: '',
			a12: '',
			a22: '',
			a32: '',
			a13: '',
			a23: '',
			a33: '',
			b1: '',
			b2: '',
			b3: ''
		},
		onSubmit: (vals) => {
			if (Object.values(vals).includes('')) return alert('Не всі дані введені!');
			const [x1, x2, x3] = calcEquation(vals);

			setResult({ x1, x2, x3 });
			console.log(result);
			formik.resetForm();
		}
	});
	return (
		<>
			<LabHeader num='5'>Розв’язання систем лінійних алгебраїчних рівнянь</LabHeader>
			<hr className='my-4' />
			<div className='flex flex-col gap-8 items-center'>
				<div className='flex flex-col gap-4 items-center'>
					<p className='mb-3 text-lg'>Завдання за варіантом:</p>
					<img src={taskImg} alt='' className='' />
				</div>
				<hr />
				<form onSubmit={formik.handleSubmit}>
					<div className='flex justify-center items-center w-5/6 mx-auto'>
						<div className='grid grid-cols-3 grid-rows-3 gap-3'>
							{Object.keys(formik.values)
								.filter((el) => !el.includes('b'))
								.map((el, i) => {
									return (
										<div className='flex justify-between' key={el}>
											<TextField
												label={`Введіть а${el.slice(1)}`}
												type='number'
												{...formik.getFieldProps(el)}
											/>
											<span className='flex items-center justify-center text-bold mx-2 w-1/3'>
												{' '}
												* X{`${el.slice(-1)}`}
												{['1', '2'].includes(el.slice(-1)) && ' + '}
											</span>
										</div>
									);
								})}
						</div>

						<div className='grid grid-cols-1 grid-rows-3 gap-3'>
							{Object.keys(formik.values)
								.filter((el) => !el.includes('a'))
								.map((el, i) => {
									return (
										<div className='flex justify-between' key={el}>
											<span className='flex items-center justify-center text-bold mr-2 w-1/5'>
												{' '}
												={' '}
											</span>
											<TextField
												label={`Введіть b${el.slice(1)}`}
												type='number'
												{...formik.getFieldProps(el)}
											/>
										</div>
									);
								})}
						</div>
					</div>
					<div className='mt-8 flex flex-col gap-8 items-center'>
						<p>або</p>
						<Button variant='contained' color='info'>
							<label htmlFor='fileInput'>
								Виберіть файл
								<input
									id='fileInput'
									type='file'
									accept='.txt'
									onChange={handleFile}
									placeholder='Виберіть файл...'
									hidden
								/>
							</label>
						</Button>
						{result ? (
							<ul className='text-lg font-bold'>
								<li>Х1 = {+result.x1.toFixed(4)}</li>
								<li>Х2 = {+result.x2.toFixed(4)}</li>
								<li>Х3 = {+result.x3.toFixed(4)}</li>
							</ul>
						) : null}
						<Button variant='contained' color='success' type='submit'>
							Результат!
						</Button>
						<hr className='bg-black w-full' />
					</div>
				</form>
			</div>
		</>
	);
}
