export function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("Cicata", 1);

        request.onerror = (event) => reject("Error al abrir la base de datos: " + event.target.error);
        request.onsuccess = (event) => resolve(event.target.result);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Verifica si la tienda de objetos "Forms" existe
            if (!db.objectStoreNames.contains("Forms")) {
                const store = db.createObjectStore("Forms", { keyPath: "idF" });
            }
        };
    });
}


export async function addForms(form) {
    const db = await openDB();
    const transaction = db.transaction("Forms", "readwrite");
    const store = transaction.objectStore("Forms");

    return new Promise((resolve, reject) => {
        const request = store.add(form);
        request.onsuccess = () => resolve("Forms guardado");
        request.onerror = (event) => reject("Error al guardar contacto: " + event.target.error);
    });
}
export async function updateForm(form) {
    const db = await openDB();
    const transaction = db.transaction("Forms", "readwrite");
    const store = transaction.objectStore("Forms");
    return new Promise((resolve, reject) => {
        const request = store.put(form);
        request.onsuccess = () => resolve("Form actualizado");
        request.onerror = (event) =>  reject(new Error("Error al actualizar el formulario: " + event.target.error));
    });
}

export async function getFormData(idf) {
    const db = await openDB(); 
    const transaction = db.transaction("Forms", "readonly");
    const store = transaction.objectStore("Forms");

    return new Promise((resolve, reject) => {
        const requestData = store.get(idf);
        requestData.onsuccess = () => resolve(requestData.result);
        requestData.onerror = (event) => reject("Error al obtener los datos: " + event.target.error);
    });
}
export function getAllData() {
    return new Promise((resolve, reject) => {
    const request = indexedDB.open("Cicata", 1); 
  
    request.onsuccess = function (event) {
      const db = event.target.result;

      const objectStore = db.transaction("Forms", "readonly").objectStore("Forms"); 
      const getAllRequest = objectStore.getAll();
      getAllRequest.onsuccess = (e) => {
        const form = e.target.result;
        const combined = form.reduce((acc, curr) => {
            return { ...acc, ...curr };
          }, {});
        console.log(combined)
        resolve(combined)
      };
  
      getAllRequest.onerror = (event) => {
        console.error("Error al obtener los datos:", event.target.error);
      };
    };
  
    request.onerror = (event) => {
      console.error("Error al abrir la base de datos:", event.target.error);
    };
    })
  };

  