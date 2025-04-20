import * as React from "react";
import {DialogContent, Stack, TextField} from "@mui/material";

import {Playlist} from "../../api/playlists/Playlist.ts";

type DialogFormProps = {
    playlist: Playlist;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PlaylistDialogContent = ({playlist, handleChange}: DialogFormProps) => {
    return (
        <>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField required label="Название" name="title"
                               value={playlist.title} onChange={handleChange}/>

                    <TextField label="Описание" name="description"
                               value={playlist.description != null ? playlist.description : ''} onChange={handleChange}/>
                </Stack>
            </DialogContent>
        </>
    )
}

export default PlaylistDialogContent;