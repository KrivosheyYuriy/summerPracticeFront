import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import AlbumDialogContent from "./AlbumDialogContent.tsx";
import {Album} from "../../api/albums/Album.ts";
import {addAlbum} from "../../api/albums/albumApi.ts";

const AddAlbum = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
    const [album, setAlbum] = useState<Album>({
        title: '',
        description: '',
        releaseDate: '',
        tracksId: []
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setAlbum({...album, [event.target.name]: event.target.value});
    }

    const handleTrackChange = (genres: number[]) => {
        setSelectedTracks(genres);
        console.log('Selected Genres in Parent:', genres); // Do something with the selected genres
    };

    const handleSave = async () => {
        try {
            // Convert birthday back to string format if needed by the API
            const releaseString = dayjs(album.releaseDate).format('YYYY-MM-DD'); // Or whatever format your API expects

            const updatedAlbumData = { ...album, releaseDate: releaseString, tracksId: selectedTracks};

            await addAlbum(updatedAlbumData);

            // Optionally:  Show a success message to the user

        } catch (error) {
            console.error("Error updating composer:", error);
            // Optionally: Show an error message to the user
        }

        await queryClient.invalidateQueries(["albums"]);
        setAlbum({title: '', description: '', releaseDate: '', tracksId: [] });
        setOpen(false);
    };

    const handleDateChange = (date: Dayjs | null) => {
        if (date) {
            // date is a Dayjs object.  Convert to a string *before* setting state
            // The format of the string needs to match what your API expects.
            setAlbum({ ...album, releaseDate: date.format('YYYY-MM-DD') });
        } else {
            setAlbum({ ...album, releaseDate: '' }); // Or handle null case as needed
        }
    };

    return(
        <>
            <Button onClick={handleClickOpen}>Добавить Альбом</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новый альбом:</DialogTitle>
                <AlbumDialogContent album={album} handleChange={handleChange}
                                       handleDateChange={handleDateChange} handleTrackChange={handleTrackChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddAlbum;