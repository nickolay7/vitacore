import { FC, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Student } from '../../../types';
import StudentChart from '../../shared/components/StudentChart';
import Alert from '../../shared/components/alert/Alert';
import styles from './styles.module.css';

interface StudentPageProps {
  studentsData: Student[];
}

interface ChartData {
  [key: string]: { name: string; students: number };
}
const StudentPage: FC<StudentPageProps> = ({ studentsData }) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date('1970-01-01'),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [filteredData, setFilteredData] = useState<
    { name: string; students: number }[]
  >([]);

  const handleFilter = () => {
    const studentsFilteredByBirthAndHouse = studentsData
      .filter((student) => {
        const dateOfBirth = new Date(student.dateOfBirth);
        return dateOfBirth >= startDate! && dateOfBirth <= endDate!;
      })
      .filter(
        (student) =>
          student.house === 'Gryffindor' ||
          student.house === 'Slytherin' ||
          student.house === 'Hufflepuff' ||
          student.house === 'Ravenclaw',
      );

    // Преобразование данных для графика
    const chartData = studentsFilteredByBirthAndHouse.reduce(
      (acc: ChartData, student) => {
        const house = student.house;
        if (!acc[house]) {
          acc[house] = { name: house, students: 0 };
        }
        acc[house].students++;
        return acc;
      },
      {},
    );
    // console.log(chartData);
    setFilteredData(Object.values(chartData));
  };

  useEffect(handleFilter, [studentsData]);

  return (
      <>
          <h2>Student Statistics</h2>
          <div className={styles.container}>
              <Alert message="Please choose date range in the date pickers and click button."/>
              <div className={styles.pickers}>
                  <div>
                      <label>From: </label>
                      <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                      />
                  </div>
                  <div>
                      <label>To: </label>
                      <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                      />
                  </div>
                  <div>
                      <button onClick={handleFilter}>Filter</button>
                  </div>
              </div>
              <StudentChart data={Object.values(filteredData)}/>
          </div>
      </>
  );
};

export default StudentPage;
