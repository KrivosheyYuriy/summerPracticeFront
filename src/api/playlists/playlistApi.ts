import {Playlist} from "./Playlist";
import axios from "axios";

const path = `${import.meta.env.VITE_API_URL}/api/playlists`;

export const getPlaylist= async (): Promise<Playlist[]> => {
    const response = await axios.get(path);
    return response.data
}

export const getPlaylistById = async (id: number): Promise<Playlist> => {
    const response = await axios.get(`${path}/${id}`);
    return response.data
}

export const addPlaylist = async (playlist: Playlist): Promise<Playlist> => {
    const response = await axios.post(path, playlist);
    return response.data
}

export const updatePlaylist = async (id: number, playlist: Playlist): Promise<Playlist> => {
    const response = await axios.put(`${path}/${id}`, playlist);
    return response.data
}

export const deletePlaylist = async (id: number) => {
    const response = await axios.delete(`${path}/${id}`);
    return response.data
}