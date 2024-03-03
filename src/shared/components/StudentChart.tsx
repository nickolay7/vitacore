import React, {useEffect, useState} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartFilter } from "./chartFilter";

export const StudentChart = () => {
    const [width, setWidth] = useState(730);
    const [filteredData, setFilteredData] = useState<
        { houseName: string; students: number }[]
    >([]);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth < 1200 ? 630 : 730);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  return (
      <>
          <ChartFilter filteredDataHandler={setFilteredData}/>
          <BarChart width={width} height={250} data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="houseName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
      </>
  );
};

export default React.memo(StudentChart);
