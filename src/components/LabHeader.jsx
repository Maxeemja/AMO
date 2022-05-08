export const LabHeader = ({num, children}) => {
	return (
		<div className="text-center">
			<h1 className='text-center font-bold text-xl'>Лабораторна робота № {num}</h1>

			<p className='mt-2'>
				<strong>Тема:</strong> "{children}"
			</p>
			<p className='mt-2'>
				<strong>Варіант №10</strong>
			</p>
		</div>
	);
};
