export type Track = {
    id?: number;
    title: string;
    filename: string;
    description?: string;
    durationSeconds: number;
    genresId: number[];
    composersId: number[];
    albumsId: number[];
    playListsId: number[];
}