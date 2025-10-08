document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  socket.emit("testConexion");

  const addForm = document.getElementById("addForm");
  const productList = document.getElementById("productList");

  // Cargar nuevo producto
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(addForm));
    socket.emit("nuevoProducto", data);
    addForm.reset();
  });

  // Eliminar producto desde botones renderizados por Handlebars
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (confirm("¿Eliminar este producto?")) {
        fetch(`/api/products/${id}`, {
          method: "DELETE"
        })
          .then((res) => {
            if (res.ok) {
              location.reload(); // Recarga la vista actualizada
            } else {
              alert("Error al eliminar el producto");
            }
          })
          .catch((err) => {
            console.error("Error:", err);
            alert("Error de conexión");
          });
      }
    });
  });

  // Escuchar actualizaciones en tiempo real (si usás render dinámico)
  socket.on("actualizarProductos", (products) => {
    productList.innerHTML = "";
    products.forEach((p) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${p.title}</strong> - $${p.price}<br />
        <em>${p.description}</em><br />
        Código: ${p.code} | Stock: ${p.stock} | ID: ${p.id}<br />
        <img src="${p.thumbnail}" alt="${p.title}" width="150" /><br />
        <button data-id="${p.id}" class="btn delete-btn">🗑️ Eliminar</button>
      `;
      productList.appendChild(li);
    });

    // Reasignar eventos a los nuevos botones
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("¿Eliminar este producto?")) {
          socket.emit("eliminarProducto", id);
        }
      });
    });
  });
});
