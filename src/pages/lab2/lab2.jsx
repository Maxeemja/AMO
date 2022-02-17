import { LabHeader } from '../../components/LabHeader';
import { useFormik } from 'formik';
import { useState } from 'react';
import taskImg from '../../assets/lab2/taskImg.png';
import schema from '../../assets/lab2/schema.png';
import { BubbleSort } from './boostedBubbleSort';
import { Button, Input, TextField } from '@mui/material';

export const Lab2 = () => {
	const [result, setResult] = useState();
	const handleFile = (e) => {
		formik.handleChange(e);
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target) {
				console.log(e.target);
			}
			const text = e.target.result;
			formik.setFieldValue('input', text);
		};
		reader.readAsText(e.target.files[0]);
		setResult(null);
	};
	const formik = useFormik({
		initialValues: {
			input: '',
			fileInput: ''
		},
		onSubmit: ({ input }) => {
			console.log(input);
			if (!input.length) {
				setResult(null);
				return alert('Ви не ввели дані!');
			}
			if (input.match(/[a-z]/g)) {
				formik.resetForm();
				setResult(null);
				return alert('Ви можете вводити лише цифри!');
			}
			if (input.includes(',')) {
				setResult(BubbleSort(input.split(',')));
			} else {
				setResult(BubbleSort(input.split(' ')));
			}
		}
	});
	return (
		<div>
			<LabHeader num='2' topic='Обчислювальна складність алгоритмів сортування' />
			<strong className='my-5 text-left text-lg'>
				Різновид прискореного сортування з початку до кінця
			</strong>
			<hr className='my-4' />
			<div className='flex justify-between gap-8'>
				<div className='w-2/5 flex flex-col gap-5'>
					<div className=''>
						<p className='mb-3'>Завдання за варіантом:</p>
						<img src={taskImg} alt='' />
					</div>
					<div className=''>
						<p className='mb-3'>Блок-схема:</p>
						<img className='mx-auto' src={schema} alt='' />
					</div>
				</div>
				<div className='w-3/5'>
					<form onSubmit={formik.handleSubmit}>
						<div className='flex flex-col justify-center gap-5 items-center'>
							<TextField
								id='input'
								fullWidth
								label={`Введіть масив чисел через пробіл або кому`}
								type='text'
								value={formik.values.input}
								onChange={formik.handleChange}
							/>
							<p>або</p>
							<Button variant='contained' color='info'>
								<label htmlFor='fileInput'>
									Виберіть файл
									<input
										type='file'
										accept='.txt'
										id='fileInput'
										value={formik.values.fileInput}
										onChange={handleFile}
										placeholder='Виберіть файл...'
										hidden
									/>
								</label>
							</Button>

							<Button variant='contained' color='success' type='submit'>
								Результат!
							</Button>
							<div className=''>Вивід відсортованого масиву:</div>
							<p className={`p-3 w-full rounded text-center ${result ? 'bg-violet-200' : ''}`}>
								{result}
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
