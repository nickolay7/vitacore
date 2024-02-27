import React, { useEffect, useState } from 'react';
import { Student } from '../types';
import StudentPage from './pages/studentPage/StudentPage';

function App() {
  const [studentsData, setStudentsData] = useState<Student[]>([]);

  useEffect(() => {
    fetch('https://hp-api.onrender.com/api/characters')
      .then((res) => res.json())
      .then((res) => setStudentsData(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <StudentPage studentsData={studentsData} />
    </div>
  );
}

export default App;
