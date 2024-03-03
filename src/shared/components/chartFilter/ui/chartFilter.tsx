import React, {FC, useEffect, useState} from 'react';
import styles from "./styles.module.css";
import DatePicker from "react-datepicker";
import {Student} from "@/types";
import {getStudents} from "../../../api/getStudents";
interface ChartData {
    [house: string]: { houseName: string; students: number };
}

type TransformedChartData = { houseName: string; students: number }[];
interface ChartFilterProps {
    filteredDataHandler: (data: TransformedChartData) => void;
}
export const ChartFilter:FC<ChartFilterProps> = ({ filteredDataHandler }) => {
    const [studentsData, setStudentsData] = useState<Student[]>([]);

    const [startDate, setStartDate] = useState<Date | null>(
        new Date('1970-01-01'),
    );
    const [endDate, setEndDate] = useState<Date | null>(new Date());

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
                    acc[house] = { houseName: house, students: 0 };
                }
                acc[house].students++;
                return acc;
            },
            {},
        );
        filteredDataHandler(Object.values(chartData));
    };

    useEffect(() => {
        getStudents()
            .then((res) => res && setStudentsData(res))
    }, []);

    return (
        <div className={styles.pickers}>
            <div>
                <label>From: </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                />
            </div>
            <div>
                <label>To: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                />
            </div>
            <div>
                <button onClick={handleFilter}>Filter</button>
            </div>
        </div>
    );
}
