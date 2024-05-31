import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { setUser } = useUser();
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      const token = response.data.access_token;

      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", username);
      setUser(username);
      navigate("/manageanime");
    } catch (error) {
      console.error("Error al ingresar: ", error);
      alert("Credenciales incorrectas");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          username,
          email,
          password,
        }
      );

      const token = response.data.access_token;

      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", username);
      setUser(username);
      navigate("/manageanime");
    } catch (error) {
      console.error("Error al ingresar: ", error);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container size-full mx-auto grid grid-cols-7 max-w-screen-xl gap-8 px-4 sm:px-6 lg:px-8">
      <div className="flex col-span-1 flex-col order-1"></div>
      <div className="flex col-span-2 flex-col order-2">
        <Typography>
          <span className="font-bold text-2xl">Iniciar sesión</span>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>Nombre de usuario:</FormLabel>
              <Input
                placeholder="Usuario"
                required
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                placeholder="Contraseña"
                required
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              ></Input>
            </FormControl>
            <Button variant="solid" color="primary" type="submit" autoFocus>
              Iniciar sesión
            </Button>
          </Stack>
        </form>
      </div>
      <div className="flex col-span-1 flex-col order-2"></div>
      <div className="flex col-span-2 flex-col order-3">
        <Typography>
          <span className="font-bold text-2xl">Regístrate</span>
        </Typography>
        <form onSubmit={handleSignUp}>
          <Stack spacing={1}>
            <FormControl>
              <FormLabel>Nombre de usuario:</FormLabel>
              <Input
                placeholder="Usuario"
                required
                name="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Correo electrónico:</FormLabel>
              <Input
                placeholder="correo@dominio.com"
                required
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                placeholder="Contraseña"
                required
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </FormControl>
            <Button variant="solid" color="primary" type="submit" autoFocus>
              Iniciar sesión
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}
