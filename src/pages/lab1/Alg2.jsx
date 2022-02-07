import { useFormik } from 'formik';
import { useState } from 'react';
import taskImg from '../../assets/lab1/task2.png';
import { Solution } from '../../components/Solution';
export const Alg2 = () => {
	const [result, setResult] = useState();
	const formik = useFormik({
		initialValues: {
			a: '',
			b: '',
			c: '',
			k: ''
		},
		onSubmit: ({ a, b, c, k }) => {
			if (k < 10) {
				setResult();
			} else {
				formik.resetForm();
				
			}
		}
	});

	return <Solution taskImg={taskImg} formik={formik} result={result} />;
};
