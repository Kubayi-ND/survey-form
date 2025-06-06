'use client';
import { useState } from 'react';

export default function HomePage() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    age: '',
    date: '',
    favouriteFood: [],
    eatOut: '',
    watchMovies: '',
    watchTV: '',
    listenRadio: '',
  });

  const handleCheckbox = (food) => {
    setForm(prev => ({
      ...prev,
      favouriteFood: prev.favouriteFood.includes(food)
        ? prev.favouriteFood.filter(f => f !== food)
        : [...prev.favouriteFood, food]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || 'Error occurred');
  };

  return (
    <main className="p-8 w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-20">
         <div>
          <h3>Personal Details :</h3>
         </div>

         <div>
          <label htmlFor='fullname'>Full Names</label>
          <input name="fullname" onChange={handleChange} className="block min-w-[250px] border border-blue-400 rounded-md p-1 mb-2 " required />
          <label htmlFor='email'>Email</label>
          <input name="email" type="email" onChange={handleChange} className="block min-w-[250px] border border-blue-400 rounded-md p-1  mb-2" required />
          <label htmlFor='dateofbirth'>Date of Birth</label>
          <input name="dateofbirth" type="date" onChange={handleChange} className="block min-w-[250px] border border-blue-400 rounded-md p-1  mb-2" required />
          <label htmlFor='contact'>Contact Details</label>
          <input name="contact"  maxlength="13" onChange={handleChange} className="block min-w-[250px] border border-blue-400 rounded-md p-1  mb-2" required />

          </div> 
        </div>
        
        <div className='flex gap-22'>
          <p className="font-medium">Favourite Food:</p>
          {['Pizza', 'Pasta', 'Pap and Wors', 'Other'].map(food => (
            <label key={food} className="block">
              <input type="checkbox" onChange={() => handleCheckbox(food)} /> {food}
            </label>
          ))}
        </div>
        <table className="border-collapse border border-gray-400 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-400 px-2 py-1 font-medium capitalize">
                  Question
                </th>
                {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map(n => (
                  <th key={n} className="border border-gray-400 px-2 py-1 text-center w-40">{n}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['I like to watch movies', 'I like to listen to radio', 'I like to eat out', 'I like to watch TV'].map(question => (
                <tr key={question}>
                  <td className="border border-gray-400 px-2 w-60 ">{question}</td>
                  {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map((rating, index) => (
                    <td key={rating} className="border border-gray-400 px-2 text-center">
                      <input
                        type="radio"
                        name={question}
                        value={5 - index}
                        onChange={handleChange}
                        required
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>          </table>


        <div className="flex justify-center mt-6">
          <button type="submit" className="bg-blue-400 text-white px-6 py-2 w-36 rounded hover:bg-blue-500 transition-colors">Submit</button>
        </div>
      </form>
    </main>
  );
}
