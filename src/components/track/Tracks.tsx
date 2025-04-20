import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {DataGrid, GridColDef, GridCellParams} from "@mui/x-data-grid";
import {deleteTrack, getTrack} from "../../api/tracks/trackApi.ts";
import AddTrack from "./AddTrack.tsx";
import EditTrack from "./EditTrack.tsx";
import {createComposerNameMap, createGenreMap} from "../../utils/trackUtil.ts"
import {FileDownload, PlayArrow} from "@mui/icons-material";


const Tracks = () => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const {data, error, isSuccess} = useQuery({
        queryKey: ["tracks"],
        queryFn: getTrack
    });

    const [composerNameMap, setComposerNameMap] = useState<{ [composerId: number]: string }>({});
    const [genreMap, setGenreMap] = useState<{ [genreId: number]: string }>({});

    useEffect(() => {
        createComposerNameMap(data)
            .then(newMap => {
                setComposerNameMap(newMap);
            });
    }, [data]);

    useEffect(() => {
        createGenreMap(data)
            .then(newMap => {
                setGenreMap(newMap);
            });
    }, [data]);

    const handleDelete = async (trackId: number) => {
        try {
            await deleteTrack(trackId);
            await queryClient.invalidateQueries({queryKey: ['tracks']});
            setOpen(true);
            setErrorMessage(null);
        } catch (err: any) {
            console.error("Deletion error:", err);
            setErrorMessage("Ошибка при удалении трека.");
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'play/pause',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: () => {
                return (
                    <IconButton aria-label="play/pause" size="small">
                        <PlayArrow />
                    </IconButton>
                )
            }
        },
        {field: 'title', headerName: 'Название', flex: 1}, // flex: 1 для равномерного распределения
        {field: 'composersId', headerName: 'Композиторы', flex: 1,
            valueGetter: (idList: number[]) => {
                return idList
                    .map(composerId => composerNameMap[composerId] || "Загрузка...")
                    .join(', '); // Join the names with a comma
            },
            },
        {field: 'genresId', headerName: 'Жанры', flex: 1,
            valueGetter: (idList: number[]) => {
                return idList
                    .map(genreId => genreMap[genreId] || "Загрузка...")
                    .join(', '); // Join the names with a comma
            },
        },
        {field: 'description', headerName: 'Описание', flex: 1},
        {
            field: 'edit',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) =>
                <EditTrack
                    id={params.row.id}
                    title={params.row.title}
                    description={params.row.description}
                    composersId={params.row.composersId}
                    playListsId={params.row.playListsId}
                    albumsId={params.row.albumsId}
                    genresId={params.row.genresId}
                />
        },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams<any, number>) => {
                const composerNames = (params.row.composersId as number[]).
                map(composerId => composerNameMap[composerId] || "Загрузка...")
                    .join(', ') || 'Неизвестно';

                return (

                    <IconButton aria-label="delete" size="small"
                                onClick={() => {
                                    if (window.confirm(`Вы уверены, что хотите удалить ${params.row.title} 
                                    от ${composerNames} длительностью ${params.row.durationSeconds} сек?`)) {
                                        handleDelete(params.row.id);
                                    }
                                }}
                    >
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                )
            },
        },
        {
            field: 'download',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: () => {
                return (
                    <IconButton aria-label="download" size="small">
                        <FileDownload />
                    </IconButton>
                )
            }
        },
    ];


    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching cars...</span>
    }

    return (
        <>
            <AddTrack />
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={row => row.id}
                sx={{width: '100%'}} // Занимает всю доступную ширину
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message={errorMessage || "Трек удален"}/>
        </>

    );
}

export default Tracks;