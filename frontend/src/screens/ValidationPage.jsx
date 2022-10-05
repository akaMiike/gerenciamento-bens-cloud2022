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
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import {FormGroup, Switch, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useEffect, useState} from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../api";
import axios from "axios";
import {ErrorDialog} from "../components/ErrorDialog";

const theme = createTheme();

export default function ValidationPage() {
    const { assetId } = useParams()

    const [isValid, setValid] = useState("valid")
    const [justification, setJustification] = useState("")
    const [assetData, setAssetData] = useState({"name": "", "assetNumber": "", "location": "", user: {"fullName": ""}})
    const [downloadUrl, setDownloadUrl] = useState("")
    const navigate = useNavigate()
    const [errorDialog, setErrorDialog] = useState({ isOpen: false })

    useEffect(() => {
        api
            .get(`/users/assets/${assetId}`)
            .then(response => {
                setAssetData(response.data.asset)
                setDownloadUrl(response.data.presignedUrl)
            }).catch(() => {
                setErrorDialog({ isOpen: true, title: "Bem não encontrado",
                    description: `Não foi possível encontrar um bem com o id ${assetId}. Verifique o id informado e tente novamente.`,
                    onClose: () => {
                        setErrorDialog({ isOpen: false })
                        navigate("/")
                    }, closeButtonName: "Voltar para pagina inicial"
                })
            })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        const requestJson = {
            "validation": isValid === "valid",
            "justification": justification,
            "idAsset": assetId
        }

        api
            .post("/users/validation", requestJson)
            .then(e => navigate("/"))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth={"lg"}>
                <Paper elevation={3} sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Box sx={{alignSelf: "flex-start", mt: "10px", ml: "10px"}}>
                        <Button onClick={() => navigate("/")} variant={"contained"}><ArrowBackOutlinedIcon />Voltar</Button>
                    </Box>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <CheckCircleOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" gutterBottom>
                        Validação de bem
                    </Typography>

                    <Card sx={{width: "60%", mt: "10px", mb: "10px"}}>
                        <CardContent>
                            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main',}}>
                                    <InfoOutlinedIcon />
                                </Avatar>
                                <Typography gutterBottom variant="h5" component="div">
                                    Detalhes do bem
                                </Typography>
                            </Box>

                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography variant="overline">
                                    Nome do bem
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {assetData.name}
                                </Typography>
                            </Box>
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography variant="overline">
                                    Localização
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {assetData.location}
                                </Typography>
                            </Box>
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography variant="overline">
                                    Código do patrimonio
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {assetData.assetNumber}
                                </Typography>
                            </Box>
                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Typography variant="overline">
                                    Cadastrado por
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {assetData.user.fullName}
                                </Typography>
                            </Box>
                            <CardActions>
                                <Button target={"_blank"} rel="noopener noreferrer" href={downloadUrl} variant={"contained"} size="small" fullWidth>Baixar arquivo</Button>
                            </CardActions>
                        </CardContent>
                    </Card>

                    <Card sx={{width: "60%", mt: "10px", mb: "10px"}}>
                        <CardContent>
                            <Box
                                sx={{
                                    marginTop: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <DoneAllOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5" gutterBottom>
                                    Concluir validação
                                </Typography>

                                <Typography variant="subtitle1">
                                    Indique abaixo se o bem é válido ou não e insira uma justificativa para sua validação
                                </Typography>

                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        exclusive
                                        value={isValid}
                                        onChange={(e, newOption) => setValid(newOption)}
                                        aria-label="Platform"
                                        sx={{display: "flex", justifyContent: "center"}}
                                    >
                                        <ToggleButton value="valid">Válido</ToggleButton>
                                        <ToggleButton value="invalid">Inválido</ToggleButton>
                                    </ToggleButtonGroup>

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="justification"
                                        label="Justificativa"
                                        name="justification"
                                        autoComplete="justification"
                                        value={justification}
                                        onChange={e => setJustification(e.target.value)}
                                        autoFocus
                                        multiline
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={justification.length === 0}
                                    >
                                        Concluir validação
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                </Paper>
                <ErrorDialog dialogData={errorDialog}></ErrorDialog>

            </Container>
        </ThemeProvider>
    );
}