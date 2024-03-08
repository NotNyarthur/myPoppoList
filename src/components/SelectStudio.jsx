import { useState } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import ShowStudios from "./ShowStudios";

export default function SelectStudio({ studios, handleStudio }) {
  const [newStudio, setNewStudio] = useState("");

  const handleInputStudio = () => {
    if (!newStudio) {
      alert("Ingresa al menos un estudio de animación");
      return;
    }
    handleStudio(newStudio);
    setNewStudio("");
  };

  return (
    <FormControl className="pb-4">
      <FormLabel>Estudio</FormLabel>
      <Input
        placeholder="A1 Pictures"
        value={newStudio}
        onChange={(e) => setNewStudio(e.target.value)}
        required
      />
      <Button onClick={() => handleInputStudio(studio)} size="sm">
        Agregar estudio
      </Button>
      <Typography>
        <p>
          Estudios agregados: <ShowStudios studios={studios} />
        </p>
      </Typography>
    </FormControl>
  );
}
