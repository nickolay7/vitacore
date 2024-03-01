import React, {FC, useEffect, useState} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface StudentChartProps {
  data: { name: string; students: number }[];
}

const StudentChart: FC<StudentChartProps> = ({ data }) => {
    const [width, setWidth] = useState(730);


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
    <BarChart width={width} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="students" fill="#8884d8" />
    </BarChart>
  );
};

export default React.memo(StudentChart);
