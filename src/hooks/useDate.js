const useDate = () => ({
  formatToBrDate: (date) => new Date(date).toLocaleString("pt-BR"),
  formatToDefaultDate: (date) => new Date(date).toLocaleDateString('en-CA'),
});

export default useDate;
