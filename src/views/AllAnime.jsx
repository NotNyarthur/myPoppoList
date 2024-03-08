import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";

export default function AllAnime() {
  const [anime, setAnime] = useState([]);
  const { id } = useParams();
  //data solo representa un producto
  const { data, error, isLoading } = useData(
    `${import.meta.env.VITE_ENDPOINT_BASE}/anime/`
  );

  if (isLoading) return <LinearProgress color="success" variant="soft" />;
  if (error) return <Alert color="danger">Error: {error.message} </Alert>;

  useEffect(() => {
    setAnime(data);
    console.log(data);
  }, [data]);

  return (
    <div className="container mx-auto size-full max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <Typography level="h2">Todos los animes</Typography>
      <div className="container grid grid-cols-1 max-w-screen-xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {anime.map((anime) => (
          <Link to={`/detail/${anime.id}`}>
            <AspectRatio
              ratio="9/12"
              sx={{ width: 250 }}
              className="rounded-xl"
            >
              <Card sx={{ flexGrow: 1 }} variant="plain">
                <CardCover
                  sx={{ width: "100%", height: "auto" }}
                  className="rounded-xl"
                >
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={anime.picture}
                      srcSet={anime.picture}
                      loading="lazy"
                      alt=""
                      style={{ width: "100%", height: "auto" }}
                      cla
                      ssName="object-cover"
                    />
                  </div>
                </CardCover>

                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 100%)",
                  }}
                />
                <CardContent
                  className="justify-end"
                  sx={{ width: 250, paddingBottom: 1, paddingX: 1.5 }}
                >
                  <Typography
                    level="title-lg"
                    textColor="#fff"
                    variant="soft"
                    sx={{
                      background: "rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {anime.name}
                  </Typography>
                  <Typography
                    textColor="neutral.300"
                    level="body-xs"
                    variant="soft"
                    sx={{
                        background: "rgba(0, 0, 0, 0.3)",
                      }}
                  >
                    {anime.genres.join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </AspectRatio>
          </Link>
        ))}
      </div>
    </div>
  );
}
