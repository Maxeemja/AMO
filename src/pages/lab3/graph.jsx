import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import { sinX, variant } from './utils';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';
export default function Graph({ formula }) {
	const [arr, setArr] = useState([]);
	const [interpArr, setInterpArr] = useState([]);
	const handleFile = (e) => {
		formik.handleChange(e);
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target.result;
			const inp = text.split(' ');
			formik.setFieldValue(formula === 'sin' ? 'a' : 'a1', +inp[0]);
			formik.setFieldValue(formula === 'sin' ? 'b' : 'b1', +inp[1]);
			formik.setFieldValue(formula === 'sin' ? 'n' : 'n1', +inp[2]);
		};
		reader.readAsText(e.target.files[0]);
	};
	const formik = useFormik({
		initialValues: {
			a: '',
			a1: '',
			b: '',
			b1: '',
			n: '',
			n1: '',
			fileInput: '',
			fileInput1: ''
		},
		onSubmit: ({ a, a1, b1, n1, b, n }) => {
			if (formula === 'sin') {
				if (n <= 0 || n > 25) return alert('Неправильне значення n');
				const [sin_arr, interp_sin_arr] = sinX(a, b, n);

				setArr(sin_arr);
				setInterpArr(interp_sin_arr);
			} else {
				if (n1 <= 0 || n1 > 25) return alert('Неправильне значення n');
				const [var_arr, interp_var_arr] = variant(a1, b1, n1);
				setArr(var_arr);
				setInterpArr(interp_var_arr);
			}
			formik.resetForm();
		}
	});
	return (
		<>
			<form className='mt-5' onSubmit={formik.handleSubmit}>
				<div className='flex flex-col justify-center gap-5 items-center'>
					<div className='flex justify-between gap-5'>
						<TextField
							id={formula === 'sin' ? 'a' : 'a1'}
							fullWidth
							label={`Введіть число а`}
							type='number'
							value={formula === 'sin' ? formik.values.a : formik.values.a1}
							onChange={formik.handleChange}
						/>
						<TextField
							id={formula === 'sin' ? 'b' : 'b1'}
							fullWidth
							label={`Введіть число b`}
							type='number'
							value={formula === 'sin' ? formik.values.b : formik.values.b1}
							onChange={formik.handleChange}
						/>
						<TextField
							id={formula === 'sin' ? 'n' : 'n1'}
							fullWidth
							label={`Введіть число n`}
							type='number'
							value={formula === 'sin' ? formik.values.n : formik.values.n1}
							onChange={formik.handleChange}
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
								value={formula === 'sin' ? formik.values.fileInput : formik.values.fileInput1}
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
				<div className='flex justify-center mt-4'>
					<XYPlot width={450} height={450}>
						<XAxis />
						<YAxis />
						<LineSeries data={arr} color='red' />
						<LineSeries data={interpArr} color='green' />
					</XYPlot>
				</div>
			) : null}
		</>
	);
}
