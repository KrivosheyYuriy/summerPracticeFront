import {Playlist} from "./Playlist";
import axios from "axios";
import {Track} from "../tracks/Track.ts";
import {getTrackById} from "../tracks/trackApi.ts";

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

export const getTracksFromPlaylist = async (playlistId: number): Promise<Track[]> => {
    try {
        const playlistResponse = await axios.get<Playlist>(`${path}/${playlistId}`);
        const playlist = playlistResponse.data;

        if (!playlist || !playlist.tracksId) {
            console.warn(`Плейлист с ID ${playlistId} не найден или не содержит списка ID треков.`);
            return [];
        }

        const trackPromises = playlist.tracksId.map(trackId => getTrackById(trackId));

        return (await Promise.all(trackPromises)).filter((track): track is Track => track !== null);

    } catch (error) {
        console.error(`Ошибка при получении треков из альбома с ID ${playlistId}:`, error);
        return [];
    }
};