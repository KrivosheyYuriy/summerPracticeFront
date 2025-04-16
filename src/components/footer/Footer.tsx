import { Box, Typography, Container } from '@mui/material';
import Copyright from '../copyright/Copyright'

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 6,
            }}
            component="footer"
        >
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    Let's blues
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p">
                    Данный сайт сделан Кривошей Юрием для любителей музыки
                </Typography>
                <Copyright />
            </Container>
        </Box>
    );
}

export default Footer;