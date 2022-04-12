import { LabHeader } from "../../components/LabHeader";
import { Alg1 } from "./Alg1";
import { Alg2 } from "./Alg2";
import { Alg3 } from "./Alg3";

export const Lab1 = () => {
	return (
		<div>
			<LabHeader num="1">Поняття алгоритму. Задавання алгоритмів у вигляді блок-схем</LabHeader>
      <strong className="my-5 text-left text-lg">Лінійний алгоритм</strong>
      <hr  className="my-3"/>
      <Alg1/>
      <strong className="my-5 text-left text-lg">Розгалужений алгоритм</strong>
      <hr  className="my-3"/>
      <Alg2/>
      <strong className="my-5 text-left text-lg">Циклічний алгоритм</strong>
      <hr  className="my-3"/>
      <Alg3/>
		</div>
	);
};
