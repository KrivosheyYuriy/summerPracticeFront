import React, {useState, useEffect} from 'react';
import {
    TextField,
    Autocomplete,
    Checkbox,
    Box,
    CircularProgress
} from '@mui/material';

import {CheckBoxOutlineBlank, CheckBox} from '@mui/icons-material';
import {getComposer} from "../../api/composers/composerApi.ts";
import {Composer} from "../../api/composers/Composer";

interface composerMultiSelectProps {
    onChange: (selectedComposers: number[]) => void;
    initialValues?: number[];
}

const ComposerSelect: React.FC<composerMultiSelectProps> = ({onChange, initialValues = []}) => {
    const [composers, setComposers] = useState<Composer[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedComposers, setSelectedComposers] = useState<Composer[]>([]);
    const [selectedComposersId, setSelectedComposersId] = useState<number[]>(initialValues);

    useEffect(() => {
        const fetchcomposers = async () => {
            try {
                const data = await getComposer();
                setComposers(data);
            } catch (error) {
                console.error('Error fetching composers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchcomposers();
    }, []);

    useEffect(() => {
        onChange(selectedComposersId);
    }, [selectedComposersId, onChange]);

    useEffect(() => {
        const newSelectedComposers = composers.filter(composer =>
            selectedComposersId.includes(composer.id!));
        setSelectedComposers(newSelectedComposers);
    }, [selectedComposersId, composers]);

    const icon = <CheckBoxOutlineBlank fontSize="small"/>;
    const checkedIcon = <CheckBox fontSize="small"/>;


    return (
        <Box>
            {loading ? (
                <CircularProgress/>
            ) : (
                <Autocomplete
                    multiple
                    options={composers}
                    getOptionLabel={(composer) =>
                        `${composer.surname} ${composer.name} ${composer.fatherName} ${composer.birthday}`
                    }
                    value={selectedComposers}
                    onChange={(_event, newValue) => {
                        const newSelectedComposerIds = newValue.map(composer => composer.id!);
                        setSelectedComposersId(newSelectedComposerIds);
                        setSelectedComposers(newValue);
                    }}
                    disableCloseOnSelect
                    renderOption={(props, composer, {selected}) => (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{marginRight: 8}}
                                checked={selected}
                            />
                            {`${composer.surname} ${composer.name} ${composer.fatherName} ${composer.birthday}`}
                        </li>
                    )}
                    style={{width: 500}}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Выберите композиторов"
                            variant="outlined"
                        />
                    )}
                />
            )}
        </Box>
    );
};

export default ComposerSelect;