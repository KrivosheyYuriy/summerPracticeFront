import * as React from "react";
import dayjs, {Dayjs} from "dayjs";
import {DialogContent, Stack, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import {Album} from "../../api/albums/Album";
import TrackSelect from "../track/TrackSelect.tsx";

type DialogFormProps = {
    album: Album;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (date: Dayjs | null) => void;
    handleTrackChange: (genres: number[]) => void;
}

const AlbumDialogContent = ({album, handleChange,
                                handleDateChange, handleTrackChange}: DialogFormProps) => {
    return (
        <>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField required label="Название" name="title"
                               value={album.title} onChange={handleChange}/>

                    <TrackSelect onChange={handleTrackChange} initialValues={album.tracksId}/>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Дата выпуска: "
                            value={album.releaseDate ? dayjs(album.releaseDate) : null}
                            onChange={handleDateChange}
                            renderInput={(props) => <TextField required {...props} />}
                        />
                    </LocalizationProvider>

                    <TextField label="Описание" name="description"
                               value={album.description != null ? album.description : ''} onChange={handleChange}/>
                </Stack>
            </DialogContent>
        </>
    )
}

export default AlbumDialogContent;