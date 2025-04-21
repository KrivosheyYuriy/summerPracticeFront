import {DialogContent, Stack, TextField} from "@mui/material";

import * as React from "react";
import {Track} from "../../api/tracks/Track.ts";
import GenreSelect from "../genre/GenreSelect.tsx";
import ComposerSelect from "../composer/ComposerSelect.tsx";

type DialogFormProps = {
    track: Track;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleGenreChange: (genres: number[]) => void;
    handleComposerChange: (genres: number[]) => void;
}

const TrackDialogContent =
    ({track, handleChange, handleFileChange, handleGenreChange, handleComposerChange}: DialogFormProps) => {
        return (
            <>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField required label="Название" name="title"
                                   value={track.title} onChange={handleChange}/>


                        <TextField required label="Описание" name="description"
                                   value={track.description != null ? track.description : ''} onChange={handleChange}/>
                        <GenreSelect onChange={handleGenreChange} initialValues={track.genresId}/>
                        <ComposerSelect onChange={handleComposerChange} initialValues={track.composersId}/>

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