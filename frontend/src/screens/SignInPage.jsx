import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth={"lg"}>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <Paper sx={{
                            height: "100%"
                        }}>
                            <Box
                                sx={{
                                    marginTop: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <CheckCircleOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5" gutterBottom>
                                    Validar bem
                                </Typography>

                                <Typography variant="subtitle1">
                                    Insira abaixo o código do bem para validá-lo.
                                </Typography>

                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="assetCode"
                                        label="Código do bem"
                                        name="assetCode"
                                        autoComplete="assetCode"
                                        autoFocus
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Ir para validação
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper sx={{
                            paddingLeft: '6px',
                            paddingRight: '6px',
                            height: "100%"
                        }}>

                            <Box
                                sx={{
                                    marginTop: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Acessar Sistema
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Nome de usuario"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Senha"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Login
                                    </Button>
                                    <Grid container direction={"row-reverse"}>
                                        <Grid item>
                                            <Link href="#" variant="body2">
                                                {"Crie sua conta"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                           </Paper>
                        <CssBaseline />

                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}