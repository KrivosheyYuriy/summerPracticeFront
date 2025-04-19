import {DialogContent, Stack, TextField} from "@mui/material";

import * as React from "react";
import {Track} from "../../api/tracks/Track.ts";

type DialogFormProps = {
    track: Track;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TrackDialogContent =
    ({track, handleChange, handleFileChange}: DialogFormProps) => {

        return (
            <>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField required label="Название" name="title"
                                   value={track.title} onChange={handleChange}/>


                        <TextField required label="Описание" name="description"
                                   value={track.description} onChange={handleChange}/>

                        <input
                            accept="audio/*"
                            id="raised-button-file"
                            name="audioFile"
                            type="file"
                            required
                            onChange={handleFileChange}
                        />
                    </Stack>
                </DialogContent>
            </>

        )
    }

export default TrackDialogContent;