import React, {useState, useEffect} from 'react';
import {
    TextField,
    Autocomplete,
    Checkbox,
    Box,
    CircularProgress
} from '@mui/material';

import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material';
import {getTrack} from "../../api/tracks/trackApi.ts";
import {Track} from "../../api/tracks/Track.ts";

interface TrackMultiSelectProps {
    onChange: (selectedTracks: number[]) => void;
    initialValues?: number[];
}

const TrackSelect: React.FC<TrackMultiSelectProps> = ({onChange, initialValues = []}) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
    const [selectedTracksId, setSelectedTracksId] = useState<number[]>(initialValues);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const data = await getTrack();
                setTracks(data);
            } catch (error) {
                console.error('Error fetching tracks:', error);
                // Handle error appropriately (e.g., display an error message to the user)
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);

    useEffect(() => {
        onChange(selectedTracksId);  // Notify parent component of changes with IDs
    }, [selectedTracksId, onChange]);

    useEffect(() => {
        // Update selectedTracks based on selectedTrackIds
        const newSelectedTracks = tracks.filter(track => selectedTracksId.includes(track.id!));
        setSelectedTracks(newSelectedTracks);
    }, [selectedTracksId, tracks]);

    const icon = <CheckBoxOutlineBlank fontSize="small"/>;
    const checkedIcon = <CheckBox fontSize="small"/>;


    return (
        <Box>
            {loading ? (
                <CircularProgress/>
            ) : (
                <Autocomplete
                    multiple
                    options={tracks}
                    getOptionLabel={(track) => `${track.title} (${track.durationSeconds}сек)`}
                    value={selectedTracks}
                    onChange={(_event, newValue) => {
                        const newSelectedTrackIds = newValue.map(track => track.id!);
                        setSelectedTracksId(newSelectedTrackIds);
                        setSelectedTracks(newValue);
                    }}
                    disableCloseOnSelect
                    renderOption={(props, track, {selected}) => (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{marginRight: 8}}
                                checked={selected}
                            />
                            {`${track.title} (${track.durationSeconds}сек)`}
                        </li>
                    )}
                    style={{width: 500}}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Выберите треки"
                            variant="outlined"
                        />
                    )}
                />
            )}
        </Box>
    );
};

export default TrackSelect;