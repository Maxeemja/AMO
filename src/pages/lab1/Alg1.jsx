import { useFormik } from 'formik';
import { useState } from 'react';
import taskImg from '../../assets/lab1/linear-task.png';
import schema from '../../assets/lab1/schema1.jpg';
import { Solution } from '../../components/Solution';
export const Alg1 = () => {
	const [result, setResult] = useState();
	const formik = useFormik({
		initialValues: {
			a: '',
			b: '',
			c: '',
			d: ''
		},
		onSubmit: ({ a, b, c, d }) => {
			if(!a || !b || !c || !d) return alert('Не всі дані введені!');

			if (a < 0 || b < 0 || c < 0 || d < 0) {
				formik.resetForm();
				return alert('а та b, а також c або d мають бути більшими за нуль');
			}
			formik.resetForm();
			setResult(
				((Math.sqrt(a) + b * b) / (Math.sqrt(b) - a * a) + Math.sqrt((a * b) / (c * d))).toFixed(3)
			);
		}
	});

	return (
		<Solution formik={formik} taskImg={taskImg} schema={schema} result={result} />
	);
};
