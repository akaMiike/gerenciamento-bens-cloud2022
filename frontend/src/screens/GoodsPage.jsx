import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import {CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useState} from "react";



const theme = createTheme();

function ValidationsDialog({ assetId, isOpen, onClose }) {
    return <div>
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{"Validações"}</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{mb: "12px"}}>
                    Log de validações do bem
                </DialogContentText>

                <Card sx={{mb: "8px"}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Validado
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="overline">
                                Horário
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                23:49
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="overline">
                                Justificativa
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Uma justificativa muito justa
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Validado
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="overline">
                                Horário
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                23:49
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <Typography variant="overline">
                                Justificativa
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Uma justificativa muito justa
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fechar</Button>
            </DialogActions>
        </Dialog>
    </div>
}

function FormDialog({ isOpen, onClose, data }) {
    const isCreation = !data
    const [currentData, setCurrentData] = useState(data || {})
    const [hasChanges, setHasChanges] = useState(false)
    const [file, setFile] = useState()
    function fieldSetter(field) { return e => {
        setCurrentData({...currentData, [field]: e.target.value})
        setHasChanges(true)
    } }

    function validateFields() {
        return !!currentData.name && currentData.name.length >= 1 &&
            !!currentData.location && currentData.location.length >= 1 &&
            !!currentData.assetNumber && !!file && hasChanges
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>{isCreation ? "Criar novo bem" : "Detalhes" }</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{mb: "8px"}}>
                        {isCreation ? "Preencha os campos abaixo para cadastrar um novo bem" : "Detalhes do bem"}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome do bem"
                        value={currentData.name}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={fieldSetter("name")}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="location"
                        label="Localização do bem"
                        value={currentData.location}

                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={fieldSetter("location")}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="assetNumber"
                        label="Código do bem"
                        value={currentData.assetNumber}
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={fieldSetter("assetNumber")}
                    />
                    <Button variant="contained" component="label" fullWidth sx={{mt: "8px"}}>
                        {file ? "Arquivo: " + file.name : "Arquivo"}
                        <input onChange={e => setFile(e.target.files[0])}
                               hidden accept="image/jpeg,image/png,application/pdf"  type="file" />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>

                    {isCreation ?
                        <Button disabled={!validateFields()} onClick={onClose}>Cadastrar</Button> :
                        <Button disabled={!validateFields()} onClick={onClose}>Salvar</Button>}

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default function GoodsPage() {
    const [isEditModalOpen, setEditModalOpen] = useState(false)
    const [isValidationModalOpen, setValidationModalOpen] = useState(false)
    const [validationAssetId, setValidationAssetId] = useState()


    function openEditModal() { setEditModalOpen(true) }
    function closeEditModal() { setEditModalOpen(false) }
    function openValidationModal(assetId) {
        setValidationModalOpen(true)
        setValidationAssetId(assetId)
    }
    function closeValidationModal() { setValidationModalOpen(false) }

    const cards = Array(10).fill((<Grid item xs={3} sx={{ maxWidth: 345 }}><Card>
        <CardActionArea onClick={openEditModal} >
            <CardMedia
                component="img"
                height="140"
                image="https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    assetName
                </Typography>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="overline">
                        Localização
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Sala
                    </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="overline">
                        Código do patrimonio
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        1234
                    </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="overline">
                        Cadastrado por
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Vinicius
                    </Typography>
                </Box>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button onClick={openEditModal} size="small">Detalhes</Button>
            <Button onClick={e => openValidationModal(5)} size="small">Validações</Button>
            <Button color={"error"} size="small">Excluir</Button>
        </CardActions>
    </Card></Grid>))

    return (
        <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container component="main" maxWidth={"lg"}>
                    <Grid container spacing={1} direction={"column"}>
                        <Grid item xs={3}>
                            <Paper sx={{p: "14px", display: "flex", justifyContent: "space-around"}}>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Filtrar por nome" />

                                <TextField size={"small"} id="name-filter" label="Nome" variant="outlined" />

                                <FormControlLabel control={<Checkbox defaultChecked />} label="Filtrar por localização" />

                                <TextField size={"small"} id="location-filter" label="Localização" variant="outlined" />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    // sx={{ mt: 3, mb: 2 }}
                                >
                                    Filtrar
                                </Button>
                            </Paper>
                        </Grid>

                        <Grid item xs={9}>
                            <Grid container spacing={1}>
                                {cards}
                            </Grid>
                        </Grid>

                        {/*<Card sx={{ maxWidth: 345 }}>*/}
                        {/*    <CardMedia*/}
                        {/*        component="img"*/}
                        {/*        height="140"*/}
                        {/*        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"*/}
                        {/*        alt="green iguana"*/}
                        {/*    />*/}
                        {/*    <CardContent>*/}
                        {/*        <Typography gutterBottom variant="h5" component="div">*/}
                        {/*            Lizard*/}
                        {/*        </Typography>*/}
                        {/*        <Typography variant="body2" color="text.secondary">*/}
                        {/*            Lizards are a widespread group of squamate reptiles, with over 6,000*/}
                        {/*            species, ranging across all continents except Antarctica*/}
                        {/*        </Typography>*/}
                        {/*    </CardContent>*/}
                        {/*    <CardActions>*/}
                        {/*        <Button size="small">Share</Button>*/}
                        {/*        <Button size="small">Learn More</Button>*/}
                        {/*    </CardActions>*/}
                        {/*</Card>*/}
                    </Grid>

                </Container>
                {/*<FormDialog data={{"name": "Asset", "assetNumber": 123, "location": "Bla"}} isOpen={isEditModalOpen} onClose={closeEditModal}></FormDialog>*/}
                <FormDialog isOpen={isEditModalOpen} onClose={closeEditModal}></FormDialog>
                <ValidationsDialog isOpen={isValidationModalOpen} assetId={validationAssetId} onClose={closeValidationModal}></ValidationsDialog>
        </ThemeProvider>
    );
}
