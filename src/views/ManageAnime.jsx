import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, useData } from "../hooks/theAxiosThing";
import Table from "@mui/joy/Table";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Sheet from "@mui/joy/Sheet";

export default function ManageAnime() {
  const [anime, setAnime] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [selectedAnimeName, setSelectedAnimeName] = useState("");

  const { data, error, isLoading, refetch } = useData(
    `${import.meta.env.VITE_ENDPOINT_BASE}/anime`
  );

  if (isLoading) return <LinearProgress color="success" variant="soft" />;
  if (error) return <Alert color="danger">Error: {error.message} </Alert>;

  useEffect(() => {
    setAnime(data);
    console.log(data);
  }, [data]);

  const handleClickOpen = (animeId, animeName) => {
    setSelectedAnimeId(animeId);
    setSelectedAnimeName(animeName);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedAnimeId(null);
    setOpen(false);
  };

  const handleDelete = () => {
    if (selectedAnimeId !== null) {
      deleteProduct(selectedAnimeId)
        .then(() => {
          setOpen(false);
          refetch();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl items-center gap-8 px-4 sm:px-6 lg:px-8">
      <Typography level="h2">
        <span className="text-lg py-2 font-semibold">
          Lista de todo el anime
        </span>
      </Typography>
      <Sheet
        sx={{
          "--Table-firstColumnWidth": "250px",
          "--Table-lastColumnWidth": "180px",
          overflow: "auto",
        }}
      >
        <Table
          hoverRow
          variant="soft"
          borderAxis="x"
          sx={{
            "& tr > *:first-of-type": {
              position: "sticky",
              left: 0,
              bgcolor: "background.surface",
            },
            "& tr > *:last-child": {
              position: "sticky",
              right: 0,
              bgcolor: "var(--TableCell-headBackground)",
            },
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <caption>
            Aquí encontrarás el resumen simple de los animes agregados. Podrás
            verlo de forma más detallada o borrarlo desde aquí.
          </caption>
          <thead>
            <tr>
              <th style={{ width: "var(--Table-firstColumnWidth)" }}>Nombre</th>
              <th style={{ width: 80 }}>Tipo</th>
              <th style={{ width: 80 }}># Eps.</th>
              <th style={{ width: 100 }}>Duración</th>
              <th style={{ width: 150 }}>Estudios</th>
              <th style={{ width: 200 }}>Géneros</th>
              <th style={{ width: 200 }}>Nombre JP</th>
              <th
                aria-label="last"
                style={{ width: "var(--Table-lastColumnWidth)" }}
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {anime.map((anime) => (
              <tr key={anime.id}>
                <td>{anime.name}</td>
                <td>{anime.format}</td>
                <td>{anime.episodes}</td>
                <td>{anime.epduration} min.</td>
                <td>{anime.studios.join(", ")}</td>
                <td>{anime.genres.join(", ")}</td>
                <td>{anime.japanesename}</td>
                <td>
                  <Box sx={{ display: "flex", gap: 1 }} className="flex-wrap">
                    <Button size="sm" variant="plain" color="neutral">
                      <Link to={`/detail/${anime.id}`}>Detalles</Link>
                    </Button>
                    <React.Fragment>
                      <Button
                        size="sm"
                        variant="soft"
                        color="danger"
                        onClick={() => handleClickOpen(anime.id, anime.name)} // Pasa el animeId al hacer clic en "Borrar"
                      >
                        Borrar
                      </Button>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Se va a borrar este anime."}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            ¿Estás segurísimo que deseas continuar? Si
                            continúas, se eliminará{" "}
                            <span className="font-semibold">{selectedAnimeName}</span>{" "}
                            de la base de datos.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={handleClose}
                            variant="soft"
                            color="sucess"
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleDelete}
                            variant="plain"
                            color="danger"
                            autoFocus
                          >
                            Aceptar
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </React.Fragment>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
