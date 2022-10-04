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
import {CardActionArea, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab} from "@mui/material";
import {useState, useContext, useEffect} from "react";
import {DataContext} from "../App";
import {api} from "../api";
import AddIcon from '@mui/icons-material/Add';



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

function FormDialog({ isOpen, onClose, data, reloadGoods }) {
    const isCreation = !data || !data.id
    const [currentData, setCurrentData] = useState(data || {})
    const [hasChanges, setHasChanges] = useState(false)
    const [file, setFile] = useState()

    useEffect(() => {
        setCurrentData(data || {}) }, [data])

    function fieldSetter(field) { return e => {
        setCurrentData({...currentData, [field]: e.target.value})
        setHasChanges(true)
    } }

    function validateFields() {
        return !!currentData.name && currentData.name.length >= 1 &&
            !!currentData.location && currentData.location.length >= 1 &&
                !!currentData.assetNumber && !!file && hasChanges
    }

    function getFormData() {
        const formData = new FormData()

        formData.append("file", file)
        formData.append("name", currentData.name)
        formData.append("assetNumber", currentData.assetNumber)
        formData.append("location", currentData.location)

        return formData
    }

    function createGood() {
        api
            .post("users/assets", getFormData(), { headers: {"Content-Type": "multipart/form-data"} })
            .then(e => reloadGoods())
            .then(e => {
                setFile()
                onClose()
            })

    }

    function updateGood() {
        api
            .put(`users/assets/${currentData.id}`, getFormData(), { headers: {"Content-Type": "multipart/form-data"} })
            .then(e => reloadGoods())
            .then(e => {
                setFile()
                onClose()
            })
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
                        <Button disabled={!validateFields()} onClick={createGood}>Cadastrar</Button> :
                        <Button disabled={!validateFields()} onClick={updateGood}>Salvar</Button>}

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default function GoodsPage() {
    const [isEditModalOpen, setEditModalOpen] = useState(false)
    const [selectedGood, setSelectedGood] = useState()
    const [isValidationModalOpen, setValidationModalOpen] = useState(false)
    const [validationGoodId, setValidationGoodId] = useState()
    const { data, setData } = useContext(DataContext)
    const [filters, setFilters] = useState({ nameOn: false, locationOn: false, name: "", location: "" })

    useEffect(() => {
        loadGoods()
    }, [])

    function loadGoods() {
        const nameQuery = filters.nameOn && filters.name.trim().length > 0 ? { name: filters.name } : {}
        const locationQuery = filters.locationOn && filters.location.trim().length > 0 ? { location: filters.location } : {}

        return api
            .get("/users/assets", { params: {...nameQuery, ...locationQuery} })
            .then(r => setData({...data, goodsList: r.data}))
    }

    const goodsList = data.goodsList || []

    function openEditModal(good) {
        setEditModalOpen(true)
        setSelectedGood(good)
    }

    function closeEditModal() { setEditModalOpen(false) }
    function openValidationModal(assetId) {
        setValidationModalOpen(true)
        setValidationGoodId(assetId)
    }
    function closeValidationModal() { setValidationModalOpen(false) }

    const cards = goodsList.map(good => (<Grid key={good.id} item xs={3} sx={{ maxWidth: 345 }}><Card>
        <CardActionArea onClick={e => openEditModal(good)} >
            <CardMedia
                component="img"
                height="140"
                image="https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {good.name}
                </Typography>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="overline">
                        Localização
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {good.location}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="overline">
                        Código do patrimonio
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {good.assetNumber}
                    </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="overline">
                        Cadastrado por
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {good.user.fullName}
                    </Typography>
                </Box>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button onClick={e => openEditModal(good)} size="small">Detalhes</Button>
            <Button onClick={e => openValidationModal(5)} size="small">Validações</Button>
            <Button color={"error"} size="small">Excluir</Button>
        </CardActions>
    </Card></Grid>))

    function checkFilter(name) {
        return (e) => setFilters({...filters, [name]: e.target.checked})
    }

    function includeFilter(name) {
        return (e) => setFilters({...filters, [name]: e.target.value})
    }

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
                                Bens
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container component="main" maxWidth={"lg"}>
                    <Grid container spacing={1} direction={"column"}>
                        <Grid item xs={3}>
                            <Paper sx={{p: "14px", display: "flex", justifyContent: "space-around"}}>
                                <FormControlLabel control={<Checkbox onChange={checkFilter("nameOn")}
                                                                     value={filters.nameOn} />} label="Filtrar por nome" />

                                <TextField onChange={includeFilter("name")}
                                           disabled={!filters.nameOn}
                                           size={"small"}
                                           id="name-filter"
                                           label="Nome"
                                           variant="outlined" />

                                <FormControlLabel control={<Checkbox onChange={checkFilter("locationOn")}
                                                                     value={filters.locationOn} />} label="Filtrar por localização" />

                                <TextField onChange={includeFilter("location")}
                                           disabled={!filters.locationOn}
                                           size={"small"}
                                           id="location-filter"
                                           label="Localização"
                                           variant="outlined" />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={loadGoods}
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
                    </Grid>

                    <Fab onClick={e => openEditModal({name: "", location: "", assetNumber: ""})} color="primary" aria-label="add" sx={{position: 'fixed', bottom: 30, right: 30}}>
                        <AddIcon />
                    </Fab>

                </Container>

                <FormDialog reloadGoods={loadGoods} data={selectedGood} isOpen={isEditModalOpen} onClose={closeEditModal}></FormDialog>
                <ValidationsDialog isOpen={isValidationModalOpen} assetId={validationGoodId} onClose={closeValidationModal}></ValidationsDialog>
        </ThemeProvider>
    );
}
