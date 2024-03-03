import {Student} from "@/types";

const URL = 'https://hp-api.onrender.com/api/characters';
export const getStudents = async (): Promise<Student[] | undefined> => {
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Something went wrong!');

        return response.json();
    } catch (e) {
        if (e instanceof Error)
            console.error(e.message);
        console.error('Something went wrong!');
    }
}