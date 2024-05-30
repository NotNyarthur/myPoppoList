import { updateAnime } from "../hooks/theAxiosThing";

export const updateField = (fieldName, newValue, animeId, setAnime) => {
  const updatedFields = { [fieldName]: newValue };
  updateAnime(animeId, updatedFields)
    .then((updatedAnime) => {
      setAnime(updatedAnime);
    })
    .catch((error) => {
      console.log(error);
    });
};
