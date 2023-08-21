export  const convertImageUrlToBase64 = async (imageUrl) => {
  const base64 = await fetch(imageUrl)
  .then(response => response.blob())
  .then(blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((res) => {
      reader.onloadend = (base) => {
      return base
    }})
  })
};