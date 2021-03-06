import { useFormik } from 'formik';
import { useState } from 'react';
import { LabHeader } from '../../components/LabHeader';
import { TextField, Button } from '@mui/material';
import {
	XYPlot,
	XAxis,
	YAxis,
	LineSeries,
	MarkSeries,
	HorizontalGridLines,
	VerticalGridLines
} from 'react-vis';
import { getResult, draw_graph } from './calculating';
import taskImg from '../../assets/lab4/taskImg.png';
export default function Lab4() {
	const [data, setData] = useState([]);
	const [tangent, setTangent] = useState([]);
	const [result, setResult] = useState({});
	const handleFile = (e) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const text = e.target.result.split(' ');
			let res = Object.keys(formik.values).map((k, i) => {
				return Object.fromEntries([[k, text[i]]]);
			});
			formik.setValues(Object.assign(...res));
		};
		reader.readAsText(e.target.files[0]);
		document.forms[0].fileInput.value = '';
	};
	const formik = useFormik({
		initialValues: {
			a: '',
			b: '',
			e: ''
		},
		onSubmit: ({ a, b, e }) => {
			if (!a || !b || !e) return alert('Не всі дані введені!');
			if (a < 0 || b < 0 || e < 0) return alert('Дані не можуть бути менше 0!');
			if (e.indexOf(',') !== -1) return alert('Введіть точність через крапку');
			const [count, x] = getResult(a, b, e);
			const [dataArr, tangentArr] = draw_graph();
			setData(dataArr);
			setTangent(tangentArr);
			setResult({ x, count });
			formik.resetForm();
		}
	});
	return (
		<>
			<LabHeader num='4'>Розв’язання нелінійних рівнянь на комп’ютері</LabHeader>
			<hr className='my-4' />
			<div className='flex flex-col gap-8 items-center'>
				<div className='flex flex-col gap-4 items-center'>
					<p className='mb-3 text-lg'>Завдання за варіантом:</p>
					<img src={taskImg} alt='' className='' />
				</div>
				<form className='mt-5' onSubmit={formik.handleSubmit}>
					<div className='flex flex-col justify-center gap-5 items-center'>
						<div className='flex justify-between gap-5'>
							<TextField label={`Введіть число а`} type='number' {...formik.getFieldProps('a')} />
							<TextField label={`Введіть число b`} type='number' {...formik.getFieldProps('b')} />
							<TextField label={`Введіть число e`} type='text' {...formik.getFieldProps('e')} />
						</div>
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
						<Button variant='contained' color='success' type='submit'>
							Результат!
						</Button>
						<hr className='bg-black w-full' />
						{result.x ? (
							<div className='text-lg'>
								х = {result.x.toFixed(3)} <br />
								Кількість ітерацій: {result.count}
							</div>
						) : null}
					</div>
				</form>
				{data.length ? (
					<div className='flex justify-center mt-4'>
						<XYPlot width={450} height={450}>
							<XAxis />
							<YAxis />
							<HorizontalGridLines />
							<VerticalGridLines />
							<LineSeries data={data} color='red' style={{ strokeLinejoin: 'round' }} />
							<MarkSeries data={tangent} color='green' style={{ fontSize: 'bold' }} />
						</XYPlot>
					</div>
				) : null}
			</div>
		</>
	);
}
