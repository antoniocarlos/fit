import React, { useState } from 'react';

const CaloriesCalcForm: React.FC = () => {

  enum genderTypes {
    unSet = '',
    male = 'masculino',
    female = 'feminino',
  }

  const metabolicConstants: [string, number][] = [
    ['Sedentários', 1.2],
    ['1 a 3 dias por semana', 1.375],
    ['3 a 5 dias por semana', 1.55],
    ['6 a 7 dias por semana', 1.725],
    ['atletas', 1.9]
  ];

  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [age, setAge] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [metabolicConstant, setMetabolicConstant] = useState(metabolicConstants[0][1]);
  const [gender, setGender] = useState(genderTypes.unSet);
  const [calories, setCalories] = useState(0);

  const calc = ({ weight, age, height, gender, metabolicConstant }: { weight: number, age: number, height: number, gender: genderTypes, metabolicConstant: number }) => {
    if (gender === genderTypes.male) {
      return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) * metabolicConstant
    } else {
      return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)) * metabolicConstant
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // calc({ weight, age, height, gender, metabolicConstant });
  }

  return (
    <div>
      <h1>CaloriesCalcForm</h1>
      <p>
        {calories}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="weight">Peso</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <label htmlFor="age">Idade</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <label htmlFor="height">Altura</label>
        <input
          type="number"
          id="height"
          name="height"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
        <label htmlFor="metabolicConstant">Nível de atividade</label>
        <select
          id="metabolicConstant"
          name="metabolicConstant"
          onChange={(e) => setMetabolicConstant(Number(e.target.value))}
        >
          {metabolicConstants.map((value, index) => (
            <option key={index} value={value[1]}>{value[0]}</option>
          ))}
        </select>
        <label htmlFor="gender">Gênero</label>
        <select
          id="gender"
          name="gender"
          onChange={(e) => setGender(e.target.value as genderTypes)}
        >
          <option key={'male'} value={genderTypes.male}>Masculino</option>
          <option key={'female'} value={genderTypes.female}>Feminino</option>
        </select>
        <button type="submit">Calcular</button>
      </form>
    </div>
  );
};

export default CaloriesCalcForm;
