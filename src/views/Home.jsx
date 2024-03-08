/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import Box from '@mui/system/Box';

export default function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        "& > div": {
          scrollSnapAlign: "start",
        },
      }}
    >
      <div className="container mx-auto text-center px-4 sm:px-6 lg:px-8 sm:text-center md:text-center lg:text-left xl:text-left relative flex flex-col size-full items-center sm:flex-col md:flex-col lg:flex-row xl:flex-row max-w-screen-xl">
        <div className="px-0.5">
          <Typography level="h2">
            <span className="text-blue-600 text-lg py-2 font-semibold">
              Todo en un solo lugar... algún día
            </span>
          </Typography>
          <Typography level="h1">
            <span
              className="text-xl font-bold py-2 leading-none"
              style={{
                fontSize: "clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)",
              }}
            >
              Tu nueva plataforma de anime favorita
            </span>
          </Typography>
          <Typography>
            <span className="text-lg py-2">
              La plataforma aún está en desarrollo, estará completa algún día.
            </span>
          </Typography>
          <Link className="py-2" to="/allanime">
            <Button size="lg">
              Comienza a explorar
            </Button>
          </Link>
          <Typography>
            <span className="text-base py-2">
              ¿Deseas agregar uno a la base de datos?{" "}
              <Link
                className="text-blue-600 hover:text-blue-900"
                to="/addanime"
              >
                Clic aquí
              </Link>
              .
            </span>
          </Typography>
        </div>
        <div className="px-0.5 mx-auto">
          <img
            src="./poppoimagenbig.jpg"
            alt=""
            className="rounded-lg max-w-screen-sm"
          />
        </div>
      </div>
    </Box>
  );
}
