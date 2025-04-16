import {Track} from "./Track";
import axios from "axios";

const path = `${import.meta.env.VITE_API_URL}/api/tracks`;

export const getTrack= async (): Promise<Track[]> => {
    const response = await axios.get(path);
    return response.data
}

export const getTrackById = async (id: number): Promise<Track> => {
    const response = await axios.get(`${path}/${id}`);
    return response.data
}

export const addTrack = async (track: Track): Promise<Track> => {
    const response = await axios.post(path, track);
    return response.data
}

export const updateTrack = async (id: number, track: Track): Promise<Track> => {
    const response = await axios.put(`${path}/${id}`, track);
    return response.data
}

export const deleteTrack = async (id: number) => {
    const response = await axios.delete(`${path}/${id}`);
    return response.data
}