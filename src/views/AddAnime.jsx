import React, { useEffect, useState, useRef } from "react";
import {
  getGenresData,
  getStudiosData,
  saveAnime,
  uploadPicture,
} from "../hooks/theAxiosThing";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Add from "@mui/icons-material/Add";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import Autocomplete from "@mui/joy/Autocomplete";
import Textarea from "@mui/joy/Textarea";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SuccessDialog from "../components/SuccessDialog";

export default function AddAnime() {
  const [form, setForm] = useState({
    name: "",
    season: "",
    format: "TV",
    start_date: "",
    end_date: "",
    episodios: 1,
    ep_duration: 1,
    englishname: "",
    japanesename: "",
    picture: "",
    synopsis: "",
    studios: [],
    genres: [],
  });

  const [values, setValues] = useState([]);
  const [currValue, setCurrValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imagenAnime, setImagenAnime] = useState(null);
  const [genres, setGenres] = useState([]);
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    getGenresData().then((data) => setGenres(data));
    getStudiosData().then((data) => setStudios(data));
  }, []);

  const handleGenreChange = (event, values) => {
    const selectedGenres = values.map((value) => ({ genreId: value.id }));
    setForm({ ...form, genres: selectedGenres });
  };

  const handleStudioChange = (event, values) => {
    const selectedStudios = values.map((value) => ({ studioId: value.id }));
    setForm({ ...form, studios: selectedStudios });
  };

  const changeForm = (evento) => {
    const copyStateForm = {
      ...form,
      [evento.target.name]: evento.target.value,
    };
    console.log("COPYSTATEFORM", copyStateForm);
    setForm(copyStateForm);
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...values];
    arr.splice(index, 1);
    setValues(arr);
    changeForm({ target: { name: "studios", value: arr } });
  };

  const handleImage = (evento) => {
    setImagenAnime(evento.target.files[0]);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    if (!form.picture) {
      form.picture =
        "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg";
    }

    setIsLoading(true);

    try {
      let updatedForm = { ...form };

      if (imagenAnime) {
        const formData = new FormData();
        formData.append("image", imagenAnime);

        const secure_url = await uploadPicture(formData);
        updatedForm.picture = secure_url.picture;
      }
      console.log(updatedForm.picture)
      console.log(updatedForm)
      await saveAnime(updatedForm);

      handleClose();

      if (formRef.current) {
        formRef.current.reset();
        setForm({
          name: "",
          season: "",
          format: "TV",
          start_date: "",
          end_date: "",
          episodios: 1,
          ep_duration: 1,
          englishname: "",
          japanesename: "",
          picture: "",
          synopsis: "",
          studios: [],
          genres: [],
        });
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error handling add:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
  };

  return (
    <div className="container size-full mx-auto max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <Typography>
        <span className="font-bold text-2xl pb-4">
          Agregar un anime a la base de datos
        </span>
      </Typography>
      <form
        className="py-4"
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          alert(JSON.stringify(formJson));
        }}
      >
        <FormControl className="pb-4">
          <FormLabel>Nombre</FormLabel>
          <Input
            placeholder="Shingeki no Kyojin"
            required
            name="name"
            onChange={(evento) => {
              changeForm(evento);
            }}
          />
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Tipo</FormLabel>
          <Autocomplete
            required
            placeholder="Escribe para buscar..."
            options={tipoAnime}
            name="format"
            getOptionLabel={(option) => option.label} // Así solo usa la etiqueta y no todo el objeto
            onChange={(evento, value) => {
              if (value) {
                changeForm({ target: { name: "format", value: value.value } }); // Y aquí solo devuelve el valor
              }
            }}
          />
          <FormHelperText>Escoge una de las opciones.</FormHelperText>
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Número de episodios</FormLabel>
          <Input
            type="number"
            placeholder="1"
            required
            name="episodes"
            onChange={(evento) => {
              changeForm({
                target: {
                  name: evento.target.name,
                  value: parseInt(evento.target.value),
                },
              });
            }}
            slotProps={{
              input: {
                min: 1,
              },
            }}
          />
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Fecha de inicio</FormLabel>
          <Input
            type="date"
            required
            name="start_date"
            onChange={(evento) => {
              changeForm(evento);
            }}
          />
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Fecha de fin</FormLabel>
          <Input
            type="date"
            required
            name="end_date"
            onChange={(evento) => {
              changeForm(evento);
            }}
          />
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Temporada</FormLabel>
          <Input
            placeholder="Invierno 2020"
            required
            name="season"
            onChange={(evento) => {
              changeForm(evento);
            }}
          />
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Estudios</FormLabel>
          <Autocomplete
            multiple
            required
            placeholder="Escribe para buscar..."
            options={studios}
            name="studios"
            getOptionLabel={(option) => option.name}
            onChange={(evento, values) => {
              const selectedStudios = values.map((value) => ({
                studioId: value.id,
              })); // Crear un array de objetos { studioId: id }
              changeForm({
                target: { name: "studios", value: selectedStudios },
              }); // Usa el array de objetos como el valor para el campo "studios"
            }}
          />
          <FormHelperText>Puedes escoger varias opciones.</FormHelperText>
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Sinopsis</FormLabel>
          <Textarea
            placeholder="Escribe una sinopsis"
            required
            name="synopsis"
            onChange={(evento) => {
              changeForm(evento);
            }}
          />
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Géneros</FormLabel>
          <Autocomplete
            multiple
            required
            placeholder="Escribe para buscar..."
            options={genres}
            name="genres"
            getOptionLabel={(option) => option.name}
            onChange={(evento, values) => {
              const selectedGenres = values.map((value) => ({
                genreId: value.id,
              }));
              changeForm({ target: { name: "genres", value: selectedGenres } });
            }}
          />
          <FormHelperText>Puedes escoger varias opciones.</FormHelperText>
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Nombre en inglés</FormLabel>
          <Input
            placeholder="Attack on Titan"
            required
            name="englishname"
            onChange={(evento) => {
              changeForm(evento);
            }}
          />
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Nombre en japonés</FormLabel>
          <Input
            placeholder="進撃の巨人"
            required
            name="japanesename"
            onChange={(evento) => {
              changeForm(evento);
            }}
          />
        </FormControl>
        <FormControl className="pb-4">
          <FormLabel>Duración por episodio</FormLabel>
          <Input
            type="number"
            placeholder="1"
            required
            name="ep_duration"
            onChange={(evento) => {
              changeForm({
                target: {
                  name: evento.target.name,
                  value: parseInt(evento.target.value),
                },
              });
            }}
            slotProps={{
              input: {
                min: 1,
              },
            }}
          />
          <FormHelperText>La duración es en minutos.</FormHelperText>
        </FormControl>
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-x-4 items-center">
          <FormControl className="basis-1/2">
            <FormLabel>Imagen</FormLabel>
            <Input
              placeholder="Pega aquí el enlace..."
              required
              name="picture"
              onChange={(evento) => {
                changeForm(evento);
              }}
            />
          </FormControl>
          <FormControl className="basis-1/2">
            <FormLabel type="file">Imagen</FormLabel>
            <Input
              placeholder="Aquí va el archivo..."
              type="file"
              required
              onChange={handleImage}
            />
          </FormControl>
        </div>
        <FormHelperText className="pb-4">
          Puedes agregarlo mediante un enlace o subirlo.
        </FormHelperText>

        <Input placeholder="¡Recuerda rellenar todos los campos!" disabled />
      </form>
      <React.Fragment>
        <div className="py-4 text-lg text-center">
          <Button
            startDecorator={<Add />}
            type="button"
            onClick={handleClickOpen}
            disabled={isLoading}
            loadingIndicator="Loading…"
            sx={{
              "--IconButton-size": "36px",
            }}
          >
            {isLoading ? "Cargando..." : "Agregar anime"}
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Se va a guardar todo."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Estás segurísimo que deseas continuar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="soft" color="danger">
              Cancelar
            </Button>
            <Button
              onClick={handleAdd}
              variant="plain"
              color="success"
              autoFocus
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <SuccessDialog open={dialogOpen} handleClose={handleCloseDialog} />
      </React.Fragment>
    </div>
  );
}

const tipoAnime = [
  { label: "TV", value: "TV" },
  { label: "Película", value: "Movie" },
  { label: "ONA", value: "ONA" },
  { label: "OVA", value: "OVA" },
  { label: "Especial", value: "Special" },
];

