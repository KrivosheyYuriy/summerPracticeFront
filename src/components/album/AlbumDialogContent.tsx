import * as React from "react";
import dayjs, {Dayjs} from "dayjs";
import {DialogContent, Stack, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import {Album} from "../../api/albums/Album";

type DialogFormProps = {
    album: Album;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (date: Dayjs | null) => void;
}

const AlbumDialogContent = ({album, handleChange, handleDateChange}: DialogFormProps) => {
    return (
        <>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField required label="Название" name="title"
                               value={album.title} onChange={handleChange}/>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Дата выпуска: "
                            value={album.releaseDate ? dayjs(album.releaseDate) : null} // Convert back to Dayjs object for display
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