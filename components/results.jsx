'use client';
import { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/results')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p className="p-4">Loading...</p>;
  if (data.total === 0) return <p className="p-4">No Surveys Available</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Survey Results</h1>
      <ul className="space-y-2">
        <li>Total Surveys: {data.total}</li>
        <li>Average Age: {data.averageAge}</li>
        <li>Oldest: {data.oldest}</li>
        <li>Youngest: {data.youngest}</li>
        <li>% Liking Pizza: {data.pizzaPercentage}%</li>
        <li>Eat Out Avg Rating: {data.eatOutAverage}</li>
      </ul>
    </div>
  );
}
