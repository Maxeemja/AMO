import { useFormik } from 'formik';
import { useState } from 'react';
import taskImg from '../../assets/lab1/task3.png';
import schema from '../../assets/lab1/schema3.png';
import { Solution } from './Solution';
export const Alg3 = () => {
	const [result, setResult] = useState();

	const formik = useFormik({
		initialValues: {
			a: '',
			b: '',
			p: ''
		},
		onSubmit: ({ a, b, p }) => {
			if (!a || !b || !p) return alert('Не всі дані введені!');
			if(a + b < 0) return alert('сума а та b повинна бути більшою за нуль')
			if (p <= 0) {
				formik.resetForm();
				return alert('р не може бути від`ємним!');
			}
			let summ = 0;
			for (let i = 1; i < p; i++) {
				for (let j = 1; j < p; j++) {
					for (let k = 1; k < p; k++) {
						summ += i * (i * j * (i * j * k * Math.sqrt(a + b)));
					}
				}
			}
			setResult(summ.toFixed(3));
			formik.resetForm();
		}
	});

	return <Solution taskImg={taskImg} formik={formik} result={result} schema={schema} />;
};
