const useDate = () => ({
  formatToBrDate: (date) =>
    new Date(date).toLocaleString("pt-BR"),
});

export default useDate;
