// Interfaces
interface CreateServiceDTO {
  name: string
  price: number
}

interface UpdateServiceDTO {
  name: string
  price: number
}

// Catering Services
export const createCateringService = async (serviceData: { name: string; price: number }) => {
  const response = await fetch("http://44.208.178.247:8071/cateringC/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    // ✅ Si la API devuelve texto en lugar de JSON, lo manejamos correctamente
    return { message: await response.text() };
  }
};



export async function fetchCateringServices() {
  try {
    const response = await fetch("http://44.208.178.247:8072/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getAllCatering {
              id_catering
              name
              price
            }
          }
        `,
      }),
    })
    const data = await response.json()
    return data.data.getAllCatering
  } catch (error) {
    console.error("Error fetching catering services:", error)
    throw error
  }
}
export async function updateCateringService(id: string, data: { name: string; price: number }) {
  try {
    const response = await fetch(`http://44.208.178.247:8073/cateringU/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() }; // ✅ Manejo de texto plano
    }
  } catch (error) {
    console.error("Error updating catering service:", error);
    throw error;
  }
}



export async function deleteCateringService(id: string) {
  try {
    const response = await fetch(`http://44.208.178.247:8074/cateringD/delete/${id}`, {
      method: "DELETE",
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() }; // ✅ Manejo de texto plano
    }
  } catch (error) {
    console.error("Error deleting decoration service:", error);
    throw error;
  }
}

// Music Services
export const createMusicService = async (serviceData: { name: string; price: number }) => {
  const response = await fetch("http://54.173.57.181:8061/musicC/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    // ✅ Si la API devuelve texto en lugar de JSON, lo manejamos correctamente
    return { message: await response.text() };
  }
};

export async function fetchMusicServices() {
  try {
    const response = await fetch("http://54.173.57.181:8062/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getAllMusic {
              id_music
              name
              price
            }
          }
        `,
      }),
    })
    const data = await response.json()
    return data.data.getAllMusic
  } catch (error) {
    console.error("Error fetching music services:", error)
    throw error
  }
}

export async function updateMusicService(id: string, data: { name: string; price: number }) {
  try {
    const response = await fetch(`http://54.173.57.181:8063/musicU/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() }; // ✅ Manejo de texto plano
    }
  } catch (error) {
    console.error("Error updating catering service:", error);
    throw error;
  }
}
export async function deleteMusicService(id: string) {
  try {
    const response = await fetch(`http://54.173.57.181:8064/musicD/delete/${id}`, {
      method: "DELETE",
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() }; // ✅ Manejo de texto plano
    }
  } catch (error) {
    console.error("Error deleting decoration service:", error);
    throw error;
  }
}

// Decoration Services
export const createDecorationService = async (serviceData: { name: string; price: number }) => {
  const response = await fetch("http://44.212.202.69:8041/decorationC/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    // ✅ Si la API devuelve texto en lugar de JSON, lo manejamos correctamente
    return { message: await response.text() };
  }
};


export async function fetchDecorationServices() {
  try {
    const response = await fetch("http://44.212.202.69:8042/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getAllDecoration {
              id_decoration
              name
              price
            }
          }
        `,
      }),
    })
    const data = await response.json()
    return data.data.getAllDecoration
  } catch (error) {
    console.error("Error fetching decoration services:", error)
    throw error
  }
}

export async function updateDecorationService(id: string, data: { name: string; price: number }) {
  try {
    const response = await fetch(`http://44.212.202.69:8043/decorationU/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() }; // ✅ Manejo de texto plano
    }
  } catch (error) {
    console.error("Error updating catering service:", error);
    throw error;
  }
}


export async function deleteDecorationService(id: string) {
  try {
    const response = await fetch(`http://44.212.202.69:8044/decorationD/delete/${id}`, {
      method: "DELETE",
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() }; // ✅ Manejo de texto plano
    }
  } catch (error) {
    console.error("Error deleting decoration service:", error);
    throw error;
  }
}


// Photography Services

export const createPhotographyService = async (serviceData: { name: string; price: number }) => {
  const response = await fetch("http://3.229.141.153:8051/photographyC/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    // ✅ Si la API devuelve texto en lugar de JSON, lo manejamos correctamente
    return { message: await response.text() };
  }
};




export async function fetchPhotographyServices() {
  try {
    const response = await fetch("http://3.229.141.153:8052/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            getAllPhotography {
              id_photograhy
              name
              price
            }
          }
        `,
      }),
    })
    const data = await response.json()
    return data.data.getAllPhotography
  } catch (error) {
    console.error("Error fetching photography services:", error)
    throw error
  }
}

export async function updatePhotographyService(id: string, data: { name: string; price: number }) {
  try {
    const response = await fetch(`http://3.229.141.153:8053/photographyU/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() }; // ✅ Manejo de texto plano
    }
  } catch (error) {
    console.error("Error updating catering service:", error);
    throw error;
  }
}


export async function deletePhotographyService(id: string) {
  try {
    const response = await fetch(`http://3.229.141.153:8054/photographyD/delete/${id}`, {
      method: "DELETE",
    });

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return { message: await response.text() }; // ✅ Manejo de texto plano
    }
  } catch (error) {
    console.error("Error deleting decoration service:", error);
    throw error;
  }
}

// User Management API calls
interface User {
  id: string
  name: string
  email: string
}

interface CreateUserDTO {
  name: string
  email: string
  password: string
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch("http://13.216.230.146:3001/api/users")
    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export async function createUser(userData: CreateUserDTO): Promise<User> {
  try {
    const response = await fetch("http://13.216.230.146:3006/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error("Failed to create user")
    }
    return await response.json()
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  try {
    const response = await fetch(`http://13.216.230.146:3000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    if (!response.ok) {
      throw new Error("Failed to update user")
    }
    return await response.json()
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    const response = await fetch(`http://13.216.230.146:3002/api/users/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete user")
    }
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}

