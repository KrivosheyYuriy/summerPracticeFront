import { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemButton, ListItemText, Paper, Alert, AlertTitle } from '@mui/material';
import { Genre } from '../../api/genres/Genre'; // Assuming you have a types file
import { getGenre, getGenreById } from '../../api/genres/genreApi'; // Assuming you have an api file

const GenresComponent = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenre();
                setGenres(data);
            } catch (error: any) {
                setError(`Ошибка при получении жанров: ${error.message}`);
            }
        };

        fetchGenres();
    }, []);

    const handleGenreClick = async (id: number) => {
        try {
            const data = await getGenreById(id);
            setSelectedGenre(data);
            setError(null);
        } catch (error: any) {
            setError(`Ошибка при получении жанра с ID ${id}: ${error.message}`);
            setSelectedGenre(null);
        }
    };

    const containerStyle = {
        marginTop: '32px',
        paddingBottom: '20px'
    };

    const listStyle = {
        width: '100%',
        maxWidth: '360px',
        backgroundColor: '#f5f5f5', // theme.palette.background.paper (assuming default light theme)
        margin: 'auto'
    };

    const selectedGenrePaperStyle = {
        padding: '16px', // theme.spacing(2) = 2 * 8 = 16
        marginTop: '16px', // theme.spacing(2) = 2 * 8 = 16
    };

    const errorAlertStyle = {
        marginBottom: '16px', // theme.spacing(2) = 2 * 8 = 16
    };

    return (
        <Container style={containerStyle}>
            <Typography variant="h4" component="h1" gutterBottom>
                Список жанров
            </Typography>

            {error && (
                <Alert severity="error" style={errorAlertStyle}>
                    <AlertTitle>Ошибка</AlertTitle>
                    {error}
                </Alert>
            )}

            <List style={listStyle}>
                {genres.map((genre) => (
                    <ListItem key={genre.id} disablePadding>
                        <ListItemButton onClick={() => handleGenreClick(genre.id!)}>
                            <ListItemText primary={genre.title}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {selectedGenre && (
                <Paper elevation={3} style={selectedGenrePaperStyle}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Информация о жанре
                    </Typography>
                    <Typography variant="body1">
                        <b>Название:</b> {selectedGenre.title}
                    </Typography>
                    <Typography variant="body1">
                        <b>Описание:</b> {selectedGenre.description || 'Описание отсутствует'}
                    </Typography>
                </Paper>
            )}
        </Container>
    );
};

export default GenresComponent;