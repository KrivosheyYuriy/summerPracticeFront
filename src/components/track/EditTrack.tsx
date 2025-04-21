import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton, Tooltip, Dialog, DialogTitle,
    DialogActions, Button} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import * as React from "react";
import TrackDialogContent from "./TrackDialogContent";
import {Track} from "../../api/tracks/Track.ts";
import {updateTrack} from "../../api/tracks/trackApi.ts";


const EditTrack = (trackData: Track) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedComposers, setSelectedComposers] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [track, setTrack] = useState<Track>({
        id: undefined,
        title: '',
        description: '',
        genresId: [],
        composersId: [],
        albumsId: [],
        playListsId: [],
    });

    const handleClickOpen = () => {
        setOpen(true);
        setTrack({
            id: trackData.id,
            title: trackData.title,
            description: trackData.description,
            genresId: trackData.genresId,
            composersId: trackData.composersId,
            albumsId: trackData.albumsId,
            playListsId: trackData.playListsId
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (!track.id) {
            console.error("Track ID is missing.  This should not happen.");
            return; // Or throw an error.  Handle this case appropriately.
        }

        try {
            const newTrack = {...track, genresId: selectedGenres, composersId: selectedComposers};
            await updateTrack(track.id, newTrack , selectedFile!);

        } catch (error) {
            console.error("Error updating composer:", error);
        }

        await queryClient.invalidateQueries(["tracks"]);
        setTrack({id: undefined, title: '', description: '', genresId: [],
            composersId: [], playListsId: [], albumsId: []});
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setTrack({...track, [event.target.name]: event.target.value});
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the first selected file
        if (file) {
            setSelectedFile(file);
        }
        else {
            setSelectedFile(null);
        }
    };

    const handleGenreChange = (genres: number[]) => {
        setSelectedGenres(genres);
        console.log('Selected Genres in Parent:', genres); // Do something with the selected genres
    };

    const handleComposerChange = (genres: number[]) => {
        setSelectedComposers(genres);
        console.log('Selected Composers in Parent:', genres); // Do something with the selected genres
    };

    return(
        <>
            <Tooltip title="Изменение Трека">
                <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon fontSize= "small" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit track</DialogTitle>

                <TrackDialogContent track={track} handleChange={handleChange}
                                       handleFileChange={handleFileChange}
                                    handleGenreChange={handleGenreChange}
                handleComposerChange={handleComposerChange}/>

                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSave}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditTrack;