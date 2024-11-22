const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", options);
};

export default formatDate;
