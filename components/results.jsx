'use client';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/results')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch results');
        }
        return res.json();
      })
      .then(setData)
      .catch(err => {
        console.error('Error fetching results:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading results: {error}
        </div>
      </div>
    );
  }

  if (!data) return <p className="p-4 text-center">Loading...</p>;
  
  if (data.total === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-600">No surveys have been submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 w-full mx-auto">      {/* Overview Statistics */}
      <div className=" p-6 mb-6">
        <ul className="space-y-2">
          <li className="text-gray-700">
            <span>Total number of surveys : {data.total}</span> 
          </li>
          <li className="text-gray-700">
            <span>Average Age : {data.averageAge}</span> 
          </li>
          <li className="text-gray-700">
            <span>Oldest person who Participanted in survey : {data.oldest}</span> 
          </li>
          <li className="text-gray-700">
            <span>Youngest person who Participanted in survey : {data.youngest}</span> 
          </li>
        </ul>
      </div>      {/* Favorite Foods */}
      <div className=" p-6 mb-6">
        <ul className="space-y-2">
          {data.foodCounts && Object.entries(data.foodCounts).map(([food, stats]) => (
            <li key={food} className="text-gray-700">
              <span>Percentage of people who like {food} : {stats.percentage}% {food}</span>  
            </li>
          ))}
        </ul>
      </div>      {/* Rating Questions */}
      <div className=" p-6">
        <ul className="space-y-3">
          {data.ratingsData && Object.entries(data.ratingsData).map(([question, average]) => (
            <li key={question} className="text-gray-700">
              <span className="font-medium">{question}:</span>
              <span className="ml-2  px-2 py-1 text-sm font-medium">
                {average}
              </span>
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
