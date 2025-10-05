const socket = io();
socket.emit("testConexion");


const addForm = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");
const productList = document.getElementById("productList");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(addForm));
  socket.emit("nuevoProducto", data);
  addForm.reset();
});

deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = new FormData(deleteForm).get("id");
  socket.emit("eliminarProducto", id);
  deleteForm.reset();
});

socket.on("actualizarProductos", (products) => {
  productList.innerHTML = "";
  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.title}</strong> - $${p.price}<br />
      <em>${p.description}</em><br />
      Código: ${p.code} | Stock: ${p.stock} | ID: ${p.id}<br />
      <img src="${p.thumbnail}" alt="${p.title}" width="150" /><br />
      <button data-id="${p.id}" class="btn btnEliminar">Eliminar</button>
    `;
    productList.appendChild(li);
  });

  document.querySelectorAll(".btnEliminar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      socket.emit("eliminarProducto", id);
    });
  });
});
