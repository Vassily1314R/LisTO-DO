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

export const createTask = async (task) => {
  try {
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Error al crear la tarea");
    }
    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }

    const result = await response.json();
    return { data: result };
  } catch (error) {
    return Promise.reject(error);
  }
};
