export const getTasks = async () => {
  try {
    // Hacemos la petición GET a la URL del backend
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Aquí podrías agregar más cabeceras si lo necesitas, como autorización
        // 'Authorization': 'Bearer TU_TOKEN'
      },
    });

    // Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error("No se pudo obtener la información");
    }

    const result = await response.json(); // Convertimos la respuesta en un objeto

    return { data: result }; // Devolvemos los datos en una estructura { data: ... }
  } catch (error) {
    return Promise.reject(error); // Si ocurre un error, lo enviamos como una Promesa rechazada
  }
};
