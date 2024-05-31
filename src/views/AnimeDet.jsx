import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimeById, useData } from "../hooks/theAxiosThing";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import LinearProgress from "@mui/joy/LinearProgress";
import Alert from "@mui/joy/Alert";
import { updateField } from "../components/UtilitiesDetail";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import { uploadFile } from "../services/storageService";
import Button from "@mui/material/Button";

export default function AnimeDet() {
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAnimeById(id)
      .then((data) => {
        if (!data) {
          setError("Error recuperando los datos");
          setLoading(false);
          return;
        }
        setAnime(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error recuperando los datos");
        setLoading(false);
      });
  }, [id]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const day = date.getUTCDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    // Devolver la fecha formateada en el formato deseado
    return `${day} de ${month} de ${year}`;
  }

  const formatTL = {
    TV: "Serie de TV",
    OVA: "OVA",
    ONA: "ONA",
    Movie: "Película",
    Special: "Especial",
  };

  if (loading) return <LinearProgress color="success" variant="soft" />;
  if (error) return <Alert color="danger">Error: {error.message} </Alert>;

  const defaultImageUrl =
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg";
  return (
    <div className="container mx-auto grid grid-cols-1 items-center max-w-screen-xl h-dvh gap-16 px-4 py-4 sm:px-6 lg:px-8 lg:grid-cols-3">
      <div className="flex col-span-2 flex-col order-2 lg:order-1">
        <div className="text-3xl font-bold">
          <Typography level="h2">
            <span className="text-md text-justify">{anime.name}</span>
          </Typography>
        </div>
        <Typography level="h4" color="neutral">
          {anime.englishname}
        </Typography>
        <Divider />
        <div className="py-4">
          <AccordionGroup>
            <Accordion
              expanded={index === 0}
              onChange={(event, expanded) => {
                setIndex(expanded ? 0 : null);
              }}
            >
              <AccordionSummary>
                <Typography level="title-lg">Sinopsis</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-justify">
                  <span className="text-md">{anime.synopsis}</span>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={index === 1}
              onChange={(event, expanded) => {
                setIndex(expanded ? 1 : null);
              }}
            >
              <AccordionSummary>
                <Typography level="title-lg">Información técnica</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <span className="font-semibold">Formato:</span>{" "}
                      <span>
                        {anime && anime.format
                          ? formatTL[anime.format] || "Agregar formato"
                          : "Agregar formato"}
                      </span>
                    </ListItemContent>
                  </ListItem>
                  {anime && anime.start_date !== anime.end_date ? (
                    <>
                      <ListItem>
                        <ListItemDecorator>
                          <TaskAltIcon fontSize="small" />
                        </ListItemDecorator>
                        <ListItemContent>
                          <Typography>
                            <span className="font-semibold">
                              Fecha de inicio:
                            </span>{" "}
                            <span>
                              {anime && anime.start_date
                                ? formatDate(anime.start_date)
                                : "Agregar fecha de inicio"}
                            </span>
                          </Typography>
                        </ListItemContent>
                      </ListItem>
                      <ListItem>
                        <ListItemDecorator>
                          <TaskAltIcon fontSize="small" />
                        </ListItemDecorator>
                        <ListItemContent>
                          <Typography>
                            <span className="font-semibold">Fecha de fin:</span>{" "}
                            <span>
                              {anime && anime.end_date
                                ? formatDate(anime.end_date)
                                : "Agregar fecha de fin"}
                            </span>
                          </Typography>
                        </ListItemContent>
                      </ListItem>
                    </>
                  ) : (
                    <ListItem>
                      <ListItemDecorator>
                        <TaskAltIcon fontSize="small" />
                      </ListItemDecorator>
                      <ListItemContent>
                        <Typography>
                          <span className="font-semibold">
                            Fecha de emisión:
                          </span>{" "}
                          <span>
                            {anime && anime.start_date
                              ? formatDate(anime.start_date)
                              : "Agregar fecha de inicio"}
                          </span>
                        </Typography>
                      </ListItemContent>
                    </ListItem>
                  )}
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">Temporada:</span>{" "}
                        {anime && anime.season
                          ? anime.season
                          : "Agregar temporada"}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">Episodios:</span>{" "}
                        {anime && anime.episodios}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">Duración:</span>{" "}
                        {anime && anime.ep_duration ? anime.ep_duration : "XYZ"}{" "}
                        mins. por episodio
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">Géneros:</span>{" "}
                        {anime && anime.genres && anime.genres.length > 0
                          ? anime.genres
                              .map((genre) => genre.genre.name)
                              .join(", ")
                          : "Agregar géneros"}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">Estudio:</span>{" "}
                        {anime && anime.studios && anime.studios.length > 0
                          ? anime.studios
                              .map((studio) => studio.studio.name)
                              .join(", ")
                          : "Agregar estudios"}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={index === 2}
              onChange={(event, expanded) => {
                setIndex(expanded ? 2 : null);
              }}
            >
              <AccordionSummary>
                <Typography level="title-lg">Información extra</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">Nombre en inglés:</span>{" "}
                        {anime && anime.englishname
                          ? anime.englishname
                          : "Agregar un nombre en inglés"}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">
                          Nombre en japonés:
                        </span>{" "}
                        {anime && anime.japanesename
                          ? anime.japanesename
                          : "Agregar un nombre en japonés"}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </div>
      </div>
      <div className="col-span-2 flex order-1 justify-center lg:col-span-1 sm:order-1 md:order-1 lg:order-2">
        <img
          src={anime.picture || defaultImageUrl}
          alt="animecover"
          className="rounded-md mx-auto"
        />
      </div>
    </div>
  );
}
