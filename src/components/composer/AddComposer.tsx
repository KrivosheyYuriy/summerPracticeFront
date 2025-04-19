import {useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {Composer} from "../../api/composers/Composer.ts";
import {Button, Dialog, DialogTitle, DialogActions} from '@mui/material';
import ComposerDialogContent from "./ComposerDialogContent.tsx";
import dayjs, {Dayjs} from "dayjs";
import {addComposer} from "../../api/composers/composerApi.ts";

const AddComposer = () => {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [composer, setComposer] = useState<Composer>({
        name: '',
        surname: '',
        fatherName: '',
        birthday: '',
        biography: '',
        tracksId: []
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setComposer({...composer, [event.target.name]: event.target.value});
    }

    const handleSave = async () => {
        try {
            // Convert birthday back to string format if needed by the API
            const birthdayString = dayjs(composer.birthday).format('YYYY-MM-DD'); // Or whatever format your API expects

            const updatedComposerData = { ...composer, birthday: birthdayString };

            await addComposer(updatedComposerData);

            // Optionally:  Show a success message to the user

        } catch (error) {
            console.error("Error updating composer:", error);
            // Optionally: Show an error message to the user
        }

        await queryClient.invalidateQueries(["composers"]);
        setComposer({name: '', surname: '', fatherName: '', biography: '', birthday: '', tracksId: [] });
        setOpen(false);
    };

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
            <Button onClick={handleClickOpen}>Добавить композитора</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новый композитор:</DialogTitle>
                <ComposerDialogContent composer={composer} handleChange={handleChange}
                handleBirthdayChange={handleBirthdayChange}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddComposer;