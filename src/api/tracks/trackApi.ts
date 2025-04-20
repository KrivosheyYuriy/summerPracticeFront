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

export const addTrack = async (track: Track, audio: File): Promise<Track> => {
    const formData = new FormData();
    console.log(track);
    formData.append("track", new Blob([JSON.stringify(track)], {type: "application/json"}));
    formData.append("audioFile", audio);
    try {
        const response = await axios.post(path, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        return response.data
    }
    catch (error) {
        console.error('Error adding track:', error);
        throw error;
    }
}

export const updateTrack = async (id: number, track: Track, audio: File):
    Promise<Track> => {
    const formData = new FormData();

    formData.append("track", new Blob([JSON.stringify(track)], {type: "application/json"}));
    formData.append("audioFile", audio);
    try {
        const response = await axios.put(`${path}/${id}`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

        return response.data
    }
    catch (error) {
        console.error('Error adding track:', error);
        throw error;
    }
}

export const deleteTrack = async (id: number) => {
    const response = await axios.delete(`${path}/${id}`);
    return response.data
}