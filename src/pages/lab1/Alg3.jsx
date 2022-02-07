import { useFormik } from 'formik';
import { useState } from 'react';
import taskImg from '../../assets/lab1/task3.png';
import schema from '../../assets/lab1/schema2.png';
import { Solution } from '../../components/Solution';
export const Alg3 = () => {
	const [result, setResult] = useState();

	const formik = useFormik({
		initialValues: {
			a: '',
			b: '',
			p: ''
		},
		onSubmit: ({ a, b, p, k }) => {
			let summ = 0;
			for (let i = 1; i < p; i++) {
				for (let j = 1; j < p; j++) {
					for (let k = 1; k < p; k++) {
						summ += i * (i * j * (i * j * k * Math.sqrt(a + b)));
					}
				}
			}
			setResult(summ.toFixed(3));
		}
	});

	return <Solution taskImg={taskImg} formik={formik} result={result} schema={schema} />;
};