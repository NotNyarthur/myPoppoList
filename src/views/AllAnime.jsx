import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnimeData } from "../hooks/theAxiosThing";
import Typography from "@mui/joy/Typography";
import LinearProgress from "@mui/joy/LinearProgress";
import Alert from "@mui/joy/Alert";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import AspectRatio from "@mui/joy/AspectRatio";

export default function AllAnime() {
  const [anime, setAnime] = useState([]);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAnimeData()
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
  }, []);

  if (loading) return <LinearProgress color="success" variant="soft" />;
  if (error) return <Alert color="danger">Error: {error.message} </Alert>;

  return (
    <div className="container mx-auto size-full max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <Typography level="h2">Todos los animes</Typography>
      <div className="container grid grid-cols-1 max-w-screen-xl gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {anime.map((anime) => (
          <div key={anime.id}>
            <Link to={`/detail/${anime.id}`}>
              <AspectRatio
                ratio="9/12"
                sx={{ width: 250 }}
                className="rounded-xl"
              >
                <Card sx={{ flexGrow: 1, bgcolor: "initial" }} variant="plain">
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
                        className="object-cover"
                      />
                    </div>
                  </CardCover>

                  <CardCover
                    sx={{
                      background:
                        "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
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
                      textColor="neutral.100"
                      level="body-xs"
                      variant="soft"
                      sx={{
                        background: "rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {anime.genres.map((genre) => genre.genre.name).join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </AspectRatio>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
