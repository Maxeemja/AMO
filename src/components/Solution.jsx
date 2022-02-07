import { Button, TextField } from '@mui/material';

export const Solution = ({ taskImg, schema, result, formik }) => {
	return (
		<div className='grid grid-cols-3 gap-5'>
			<div className='flex flex-col items-center'>
				<p className='font-semibold mb-3'>Варіант завдання:</p>
				<img className='object-cover' src={taskImg} alt='' />
			</div>

			<form className='flex flex-col gap-10 ' onSubmit={formik.handleSubmit}>
				<div className=''>
					<h2 className='text-center my-5 text-xl'>Задайте значення</h2>
					<div className='flex flex-col justify-between items-center gap-5'>
						<div className='flex flex-col justify-center gap-5 items-center'>
							{Object.entries(formik.values).map(([key, value]) => {
								return (
									<TextField
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
					</div>
				</div>
			</form>
			<div className=''>
				<p>Блок-схема</p>
				<img className='object-cover' src={schema} alt='' />
			</div>
		</div>
	);
};
