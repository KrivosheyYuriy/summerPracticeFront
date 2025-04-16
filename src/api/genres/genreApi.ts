import {Genre} from "./Genre";
import axios from "axios";

export const getGenre= async (): Promise<Genre[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/genres`);
    return response.data
}

export const getGenreById = async (id: number): Promise<Genre> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/genres/${id}`);
    return response.data
}