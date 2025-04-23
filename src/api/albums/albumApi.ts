import {Album} from "./Album";
import axios from "axios";
import {getTrackById} from "../tracks/trackApi.ts";
import {Track} from "../tracks/Track.ts";

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

export const getTracksFromAlbum = async (albumId: number): Promise<Track[]> => {
    try {
        const albumResponse = await axios.get<Album>(`${path}/${albumId}`);
        const album = albumResponse.data;

        if (!album || !album.tracksId) {
            console.warn(`Альбом с ID ${albumId} не найден или не содержит списка ID треков.`);
            return [];
        }

        const trackPromises = album.tracksId.map(trackId => getTrackById(trackId));

        return (await Promise.all(trackPromises)).filter((track): track is Track => track !== null);

    } catch (error) {
        console.error(`Ошибка при получении треков из альбома с ID ${albumId}:`, error);
        return [];
    }
};