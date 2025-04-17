import {Composer} from "./Composer";
import axios from "axios";

const path = `${import.meta.env.VITE_API_URL}/api/composers`;

export const getComposer= async (): Promise<Composer[]> => {
    const response = await axios.get(path);
    return response.data
}

export const getComposerById = async (id: number): Promise<Composer> => {
    const response = await axios.get(`${path}/${id}`);
    return response.data
}

export const addComposer = async (composer: Composer): Promise<Composer> => {
    const response = await axios.post(path, composer);
    return response.data
}

export const updateComposer = async (id: number, composer: Composer): Promise<Composer> => {
    const response = await axios.put(`${path}/${id}`,
        composer);
    return response.data
}

export const deleteComposer = async (id: number): Promise<void> => {
    await axios.delete(`${path}/${id}`);
}