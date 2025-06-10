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
    <div className="p-6 w-[80%] mx-auto">      {/* Overview Statistics */}
      <div className="p-6 mb-6">
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Total number of surveys :</span>
            <span className="font-semibold">{data.total}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Average Age :</span>
            <span className="font-semibold">{data.averageAge}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Oldest person who Participated in survey :</span>
            <span className="font-semibold">{data.oldest}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Youngest person who Participated in survey :</span>
            <span className="font-semibold">{data.youngest}</span>
          </div>
        </div>
      </div>      {/* Favorite Foods */}
      <div className="p-6 mb-6">
        <div className="space-y-2">
          {data.foodCounts && Object.entries(data.foodCounts).map(([food, stats]) => (
            <div key={food} className="flex justify-between text-gray-700">
              <span>Percentage of people who like {food} :</span>
              <span className="font-semibold">{stats.percentage}%</span>
            </div>
          ))}
        </div>
      </div>      {/* Rating Questions */}
      <div className="p-6">
        <div className="space-y-3">
          {data.ratingsData && Object.entries(data.ratingsData).map(([question, average]) => (
            <div key={question} className="flex justify-between text-gray-700">
              <span className="font-medium">People who {question} :</span>
              <span className="font-semibold">{average}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
