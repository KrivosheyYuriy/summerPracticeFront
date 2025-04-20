import {useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import {deletePlaylist, getPlaylist} from "../../api/playlists/playlistApi.ts";
import EditPlaylist from "./EditPlaylist.tsx";
import AddPlaylist from './AddPlaylist';
import Link from "@mui/material/Link";

const Playlists = () => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const {data, error, isSuccess} = useQuery({
        queryKey: ["playlists"],
        queryFn: getPlaylist
    });

    const handleDelete = async (playlistId: number) => {
        try {
            await deletePlaylist(playlistId); // Assuming deleteComposer returns a Promise
            await queryClient.invalidateQueries({queryKey: ['playlists']});
            setOpen(true);
            setErrorMessage(null); // Reset error on successful deletion
        } catch (err: any) { //Use any to make it simple
            console.error("Deletion error:", err);
            setErrorMessage("Ошибка при удалении композитора."); // Or a more specific error message
        }
    };

    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Название', flex: 1,
            renderCell: (params: GridCellParams) =>
                <Link href={`/playlists/${params.row.id}`}>
                    {params.row.title}
                </Link>
        }, // flex: 1 для равномерного распределения
        {field: 'description', headerName: 'Описание', flex: 1},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditPlaylist
                    id={params.row.id}
                    title={params.row.title}
                    description={params.row.description}
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
                                if (window.confirm(`Вы уверены, что хотите удалить плейлист ${params.row.title} ?`)) {
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
            <AddPlaylist />
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
                message={errorMessage || "Плейлист удален"}/>
        </>

    );
}

export default Playlists;