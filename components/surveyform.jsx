'use client';
import { useState } from 'react';
import supabase from '../lib/supabase';

export default function HomePage() {  const [form, setForm] = useState({
    fullname: '',
    email: '',
    dateofbirth: '',
    contact: '',
    favouriteFood: [],
    eat_out_rating: '', // I like to eat out
    watch_movies_rating: '', // I like to watch movies  
    watch_tv_rating: '', // I like to watch TV
    listen_radio_rating: '', // I like to listen to radio
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  // Rating scale mapping
  const ratingScale = {
    '5': 'Strongly Agree',
    '4': 'Agree', 
    '3': 'Neutral',
    '2': 'Disagree',
    '1': 'Strongly Disagree'
  };
  // Helper function to get rating text from numeric value
  const getRatingText = (value) => {
    return ratingScale[value] || 'Unknown';
  };  // Function to get a complete summary of form responses with readable labels
  const getFormSummary = () => {
    const questions = [
      { key: 'eat_out_rating', label: 'I like to eat out' },
      { key: 'watch_movies_rating', label: 'I like to watch movies' },
      { key: 'watch_tv_rating', label: 'I like to watch TV' },
      { key: 'listen_radio_rating', label: 'I like to listen to radio' }
    ];
    const summary = {      personalDetails: {
        fullname: form.fullname,
        email: form.email,
        dateofbirth: form.dateofbirth,
        contact: form.contact
      },
      favouriteFood: form.favouriteFood,
      ratings: {}
    };

    questions.forEach(question => {
      summary.ratings[question.label] = {
        numericValue: form[question.key],
        textLabel: form[question.key] ? getRatingText(form[question.key]) : 'Not selected'
      };
    });

    return summary;
  };

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
  };  const handleRadioChange = (questionKey, questionLabel, value, ratingText) => {
    
    setForm(prev => ({ ...prev, [questionKey]: value }));
    
    // Optional: You can also trigger additional actions here
    // For example, real-time validation, analytics tracking, etc.
  };const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      // Submit data directly to Supabase
      const { data, error } = await supabase
        .from('tbl_surveys')
        .insert([form]);
      
      if (error) {
        console.error('Supabase error:', error);
        setSubmitMessage({
          type: 'error',
          text: `Error submitting survey: ${error.message}`
        });
      } else {
        console.log('Survey submitted successfully:', data);        setSubmitMessage({
          type: 'success',
          text: 'Survey submitted successfully! Thank you for your response.'
        });          // Reset form after successful submission
        setForm({
          fullname: '',
          email: '',
          dateofbirth: '',
          contact: '',
          favouriteFood: [],
          eat_out_rating: '',
          watch_movies_rating: '',
          watch_tv_rating: '',
          listen_radio_rating: '',
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmitMessage({
        type: 'error',
        text: `Unexpected error: ${err.message}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-8 w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-20">
         <div>
          <h3>Personal Details :</h3>
         </div>         <div>
          <label htmlFor='fullname'>Full Names</label>
          <input 
            name="fullname" 
            value={form.fullname}
            onChange={handleChange} 
            className="block min-w-[250px] border border-blue-400 rounded-md p-1 mb-2" 
            required 
          />
          <label htmlFor='email'>Email</label>
          <input 
            name="email" 
            type="email" 
            value={form.email}
            onChange={handleChange} 
            className="block min-w-[250px] border border-blue-400 rounded-md p-1 mb-2" 
            required 
          />
          <label htmlFor='dateofbirth'>Date of Birth</label>
          <input 
            name="dateofbirth" 
            type="date" 
            value={form.dateofbirth}
            onChange={handleChange} 
            className="block min-w-[250px] border border-blue-400 rounded-md p-1 mb-2" 
            required 
          />          <label htmlFor='contact'>Contact Details</label>
          <input 
            name="contact" 
            maxLength="13" 
            value={form.contact}
            onChange={handleChange} 
            className="block min-w-[250px] border border-blue-400 rounded-md p-1 mb-2" 
            required 
          />
          </div>
        </div>
          <div className='flex gap-22'>
          <p className="font-medium">Favourite Food:</p>
          {['Pizza', 'Pasta', 'Pap and Wors', 'Other'].map(food => (
            <label key={food} className="block">
              <input 
                type="checkbox" 
                checked={form.favouriteFood.includes(food)}
                onChange={() => handleCheckbox(food)} 
              /> {food}
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
            </thead>            <tbody>              {[
                { key: 'watch_movies_rating', label: 'I like to watch movies' },
                { key: 'listen_radio_rating', label: 'I like to listen to radio' },
                { key: 'eat_out_rating', label: 'I like to eat out' },
                { key: 'watch_tv_rating', label: 'I like to watch TV' }
              ].map(question => (
                <tr key={question.key}>
                  <td className="border border-gray-400 px-2 w-60 ">{question.label}</td>
                  {["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"].map((rating, index) => (
                    <td key={rating} className="border border-gray-400 px-2 text-center">
                      <input
                        type="radio"
                        name={question.key}
                        value={5 - index}
                        checked={form[question.key] === String(5 - index)}
                        onChange={() => handleRadioChange(question.key, question.label, String(5 - index), rating)}
                        required
                      />
                    </td>
                  ))}
                </tr>
              ))}</tbody>          
          </table>
          <div className="flex justify-center gap-4 mt-6">
       
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-6 py-2 w-36 rounded transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-400 hover:bg-blue-500'
            } text-white`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        
        {submitMessage && (
          <div className={`mt-4 p-4 rounded-md text-center ${
            submitMessage.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {submitMessage.text}
          </div>
        )}
      </form>
    </main>
  );
}
