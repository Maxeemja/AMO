import { LabHeader } from '../../components/LabHeader';
import Graph from './graph';


export default function Lab3() {
	
	return (
		<>
			<LabHeader num='3'>Інтерполяція функції</LabHeader>
			<hr className='my-4' />
			<div className='flex flex-col gap-5'>
				<div className='text-center'>
					<strong className='my-5 text-xl text-center'>
						Інтерполяція многочленом Ньютона для sin(x)
					</strong>
					<Graph formula="sin"/>
				</div>
				<div className='text-center'>
					<strong className='my-5 text-xl text-center'>
						Інтерполяція многочленом Ньютона для cos(x - e<sup>cos x</sup>)
					</strong>
					<Graph formula="var"/>
				</div>

			</div>
		</>
	);
}
