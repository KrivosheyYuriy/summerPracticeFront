import {DialogContent, Stack, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import * as React from "react";
import {Composer} from "../../api/composers/Composer.ts";

type DialogFormProps = {
    composer: Composer;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBirthdayChange: (date: Dayjs | null) => void;
}

const ComposerDialogContent =
    ({composer, handleChange, handleBirthdayChange}: DialogFormProps) => {

    return (
        <>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField required label="Имя" name="name"
                               value={composer.name} onChange={handleChange}/>
                    <TextField required label="Фамилия" name="surname"
                               value={composer.surname} onChange={handleChange}/>
                    <TextField label="Отчество" name="fatherName"
                               value={composer.fatherName} onChange={handleChange}/>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Дата рождения"
                            value={composer.birthday ? dayjs(composer.birthday) : null} // Convert back to Dayjs object for display
                            onChange={handleBirthdayChange}
                            renderInput={(props) => <TextField required {...props} />}
                        />
                    </LocalizationProvider>

                    <TextField label="Биография" name="biography"
                               value={composer.biography} onChange={handleChange}/>
                </Stack>
            </DialogContent>
        </>

    )
}

export default ComposerDialogContent;