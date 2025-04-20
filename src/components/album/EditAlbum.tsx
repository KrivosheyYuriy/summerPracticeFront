import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton, Tooltip, Dialog, DialogTitle,
    DialogActions, Button} from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import {useQueryClient} from "@tanstack/react-query";
import * as React from "react";
import AlbumDialogContent from "./AlbumDialogContent.tsx";
import {Album} from "../../api/albums/Album.ts";
import {updateAlbum} from "../../api/albums/albumApi.ts";


const EditAlbum = (albumData: Album) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [album, setAlbum] = useState<Album>({
        id: undefined, // нужно?
        title: '',
        releaseDate: '',
        description: '',
        tracksId: []
    });

    const handleClickOpen = () => {
        setOpen(true);
        setAlbum({
            id: albumData.id,
            title: albumData.title,
            releaseDate: albumData.releaseDate,
            description: albumData.description,
            tracksId: albumData.tracksId
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (!album.id) {
            console.error("Composer ID is missing.  This should not happen.");
            return; // Or throw an error.  Handle this case appropriately.
        }

        try {
            // Convert birthday back to string format if needed by the API
            const releaseString = dayjs(album.releaseDate).format('YYYY-MM-DD'); // Or whatever format your API expects

            const updatedAlbumData = { ...albumData, releaseDate: releaseString };

            await updateAlbum(album.id, updatedAlbumData);

            // Optionally:  Show a success message to the user

        } catch (error) {
            console.error("Error updating composer:", error);
            // Optionally: Show an error message to the user
        }

        await queryClient.invalidateQueries(["albums"]);
        setAlbum({ id: undefined, title: '', releaseDate: '', description: '', tracksId: [] });
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setAlbum({...albumData, [event.target.name]: event.target.value});
    }

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
            <Tooltip title="Изменение альбома">
                <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon fontSize= "small" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit album</DialogTitle>

                <AlbumDialogContent album={album} handleChange={handleChange}
                                       handleDateChange={handleDateChange}/>

                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSave}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditAlbum;