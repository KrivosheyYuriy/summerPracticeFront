import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton, Tooltip, Dialog, DialogTitle,
    DialogActions, Button} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import * as React from "react";
import PlaylistDialogContent from "./PlaylistDialogContent.tsx";
import {Playlist} from "../../api/playlists/Playlist";
import {updatePlaylist} from "../../api/playlists/playlistApi.ts";


const EditPlaylist = (playlistData: Playlist) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
    const [playlist, setPlaylist] = useState<Playlist>({
        id: undefined, // нужно?
        title: "",
        description: "",
        tracksId: []
    });

    const handleClickOpen = () => {
        setOpen(true);
        setPlaylist({
            id: playlistData.id,
            title: playlistData.title,
            description: playlistData.description,
            tracksId: playlistData.tracksId
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (!playlist.id) {
            console.error("Composer ID is missing.  This should not happen.");
            return; // Or throw an error.  Handle this case appropriately.
        }

        try {
            const newPlaylist = {...playlist, tracksId: selectedTracks};
            await updatePlaylist(playlist.id, newPlaylist);

            // Optionally:  Show a success message to the user

        } catch (error) {
            console.error("Error updating playlist:", error);
            // Optionally: Show an error message to the user
        }

        await queryClient.invalidateQueries(["playlists"]);
        setPlaylist({ id: undefined, title: "", description: "", tracksId: [] });
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPlaylist({...playlist, [event.target.name]: event.target.value});
    }

    const handleTrackChange = (genres: number[]) => {
        setSelectedTracks(genres);
        console.log('Selected Genres in Parent:', genres); // Do something with the selected genres
    };

    return(
        <>
            <Tooltip title="Изменение плейлиста">
                <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon fontSize= "small" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit playlist</DialogTitle>

                <PlaylistDialogContent playlist={playlist} handleChange={handleChange}
                                       handleTrackChange={handleTrackChange}/>

                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSave}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditPlaylist;