import { useFormik } from 'formik';
import { useState } from 'react';
import taskImg from '../../assets/lab1/task2.png';
import schema from '../../assets/lab1/schema2.png';
import { Solution } from './Solution';
export const Alg2 = () => {
	const [result, setResult] = useState();
	const formik = useFormik({
		initialValues: {
			a: '',
			c: '',
			k: ''
		},
		onSubmit: ({ a, c, k }) => {
			if (!a || !c || !k) return alert('Не всі дані введені!');
			if (k < 10) {
				formik.resetForm();
				setResult((Math.pow(a + c, 4) + Math.pow(a - c, 2)).toFixed(3));
			} else {
				formik.resetForm();
				setResult((Math.pow(a - c, 3) + Math.pow(a + c, 2)).toFixed(3));
			}
		}
	});

	return <Solution taskImg={taskImg} formik={formik} result={result} schema={schema} />;
};
