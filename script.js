// Alterna o menu para dispositivos móveis
function toggleMenu() {
  const nav = document.getElementById('navbar');
  const btn = document.querySelector('.menu-toggle');
  const expanded = btn.getAttribute('aria-expanded') === 'true' || false;

  btn.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('show');
}

// Pré-visualizar imagem ou nome do arquivo anexado
function previewArquivo() {
  const input = document.getElementById('receita');
  const previewImg = document.getElementById('previewImagem');
  const previewNome = document.getElementById('previewNomeArquivo');

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const fileType = file.type;

    if (fileType.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
        previewNome.textContent = '';
      };
      reader.readAsDataURL(file);
    } else {
      // Arquivo não é imagem - mostrar só o nome
      previewImg.style.display = 'none';
      previewNome.textContent = `Arquivo anexado: ${file.name}`;
    }
  } else {
    previewImg.style.display = 'none';
    previewNome.textContent = '';
  }
}

// Salva os dados do formulário no localStorage
function salvarDados(event) {
  event.preventDefault();

  const medicamento = document.getElementById('medicamento').value.trim();
  const horario = document.getElementById('horario').value;
  const receitaInput = document.getElementById('receita');
  const duvidas = document.getElementById('duvidas').value.trim();
  const mensagem = document.getElementById('formMensagem');

  if (!medicamento || !horario) {
    mensagem.textContent = 'Por favor, preencha os campos obrigatórios.';
    mensagem.style.color = '#b00020';
    return;
  }

  let receitaData = null;

  if (receitaInput.files.length > 0) {
    const file = receitaInput.files[0];
    // Para simplificação, vamos salvar só o nome do arquivo, não o conteúdo
    receitaData = file.name;
  }

  // Criar objeto para salvar
  const dadosSimulador = {
    medicamento,
    horario,
    receita: receitaData,
    duvidas,
    salvoEm: new Date().toLocaleString('pt-BR')
  };

  // Salvar no localStorage
  localStorage.setItem('dadosFarmaGuia', JSON.stringify(dadosSimulador));

  mensagem.textContent = 'Dados salvos com sucesso!';
  mensagem.style.color = '#006400';

  mostrarDadosSalvos();
}

// Exibe os dados salvos no localStorage
function mostrarDadosSalvos() {
  const container = document.getElementById('dadosSalvos');
  const dadosStr = localStorage.getItem('dadosFarmaGuia');

  if (!dadosStr) {
    container.innerHTML = '<p>Nenhum dado salvo.</p>';
    return;
  }

  const dados = JSON.parse(dadosStr);

  let receitaHTML = dados.receita ? `<li><strong>Receita anexada:</strong> ${dados.receita}</li>` : '<li><em>Sem receita anexada</em></li>';

  container.innerHTML = `
    <h3>Dados Salvos</h3>
    <ul>
      <li><strong>Medicamento:</strong> ${dados.medicamento}</li>
      <li><strong>Horário:</strong> ${dados.horario}</li>
      ${receitaHTML}
      <li><strong>Dúvidas:</strong> ${dados.duvidas || 'Nenhuma'}</li>
      <li><em>Salvo em: ${dados.salvoEm}</em></li>
    </ul>
  `;
}

// Limpa os dados do formulário e do localStorage
function limparDados() {
  if (confirm('Tem certeza que deseja limpar os dados?')) {
    localStorage.removeItem('dadosFarmaGuia');
    document.getElementById('formSimulador').reset();
    document.getElementById('formMensagem').textContent = '';
    document.getElementById('previewImagem').style.display = 'none';
    document.getElementById('previewNomeArquivo').textContent = '';
    mostrarDadosSalvos();
  }
}

// Carrega os dados salvos quando a página é carregada
window.onload = function () {
  mostrarDadosSalvos();
};
