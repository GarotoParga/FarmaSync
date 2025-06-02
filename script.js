function toggleMenu() {
  const nav = document.getElementById("navbar");
  nav.classList.toggle("show");
}

function salvarDados(event) {
  event.preventDefault();

  const medicamento = document.getElementById("medicamento").value;
  const horario = document.getElementById("horario").value;
  const duvidas = document.getElementById("duvidas").value;

  const dados = {
    medicamento,
    horario,
    duvidas,
    timestamp: new Date().toLocaleString()
  };

  localStorage.setItem("farmaDados", JSON.stringify(dados));
  mostrarDados();
}

function mostrarDados() {
  const dados = JSON.parse(localStorage.getItem("farmaDados"));
  const container = document.getElementById("dadosSalvos");

  if (dados) {
    container.innerHTML = `
      <h3>Dados Salvos</h3>
      <p><strong>Medicamento:</strong> ${dados.medicamento}</p>
      <p><strong>Horário:</strong> ${dados.horario}</p>
      <p><strong>Dúvidas:</strong> ${dados.duvidas}</p>
      <p><em>Salvo em: ${dados.timestamp}</em></p>
    `;
  } else {
    container.innerHTML = '';
  }
}

function limparDados() {
  localStorage.removeItem("farmaDados");
  document.getElementById("medicamento").value = '';
  document.getElementById("horario").value = '';
  document.getElementById("duvidas").value = '';
  document.getElementById("preview").style.display = 'none';
  mostrarDados();
}

function previewImagem() {
  const file = document.getElementById("receita").files[0];
  const preview = document.getElementById("preview");

  if (file && file.type.startsWith("image")) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
  }
}

window.onload = mostrarDados;
