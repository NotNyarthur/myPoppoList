const ShowStudios = ({ studios }) => {
  const studiosLista = studios.map((newStudio, indice) => {
    return <span key={indice}>{newStudio}</span>;
  });
  return studiosLista;
};

export default ShowStudios;
