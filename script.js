const API_URL = "http://localhost:8080/api/livros";

document.addEventListener("DOMContentLoaded", () => {
  carregarLivros();

  document.getElementById("formLivro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const ano = parseInt(document.getElementById("ano").value);
    const editora = document.getElementById("editora").value;
    const status = document.getElementById("status").value;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ titulo, autor, ano, editora, status })
    });

    document.getElementById("formLivro").reset();
    carregarLivros();
  });
});

async function carregarLivros() {
  const response = await fetch(API_URL);
  const livros = await response.json();

  const livrosDiv = document.getElementById("livros");
  livrosDiv.innerHTML = "";

  livros.forEach(livro => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${livro.titulo}</h3>
      <p><strong>Autor:</strong> ${livro.autor}</p>
      <p><strong>Ano:</strong> ${livro.ano}</p>
      <p><strong>Editora:</strong> ${livro.editora}</p>
      <p><strong>Status:</strong> ${livro.status}</p>
      <button class="edit" onclick="editarLivro(${livro.id})">Editar</button>
      <button class="delete" onclick="deletarLivro(${livro.id})">Deletar</button>
    `;

    livrosDiv.appendChild(card);
  });
}

async function deletarLivro(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  carregarLivros();
}

async function editarLivro(id) {
  const titulo = prompt("Novo título:");
  const autor = prompt("Novo autor:");
  const ano = prompt("Novo ano:");
  const editora = prompt("Nova editora:");
  const status = prompt("Novo status:");

  if (titulo && autor && ano && editora && status) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ titulo, autor, ano: parseInt(ano), editora, status })
    });
    carregarLivros();
  }
}
