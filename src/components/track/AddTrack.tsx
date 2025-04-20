import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Button, Dialog, DialogTitle, DialogActions} from '@mui/material';

import TrackDialogContent from "./TrackDialogContent.tsx";
import {Track} from "../../api/tracks/Track.ts";
import {addTrack} from "../../api/tracks/trackApi.ts";

const AddTrack = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [track, setTrack] = useState<Track>({
        title: '',
        description: '',
        genresId: [],
        composersId: [],
        albumsId: [],
        playListsId: [],
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setTrack({...track, [event.target.name]: event.target.value});
    }

    const handleGenreChange = (genres: number[]) => {
        setSelectedGenres(genres);
        console.log('Selected Genres in Parent:', genres); // Do something with the selected genres
    };

    const handleSave = async () => {
        try {
            const newTrack = {...track, genresId: selectedGenres};
            await addTrack(newTrack, selectedFile!);

            // Optionally:  Show a success message to the user

        } catch (error) {
            console.error("Error updating track:", error);
            // Optionally: Show an error message to the user
        }

        await queryClient.invalidateQueries(["tracks"]);
        setTrack({...track, title: '', description: '', genresId: [], composersId: []});
        setOpen(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the first selected file
        if (file)
            setSelectedFile(file);
        else
            setSelectedFile(null);
    };

    return(
        <>
            <Button onClick={handleClickOpen}>Добавить трек</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новый Трек:</DialogTitle>
                <TrackDialogContent track={track} handleChange={handleChange}
                                    handleFileChange={handleFileChange} handleGenreChange={handleGenreChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddTrack;