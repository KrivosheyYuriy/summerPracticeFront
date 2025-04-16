import {Album} from "./Album";
import axios from "axios";

const path = `${import.meta.env.VITE_API_URL}/api/albums`;

export const getAlbum= async (): Promise<Album[]> => {
    const response = await axios.get(path);
    return response.data
}

export const getAlbumById = async (id: number): Promise<Album> => {
    const response = await axios.get(`${path}/${id}`);
    return response.data
}

export const addAlbum = async (album: Album): Promise<Album> => {
    const response = await axios.post(path, album);
    return response.data
}

export const updateAlbum = async (id: number, album: Album): Promise<Album> => {
    const response = await axios.put(`${path}/${id}`, album);
    return response.data
}

export const deleteAlbum = async (id: number) => {
    const response = await axios.delete(`${path}/${id}`);
    return response.data
}