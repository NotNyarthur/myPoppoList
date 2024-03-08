import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import { Link } from "react-router-dom";
import imagenlogo from "../assets/popposmug.webp";

export default function NavBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (inOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <>
      <div>
        <header className="bg-white">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <Link to="/" className="block text-teal-600">
              <span className="sr-only">Inicio</span>
              <img className="h-8" src={imagenlogo} alt="Ícono" />
            </Link>

            <div className="flex flex-1 items-center justify-end md:justify-between">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      to="/allanime"
                    >
                      {" "}
                      Todos los animes{" "}
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/manageanime"
                      className="text-gray-500 transition hover:text-gray-500/75"
                    >
                      {" "}
                      Administrar{" "}
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link
                    to="/addanime"
                    className="hidden rounded-md bg-[#0B6BCB] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#185EA5] sm:block"
                  >
                    Añadir anime
                  </Link>
                </div>

                <button
                  className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                  onClick={toggleDrawer(true)}
                >
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Box sx={{ display: "flex" }}>
        {/* <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
          Open drawer
        </Button> */}
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
          size="sm"
        >
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              ml: "auto",
              mt: 1,
              mr: "auto",
            }}
          >
            <List>
              <ListItem>
                <Link>Todos los animes</Link>
              </ListItem>
              <ListItem>
                <Link to="/manageanime">Administrar</Link>
              </ListItem>
            </List>
            <Divider />

            <Link
              to="/addanime"
              className="rounded-md bg-[#0B6BCB] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#185EA5] "
            >
              Añadir anime
            </Link>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}
