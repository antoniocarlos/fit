import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const CaloriesCalcForm: React.FC = () => {

  const genders = {
    male: 'masculino',
    female: 'feminino',
  }

  const metabolicConstants: [string, GLfloat][] = [
    ['Sedentários', 1.2],
    ['1 a 3 dias por semana', 1.375],
    ['3 a 5 dias por semana', 1.55],
    ['6 a 7 dias por semana', 1.725],
    ['atletas', 1.9]
  ];

  const formSchema = z.object({
    weight: z.string().min(1, 'informe eu peso em quilos').max(300).refine((value) => {
      const parsedValue = parseFloat(value);
      return parsedValue > 0 && parsedValue < 300;
    }, 'informe um peso válido'),
    height: z.number().min(1, 'informe sua altura em centímetros').max(300),
    age: z.number().min(1, 'informe sua idade em anos').max(120),
    metabolicConstant: z.string(),
    gender: z.string(),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: '',
      height: 0,
      age: 0,
      metabolicConstant: `${metabolicConstants[0][1]}`,
      gender: '',
    }
  });

  console.log(formState.errors);

  type FormData = z.infer<typeof formSchema>;

  const [calories, setCalories] = useState(0);

  const calc = ({ weight, age, height, gender, metabolicConstant }: { weight: number, age: number, height: number, gender: string, metabolicConstant: number }) => {
    if (gender === genders.male) {
      return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) * metabolicConstant
    } else {
      return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)) * metabolicConstant
    }
  }

  const handleCalc = (data: FormData) => {
    console.log('test', data);
    setCalories(calc({ weight: parseFloat(data.weight), height: data.height, age: data.age, gender: data.gender, metabolicConstant: parseFloat(data.metabolicConstant) }));
  }

  return (
    <div>
      <p>
        {calories}
      </p>
      <form onSubmit={handleSubmit(handleCalc)}>
        <label htmlFor="weight">Peso</label>
        <input
          type="text"
          id="weight"
          {...register('weight', {
            pattern: /^([1-9]\d*)(\.\d+)?$/
          })}
        />
        <label htmlFor="age">Idade</label>
        <input
          type="number"
          id="age"
          {...register('age', { valueAsNumber: true })}
        />
        <label htmlFor="height">Altura</label>
        <input
          type="number"
          id="height"
          {...register('height', { valueAsNumber: true })}
        />
        <label htmlFor="metabolicConstant">Nível de atividade</label>
        <select
          id="metabolicConstant"
          {...register('metabolicConstant')}
        >
          {metabolicConstants.map((value, index) => (
            <option key={index} value={`${value[1]}`}>{value[0]}</option>
          ))}
        </select>
        <label htmlFor="gender">Género</label>
        <select
          id="gender"
          {...register("gender")}
        >
          <option key={'male'} value={genders.male}>Masculino</option>
          <option key={'female'} value={genders.female}>Feminino</option>
        </select>
        <button type="submit">Calcular</button>
      </form>
    </div>
  );
};

export default CaloriesCalcForm;
