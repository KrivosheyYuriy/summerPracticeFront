export type Album = {
    id?: number;
    title: string;
    description?: string;
    releaseDate: string; // или Date, если нужны временные изменения
    tracksId: number[];
}