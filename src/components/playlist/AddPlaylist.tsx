import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import PlaylistDialogContent from "./PlaylistDialogContent.tsx";
import {Playlist} from "../../api/playlists/Playlist.ts";
import {addPlaylist} from "../../api/playlists/playlistApi.ts";

const AddPlaylist = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [playlist, setPlaylist] = useState<Playlist>({
        title: "",
        description: "",
        tracksId: []
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPlaylist({...playlist, [event.target.name]: event.target.value});
    }

    const handleSave = async () => {
        try {
            await addPlaylist(playlist);
            // Optionally:  Show a success message to the user
        } catch (error) {
            console.error("Error updating composer:", error);
            // Optionally: Show an error message to the user
        }

        await queryClient.invalidateQueries(["playlists"]);
        setPlaylist({title: "", description: "", tracksId: [] });
        setOpen(false);
    };

    return(
        <>
            <Button onClick={handleClickOpen}>Добавить плейлист</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новый плейлист:</DialogTitle>
                <PlaylistDialogContent playlist={playlist} handleChange={handleChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddPlaylist;