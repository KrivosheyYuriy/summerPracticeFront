import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getComposer, deleteComposer} from "../../api/composers/composerApi";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid, GridColDef, GridCellParams} from "@mui/x-data-grid";
import EditComposer from "./EditComposer.tsx";
import AddComposer from "./AddComposer.tsx";


const Composers = () => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const {data, error, isSuccess} = useQuery({
        queryKey: ["composers"],
        queryFn: getComposer
    });

    const handleDelete = async (composerId: number) => {
        try {
            await deleteComposer(composerId); // Assuming deleteComposer returns a Promise
            await queryClient.invalidateQueries({queryKey: ['composers']});
            setOpen(true);
            setErrorMessage(null); // Reset error on successful deletion
        } catch (err: any) { //Use any to make it simple
            console.error("Deletion error:", err);
            setErrorMessage("Ошибка при удалении композитора."); // Or a more specific error message
        }
    };

    const columns: GridColDef[] = [
        {field: 'name', headerName: 'Имя', flex: 1}, // flex: 1 для равномерного распределения
        {field: 'surname', headerName: 'Фамилия', flex: 1},
        {field: 'fatherName', headerName: 'Отчество', flex: 1},
        {field: 'birthday', headerName: 'Родился', flex: 1},
        {field: 'biography', headerName: 'Биография', flex: 1},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditComposer
                    id={params.row.id}
                    name={params.row.name}
                    surname={params.row.surname}
                    fatherName={params.row.fatherName}
                    birthday={params.row.birthday}
                    biography={params.row.biography}
                    tracksId={params.row.tracksId}
                />
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams<any, number>) => (
                <IconButton aria-label="delete" size="small"
                            onClick={() => {
                                if (window.confirm(`Вы уверены, что хотите удалить ${params.row.name} 
                                ${params.row.surname} ${params.row.fatherName} ${params.row.birthday}?`)) {
                                    handleDelete(params.row.id);
                                }
                            }}
                >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            ),
        },
    ];


    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching cars...</span>
    }

    return (
        <>
            <AddComposer />
            <DataGrid // Используем стилизованный DataGrid
                rows={data}
                columns={columns}
                getRowId={row => row.id}
                sx={{width: '100%'}} // Занимает всю доступную ширину
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message={errorMessage || "Композитор удален"}/>
        </>

    );
}

export default Composers;