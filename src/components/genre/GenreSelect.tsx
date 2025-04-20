import React, {useState, useEffect} from 'react';
import {
    TextField,
    Autocomplete,
    Checkbox,
    Box,
    CircularProgress
} from '@mui/material';

import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material';
import {getGenre} from "../../api/genres/genreApi.ts";
import {Genre} from "../../api/genres/Genre.ts";

interface GenreMultiSelectProps {
    onChange: (selectedGenres: number[]) => void;
    initialValues?: number[];
}

const GenreSelect: React.FC<GenreMultiSelectProps> = ({onChange, initialValues = []}) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
    const [selectedGenresId, setSelectedGenresId] = useState<number[]>(initialValues);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenre();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
                // Handle error appropriately (e.g., display an error message to the user)
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        onChange(selectedGenresId);  // Notify parent component of changes with IDs
    }, [selectedGenresId, onChange]);

    useEffect(() => {
        // Update selectedGenres based on selectedGenreIds
        const newSelectedGenres = genres.filter(genre => selectedGenresId.includes(genre.id!));
        setSelectedGenres(newSelectedGenres);
    }, [selectedGenresId, genres]);

    const icon = <CheckBoxOutlineBlank fontSize="small"/>;
    const checkedIcon = <CheckBox fontSize="small"/>;


    return (
        <Box>
            {loading ? (
                <CircularProgress/>
            ) : (
                <Autocomplete
                    multiple
                    options={genres}
                    getOptionLabel={(genre) => genre.title}
                    value={selectedGenres}
                    onChange={(event, newValue) => {
                        const newSelectedGenreIds = newValue.map(genre => genre.id!);
                        setSelectedGenresId(newSelectedGenreIds);
                        setSelectedGenres(newValue);
                    }}
                    disableCloseOnSelect
                    renderOption={(props, genre, {selected}) => (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{marginRight: 8}}
                                checked={selected}
                            />
                            {genre.title}
                        </li>
                    )}
                    style={{width: 500}}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Выберите жанры"
                            variant="outlined"
                        />
                    )}
                />
            )}
        </Box>
    );
};

export default GenreSelect;