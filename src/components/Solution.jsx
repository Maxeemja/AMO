import { Button, TextField } from '@mui/material';

export const Solution = ({ taskImg, schema, result, formik }) => {
	return (
		<div className='flex justify-between gap-10'>
			<div className=''>
				<p className='font-semibold mb-3'>Варіант завдання:</p>
				<img src={taskImg} alt='' />
			</div>

			<form className='flex gap-10' onSubmit={formik.handleSubmit}>
				<div className='flex flex-col gap-5 justify-center'>
					<h2 className='text-center my-4 text-xl'>Задайте значення</h2>
					{Object.entries(formik.values).map(([key, value]) => {
						console.log(key, value);
						return (
							<TextField
								fullWidth
								id={key}
                key={key}
								name={key}
								label={`Введіть ${key}`}
								type='number'
								value={value}
								onChange={formik.handleChange}
							/>
						);
					})}
				</div>
				<div className='flex flex-col justify-center items-center'>
					<p className='text-center font-bold mb-3'>{result}</p>
					<Button color='primary' variant='contained' fullWidth type='submit'>
						Результат!
					</Button>
				</div>
			</form>
			<div className='max-w-xl'>
				<p>Блок-схема</p>
				<img className='object-cover' src={schema} alt='' />
			</div>
		</div>
	);
};
