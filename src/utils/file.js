export  const convertImageUrlToBase64 = (imageUrl) => {
    if (imageUrl) {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();

          reader.onload = () => {
            const base64ImageData = reader.result;
            return base64ImageData
          };

          reader.readAsDataURL(blob);
        });
    }
  };