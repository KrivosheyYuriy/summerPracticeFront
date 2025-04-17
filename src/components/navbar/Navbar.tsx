import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom'; // Импортируйте Link из react-router-dom, если используете роутинг

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        color: "gold",
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit',
        },
    },
}));

const Navbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Let's blues
                    </Typography>
                    <Box sx={{ display: 'flex'}}>
                        <Link to="/" className={classes.link}>
                            <Button color="inherit">Главная</Button>
                        </Link>
                        <Link to="/composers" className={classes.link}>
                            <Button color="inherit">Композиторы</Button>
                        </Link>
                        <Link to="/tracks" className={classes.link}>
                            <Button color="inherit">Треки</Button>
                        </Link>
                        <Link to="/albums" className={classes.link}>
                            <Button color="inherit">Альбомы</Button>
                        </Link>
                        <Link to="/playlists" className={classes.link}>
                            <Button color="inherit">Плейлисты</Button>
                        </Link>
                        <Link to="/genres" className={classes.link}>
                            <Button color="inherit">Жанры</Button>
                        </Link>
                        {/*  Добавьте другие кнопки с ссылками здесь */}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;