import {useState} from "react";
import {Composer} from "../../api/composers/Composer.ts";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton, Tooltip, Dialog, DialogTitle,
    DialogActions, Button} from "@mui/material";
import {updateComposer} from "../../api/composers/composerApi.ts";
import dayjs, { Dayjs } from 'dayjs';
import {useQueryClient} from "@tanstack/react-query";
import * as React from "react";
import ComposerDialogContent from "./ComposerDialogContent.tsx";


const EditComposer = (composerData: Composer) => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [composer, setComposer] = useState<Composer>({
        id: undefined, // нужно?
        name: '',
        surname: '',
        fatherName: '',
        birthday: '',
        biography: '',
        tracksId: []
    });

    const handleClickOpen = () => {
        setOpen(true);
        setComposer({
            id: composerData.id,
            name: composerData.name,
            surname: composerData.surname,
            fatherName: composerData.fatherName,
            birthday: composerData.birthday,
            biography: composerData.biography,
            tracksId: composerData.tracksId
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (!composer.id) {
            console.error("Composer ID is missing.  This should not happen.");
            return; // Or throw an error.  Handle this case appropriately.
        }

        try {
            // Convert birthday back to string format if needed by the API
            const birthdayString = dayjs(composer.birthday).format('YYYY-MM-DD'); // Or whatever format your API expects

            const updatedComposerData = { ...composer, birthday: birthdayString };

            await updateComposer(composer.id, updatedComposerData);

            // Optionally:  Show a success message to the user

        } catch (error) {
            console.error("Error updating composer:", error);
            // Optionally: Show an error message to the user
        }

        await queryClient.invalidateQueries(["composers"]);
        setComposer({ id: undefined, name: '', surname: '', fatherName: '', biography: '', birthday: '', tracksId: [] });
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setComposer({...composer, [event.target.name]: event.target.value});
    }

    const handleBirthdayChange = (date: Dayjs | null) => {
        if (date) {
            // date is a Dayjs object.  Convert to a string *before* setting state
            // The format of the string needs to match what your API expects.
            setComposer({ ...composer, birthday: date.format('YYYY-MM-DD') });
        } else {
            setComposer({ ...composer, birthday: '' }); // Or handle null case as needed
        }
    };

    return(
        <>
            <Tooltip title="Изменение композитора">
                <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon fontSize= "small" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit composer</DialogTitle>

                <ComposerDialogContent composer={composer} handleChange={handleChange}
                                       handleBirthdayChange={handleBirthdayChange}/>

                <DialogActions>
                    <Button onClick={handleClose}>Закрыть</Button>
                    <Button onClick={handleSave}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditComposer;