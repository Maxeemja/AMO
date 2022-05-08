import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import { variant } from './utils';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
export default function Graph({ formula }) {
	const [arr, setArr] = useState([]);
	const [interpArr, setInterpArr] = useState([]);
	const [errArr, setErrArr] = useState([]);
	const handleFile = (e) => {
		formik.handleChange(e);
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target.result.split(' ');
			const res = Object.keys(formik.values)
				.filter((k, i) => (formula === 'sin' ? i % 2 === 0 : i % 2 > 0))
				.map((key, i) => {
					return Object.fromEntries([[key, text[i]]]);
				});
			formik.setValues(Object.assign(...res));
		};
		reader.readAsText(e.target.files[0]);
		document.forms[0].fileInput.value = '';
		// document.forms[0].fileInput1.value = '';
	};
	const formik = useFormik({
		initialValues: {
			a: '',
			a1: '',
			b: '',
			b1: '',
			n: '',
			n1: ''
		},
		onSubmit: ({ a, a1, b1, n1, b, n }) => {
			if ((!a || !b || !n) && (!a1 || !b1 || !n1)) return alert('Ви ввели не всі дані!')
			if (a > b || a1 > b1) return alert('Неправильно задані границі!');
			if ([n, n1].filter((el) => el && (el > 25 || el <= 0)).length) return alert('Неправильне значення n');
			const [arrr, interp_arr, err_arr] = variant(formula === 'sin' ? [a, b, n, 'sin'] : [a1, b1, n1, 'var']);
			setArr(arrr);
			setInterpArr(interp_arr);
			setErrArr(err_arr);
			formik.resetForm();
		}
	});
	return (
		<>
			<form className='mt-5' onSubmit={formik.handleSubmit}>
				<div className='flex flex-col justify-center gap-5 items-center'>
					<div className='flex justify-between gap-5'>
						<TextField
							label={`Введіть число а`}
							type='number'
							{...formik.getFieldProps(formula === 'sin' ? 'a' : 'a1')}
						/>
						<TextField
							label={`Введіть число b`}
							type='number'
							{...formik.getFieldProps(formula === 'sin' ? 'b' : 'b1')}
						/>
						<TextField
							label={`Введіть число n`}
							type='number'
							{...formik.getFieldProps(formula === 'sin' ? 'n' : 'n1')}
						/>
					</div>
					<p>або</p>
					<Button variant='contained' color='info'>
						<label htmlFor={formula === 'sin' ? 'fileInput' : 'fileInput1'}>
							Виберіть файл
							<input
								type='file'
								accept='.txt'
								id={formula === 'sin' ? 'fileInput' : 'fileInput1'}
								onChange={handleFile}
								placeholder='Виберіть файл...'
								hidden
							/>
						</label>
					</Button>
					<Button variant='contained' color='success' type='submit'>
						Інтерполювати!
					</Button>
				</div>
			</form>
			{arr.length ? (
				<div className='flex justify-center mt-4 gap-[50px]'>
					<div>
						<p>Графік інтерполяції</p>
						<XYPlot width={450} height={450}>
							<XAxis on0 />
							<YAxis />
							<LineSeries data={arr} color='red' />
							<LineSeries data={interpArr} color='green' />
						</XYPlot>
					</div>
					<div>
						<p>Графік похибки</p>
						<XYPlot width={450} height={450}>
							<XAxis on0 />
							<YAxis />
							<LineSeries data={errArr} color='blue' />
						</XYPlot>
					</div>
				</div>
			) : null}
		</>
	);
}
