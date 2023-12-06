export const imageReader = (data, file, setImage) => {
  const reader = new FileReader();
  reader.onload = () => {
    const dataURL = reader.result;
    data.value = reader.result;
    data.flag = true;
    setImage(dataURL);
  };
  reader.readAsDataURL(file);
};
