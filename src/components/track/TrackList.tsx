import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import IconButton from '@mui/material/IconButton';
import {DataGrid, GridColDef, GridCellParams} from "@mui/x-data-grid";
import {createComposerNameMap, createGenreMap} from "../../utils/trackUtil.ts"
import {FileDownload} from "@mui/icons-material";
import AudioButton from "./AudioButton.tsx";
import {AudioProvider} from "./AudioProvider.tsx";
import {Track} from "../../api/tracks/Track.ts";
import {useParams} from "react-router-dom";

type TrackListProps = {
    tracksFunc: (id: number) => Promise<Track[]>;
}

const TrackList = ({tracksFunc}: TrackListProps) => {
    const { id } = useParams();
    const albumId = Number(id);

    const {data, error, isSuccess} = useQuery({
        queryKey: ["tracks"],
        queryFn: () => tracksFunc(albumId),
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

    const columns: GridColDef[] = [
        {
            field: 'play/pause',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => {
                return <AudioButton
                    audioUrl={`${import.meta.env.VITE_API_URL}/api/tracks/file/${params.row.id}`} />
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
            field: 'download',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => {
                return (
                    <IconButton aria-label="download" size="small"
                                component="a" href={`${import.meta.env.VITE_API_URL}/api/tracks/file/${params.row.id}`}
                                target="_blank" rel="noopener noreferrer">
                        <FileDownload />
                    </IconButton>
                )
            }
        },
    ];

    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching data...</span>
    }

    return (
        <>
            <AudioProvider>
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={row => row.id}
                    sx={{width: '100%'}}
                />
            </AudioProvider>
        </>
    );
}

export default TrackList;