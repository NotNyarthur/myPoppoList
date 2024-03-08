import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../hooks/theAxiosThing";
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

export default function AnimeDetail() {
  const [index, setIndex] = React.useState(0);
  const { id } = useParams();
  //data solo representa un producto
  const { data, error, loading } = useData(
    `${import.meta.env.VITE_ENDPOINT_BASE}/anime/${id}`
  );

  const [anime, setAnime] = useState([]);
  useEffect(() => {
    setAnime(data);
    console.log(data);
  }, [data]);

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

  const [editEpisodes, setEditEpisodes] = useState(false);
  const [newEpisodesValue, setNewEpisodesValue] = useState(
    anime.episodes || ""
  );

  const [editSynopsis, setEditSynopsis] = useState(false);
  const [newSynopsisValue, setNewSynopsisValue] = useState(
    anime.synopsis || ""
  );

  const [editName, setEditName] = useState(false);
  const [newNameValue, setNewNameValue] = useState(anime.name || "");

  const [editSeason, setEditSeason] = useState(false);
  const [newSeasonValue, setNewSeasonValue] = useState(anime.season || "");

  const [editStartDate, setEditStartDate] = useState(false);
  const [newStartDateValue, setNewStartDateValue] = useState(
    anime.startdate || ""
  );

  const [editEndDate, setEditEndDate] = useState(false);
  const [newEndDateValue, setNewEndDateValue] = useState(anime.enddate || "");

  const [editFormat, setEditFormat] = useState(false);
  const [newFormatValue, setNewFormatValue] = useState("");

  const [editStudios, setEditStudios] = useState(false);
  const [newStudiosValue, setNewStudiosValue] = useState(anime.studios || []);

  const [currValue, setCurrValue] = useState(""); // Estado para el valor actual del input

  useEffect(() => {
    setNewStudiosValue(anime.studios || []);
  }, []);

  const handleDoubleClick = () => {
    setEditStudios(true); // Habilita la edición de los estudios al hacer doble click
  };

  const handleChange = (event) => {
    setCurrValue(event.target.value); // Actualiza el valor del input a medida que se escribe
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateField("studios", newStudiosValue, anime.id, setAnime);
      setEditStudios(false);
    } else if (event.key === "," || event.keyCode === 188) {
      event.preventDefault();
      const trimmedValue = currValue.trim();
      if (trimmedValue) {
        // Agrega el valor actual del input al array de estudios solo si no está vacío
        const updatedValues = [...newStudiosValue, trimmedValue];
        setNewStudiosValue(updatedValues);
        setCurrValue(""); // Borra el valor actual del input
      }
    }
  };

  const handleDelete = (index) => {
    // Elimina un valor del array de newStudiosValue basado en su índice
    const updatedStudios = [...newStudiosValue];
    updatedStudios.splice(index, 1);
    setNewStudiosValue(updatedStudios);
  };

  const [editGenres, setEditGenres] = useState(false);
  const [newGenresValue, setNewGenresValue] = useState(anime.genres || []);

  const [editEnglishName, setEditEnglishName] = useState(false);
  const [newEnglishNameValue, setNewEnglishNameValue] = useState(
    anime.englishname || ""
  );

  const [editJapaneseName, setEditJapaneseName] = useState(false);
  const [newJapaneseNameValue, setNewJapaneseNameValue] = useState(
    anime.japanesename || ""
  );

  const [editPicture, setEditPicture] = useState(false);
  const [newPictureValue, setNewPictureValue] = useState(anime.picture || "");
  const defaultImageUrl =
    "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg";

  const handleBlur = () => {
    setEditPicture(false);
  };

  const [urlInput, setUrlInput] = useState("");
  const [fileInput, setFileInput] = useState(null);

  const savePicture = () => {
    if (fileInput) {
      // Sube el archivo y actualiza la URL de la imagen
      uploadFile(fileInput, "anime").then((urlImagen) => {
        setNewPictureValue(urlImagen);
        updateField("picture", urlImagen, anime.id, setAnime);
      });
    } else if (urlInput) {
      // Actualiza la URL de la imagen
      setNewPictureValue(urlInput);
      updateField("picture", urlInput, anime.id, setAnime);
    }
    // Oculta el formulario de edición
    setEditPicture(false);
  };

  const [editEpDuration, setEditEpDuration] = useState(false);
  const [newEpDurationValue, setNewEpDurationValue] = useState(
    anime.epduration || ""
  );

  if (loading) return <LinearProgress color="success" variant="soft" />;
  if (error) return <Alert color="danger">Error: {error.message} </Alert>;

  return (
    <div className="container mx-auto grid grid-cols-1 items-center max-w-screen-xl h-dvh gap-16 px-4 py-4 sm:px-6 lg:px-8 lg:grid-cols-3">
      <div className="flex col-span-2 flex-col order-2 lg:order-1 ">
        <div className="text-3xl font-bold">
          {editName ? (
            <Input
              value={newNameValue}
              onChange={(e) => setNewNameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateField("name", newNameValue, anime.id, setAnime);
                  setEditName(false);
                }
              }}
              onBlur={() => setEditName(false)}
              autoFocus
            />
          ) : (
            <Typography level="h2">
              <p
                className="text-md text-justify"
                onDoubleClick={() => setEditName(true)}
              >
                {anime.name || "Agregar nombre"}
              </p>
            </Typography>
          )}
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
                {editSynopsis ? (
                  <Input
                    value={newSynopsisValue}
                    onChange={(e) => setNewSynopsisValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateField(
                          "synopsis",
                          newSynopsisValue,
                          anime.id,
                          setAnime
                        );
                        setEditSynopsis(false);
                      }
                    }}
                    onBlur={() => setEditSynopsis(false)}
                    autoFocus
                  />
                ) : (
                  <Typography>
                    <p
                      className="text-md text-justify"
                      onDoubleClick={() => setEditSynopsis(true)}
                    >
                      {anime.synopsis || "Agregar sinopsis"}
                    </p>
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion>
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
                      <Typography>
                        <span className="font-semibold">Formato:</span>{" "}
                        {anime && editFormat ? (
                          <Autocomplete
                            value={
                              tipoAnime.find(
                                (option) => option.label === newFormatValue
                              ) || null
                            }
                            options={tipoAnime}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => {
                              if (newValue) {
                                setNewFormatValue(newValue.label);
                              } else {
                                setNewFormatValue("");
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "format",
                                  newFormatValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditFormat(false);
                              }
                            }}
                            onBlur={() => setEditFormat(false)}
                            autoFocus
                          />
                        ) : (
                          <span onDoubleClick={() => setEditFormat(true)}>
                            {anime && anime.format
                              ? anime.format
                              : "Agregar formato"}
                          </span>
                        )}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                  {anime && anime.startdate !== anime.enddate ? (
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
                            {editStartDate ? (
                              <Input
                                type="date"
                                value={newStartDateValue}
                                onChange={(e) =>
                                  setNewStartDateValue(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    updateField(
                                      "startdate",
                                      newStartDateValue,
                                      anime.id,
                                      setAnime
                                    );
                                    setEditStartDate(false);
                                  }
                                }}
                                onBlur={() => setEditStartDate(false)}
                                autoFocus
                              />
                            ) : (
                              <span
                                onDoubleClick={() => setEditStartDate(true)}
                              >
                                {anime && anime.startdate
                                  ? formatDate(anime.startdate)
                                  : "Añadir fecha de inicio"}
                              </span>
                            )}
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
                            {editEndDate ? (
                              <Input
                                type="date"
                                value={newEndDateValue}
                                onChange={(e) =>
                                  setNewEndDateValue(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    updateField(
                                      "enddate",
                                      newEndDateValue,
                                      anime.id,
                                      setAnime
                                    );
                                    setEditEndDate(false);
                                  }
                                }}
                                onBlur={() => setEditEndDate(false)}
                                autoFocus
                              />
                            ) : (
                              <span onDoubleClick={() => setEditEndDate(true)}>
                                {anime && anime.enddate
                                  ? formatDate(anime.enddate)
                                  : "Añadir fecha de fin"}
                              </span>
                            )}
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
                            Fecha de inicio:
                          </span>{" "}
                          {editStartDate ? (
                            <Input
                              type="date"
                              value={newStartDateValue}
                              onChange={(e) =>
                                setNewStartDateValue(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateField(
                                    "startdate",
                                    newStartDateValue,
                                    anime.id,
                                    setAnime
                                  );
                                  setEditStartDate(false);
                                }
                              }}
                              onBlur={() => setEditStartDate(false)}
                              autoFocus
                            />
                          ) : (
                            <span onDoubleClick={() => setEditStartDate(true)}>
                              {anime && anime.startdate
                                ? formatDate(anime.startdate)
                                : "Añadir fecha de inicio"}
                            </span>
                          )}
                        </Typography>
                      </ListItemContent>
                    </ListItem>
                  )}

                  {/* <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">Fecha de inicio:</span>{" "}
                        {anime && editStartDate ? (
                          <Input
                            type="date"
                            value={newStartDateValue}
                            onChange={(e) =>
                              setNewStartDateValue(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "startdate",
                                  newStartDateValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditStartDate(false);
                              }
                            }}
                            onBlur={() => setEditStartDate(false)}
                            autoFocus
                          />
                        ) : (
                          <span onDoubleClick={() => setEditStartDate(true)}>
                            {anime && anime.startdate
                              ? formatDate(anime.startdate)
                              : "Añadir fecha de inicio"}
                          </span>
                        )}
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
                        {anime && editEndDate ? (
                          <Input
                            type="date"
                            value={newEndDateValue}
                            onChange={(e) => setNewEndDateValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "enddate",
                                  newEndDateValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditEndDate(false);
                              }
                            }}
                            onBlur={() => setEditEndDate(false)}
                            autoFocus
                          />
                        ) : (
                          <span onDoubleClick={() => setEditEndDate(true)}>
                            {anime && anime.enddate
                              ? formatDate(anime.enddate)
                              : "Añadir fecha de fin"}
                          </span>
                        )}
                      </Typography>
                    </ListItemContent>
                  </ListItem> */}
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>
                        <span className="font-semibold">Temporada:</span>{" "}
                        {editSeason ? (
                          <Input
                            value={newSeasonValue}
                            onChange={(e) => setNewSeasonValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "season",
                                  newSeasonValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditSeason(false);
                              }
                            }}
                            onBlur={() => setEditSeason(false)}
                            autoFocus
                          />
                        ) : (
                          <span
                            className="text-md text-justify"
                            onDoubleClick={() => setEditSeason(true)}
                          >
                            {anime.season || "Agregar temporada"}
                          </span>
                        )}
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
                        {anime && editEpisodes ? (
                          <Input
                            type="number"
                            value={newEpisodesValue}
                            onChange={(e) =>
                              setNewEpisodesValue(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "episodes",
                                  newEpisodesValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditEpisodes(false);
                              }
                            }}
                            onBlur={() => setEditEpisodes(false)}
                            autoFocus
                          />
                        ) : (
                          <span onDoubleClick={() => setEditEpisodes(true)}>
                            {anime && anime.episodes
                              ? anime.episodes
                              : "Agregar episodios"}
                          </span>
                        )}
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
                        {anime && editEpDuration ? (
                          <Input
                            type="number"
                            value={newEpDurationValue}
                            onChange={(e) =>
                              setNewEpDurationValue(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "epduration",
                                  newEpDurationValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditEpDuration(false);
                              }
                            }}
                            onBlur={() => setEditEpDuration(false)}
                            autoFocus
                          />
                        ) : (
                          <span onDoubleClick={() => setEditEpDuration(true)}>
                            {anime && anime.epduration
                              ? anime.epduration
                              : "XYZ"}
                          </span>
                        )}{" "}
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
                        {anime && editGenres ? (
                          <Autocomplete
                            multiple
                            value={newGenresValue.map((label) => ({ label }))}
                            options={genAnime}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, values) => {
                              const selectedLabels = values.map(
                                (value) => value.label
                              );
                              setNewGenresValue(selectedLabels);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "genres",
                                  newGenresValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditGenres(false);
                              }
                            }}
                            onBlur={() => setEditGenres(false)}
                            autoFocus
                            isOptionEqualToValue={(option, value) =>
                              option.label === value.label
                            }
                          />
                        ) : (
                          <span onDoubleClick={() => setEditGenres(true)}>
                            {anime && anime.genres && anime.genres.length > 0
                              ? anime.genres.join(", ")
                              : "Ninguno agregado"}
                          </span>
                        )}
                      </Typography>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemDecorator>
                      <TaskAltIcon fontSize="small" />
                    </ListItemDecorator>
                    <ListItemContent className="flex flex-row items-center">
                      <Typography>
                        <span className="font-semibold">Estudios:&nbsp;</span>
                      </Typography>
                      <div
                        onKeyDown={(e) => {
                          if (editStudios && e.key === "Escape") {
                            setNewStudiosValue(anime.studios || []);
                            setEditStudios(false);
                          }
                        }}
                      >
                        {editStudios ? (
                          <div>
                            {newStudiosValue.map((item, index) => (
                              <Chip
                                key={index}
                                size="lg"
                                variant="solid"
                                onClick={(e) => e.stopPropagation()}
                                endDecorator={
                                  <ChipDelete
                                    onDelete={() => handleDelete(index)}
                                  />
                                }
                              >
                                {item}
                              </Chip>
                            ))}
                            <Input
                              placeholder="Escribe un estudio y presiona Enter o coma para agregarlo"
                              value={currValue}
                              onChange={handleChange}
                              onKeyDown={handleKeyUp}
                              autoFocus
                            />
                          </div>
                        ) : (
                          <Typography>
                            <span onDoubleClick={handleDoubleClick}>
                              {anime.studios && anime.studios.length > 0
                                ? anime.studios.join(", ")
                                : "Ninguno agregado"}
                            </span>
                          </Typography>
                        )}
                      </div>
                    </ListItemContent>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion>
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
                      <Typography className="flex flex-row">
                        <span className="font-semibold">Nombre en inglés:</span>{" "}
                        {editEnglishName ? (
                          <Input
                            value={newEnglishNameValue}
                            onChange={(e) =>
                              setNewEnglishNameValue(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "englishname",
                                  newEnglishNameValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditEnglishName(false);
                              }
                            }}
                            onBlur={() => setEditEnglishName(false)}
                            autoFocus
                          />
                        ) : (
                          <span
                            className="text-md text-justify"
                            onDoubleClick={() => setEditEnglishName(true)}
                          >
                            {anime.englishname || "Agregar nombre en inglés"}
                          </span>
                        )}
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
                        {editJapaneseName ? (
                          <Input
                            value={newJapaneseNameValue}
                            onChange={(e) =>
                              setNewJapaneseNameValue(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateField(
                                  "japanesename",
                                  newJapaneseNameValue,
                                  anime.id,
                                  setAnime
                                );
                                setEditJapaneseName(false);
                              }
                            }}
                            onBlur={() => setEditJapaneseName(false)}
                            autoFocus
                          />
                        ) : (
                          <span
                            className="text-md text-justify"
                            onDoubleClick={() => setEditJapaneseName(true)}
                          >
                            {anime.japanesename || "Agregar nombre en japonés"}
                          </span>
                        )}
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
        {/* <img
          src={anime.picture}
          alt="animecover"
          className="rounded-md mx-auto"
        /> */}
        <div>
          {editPicture ? (
            <div>
              <Input
                placeholder="Ingrese la URL de la imagen"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                autoFocus
              />
              <Input
                type="file"
                onChange={(event) => setFileInput(event.target.files[0])}
              />
              <Button onClick={savePicture}>Guardar URL</Button>
              <Button onClick={savePicture}>Guardar archivo</Button>
              <Button onClick={() => setEditPicture(false)}>Cancelar</Button>
            </div>
          ) : (
            <img
              src={anime.picture || defaultImageUrl}
              alt="animecover"
              className="rounded-md mx-auto"
              onDoubleClick={() => setEditPicture(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const tipoAnime = [
  { label: "TV" },
  { label: "Película" },
  { label: "ONA" },
  { label: "OVA" },
  { label: "Especial" },
];

const genAnime = [
  { label: "Acción" },
  { label: "Aventura" },
  { label: "Comedia" },
  { label: "Ciencia Ficción" },
  { label: "Comida" },
  { label: "Drama" },
  { label: "Ecchi" },
  { label: "Fantasía" },
  { label: "Mecha" },
  { label: "Misterio" },
  { label: "Amor entre chicos" },
  { label: "Amor entre chicas" },
  { label: "Romance" },
  { label: "Deportes" },
  { label: "Sobrenatural" },
  { label: "Suspenso" },
  { label: "Terror" },
  { label: "Vida diaria" },
  { label: "Vanguardia" },
];
