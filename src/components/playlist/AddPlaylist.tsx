import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import PlaylistDialogContent from "./PlaylistDialogContent.tsx";
import {Playlist} from "../../api/playlists/Playlist.ts";
import {addPlaylist} from "../../api/playlists/playlistApi.ts";

const AddPlaylist = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [selectedTracks, setSelectedTracks] = useState<number[]>([]);

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

    const handleTrackChange = (genres: number[]) => {
        setSelectedTracks(genres);
        console.log('Selected Genres in Parent:', genres); // Do something with the selected genres
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setPlaylist({...playlist, [event.target.name]: event.target.value});
    }

    const handleSave = async () => {
        try {
            const newPlaylist = {...playlist, tracksId: selectedTracks};
            await addPlaylist(newPlaylist);
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
                <PlaylistDialogContent playlist={playlist} handleChange={handleChange}
                                       handleTrackChange={handleTrackChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddPlaylist;