const API_URL = 'http://localhost:3000/estado';

const formPreferencias = document.querySelector('#form-preferencias');
const formIdentificacao = document.querySelector('#form-identificacao');
const btnVerSessao = document.querySelector('#btn-ver-sessao');
const btnLerPreferencias = document.querySelector('#btn-ler-preferencias');
const btnSair = document.querySelector('#btn-sair');
const resultado = document.querySelector('#resultado');

async function chamarApi(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    credentials: 'include',
    ...opcoes,
    headers: {
      Accept: 'application/json',
      ...(opcoes.headers ?? {}),
    },
  });

  const corpo = await resposta.json().catch(() => null);

  resultado.textContent = JSON.stringify(
    {
      status: resposta.status,
      ok: resposta.ok,
      corpo,
    },
    null,
    2,
  );

  return corpo;
}

formPreferencias.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dados = new FormData(formPreferencias);
  const payload = {
    tema: dados.get('tema'),
  };

  await chamarApi('/preferencias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
});

formIdentificacao.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dados = new FormData(formIdentificacao);
  const email = String(dados.get('email') ?? '').trim();

  const payload = {
    nome: String(dados.get('nome') ?? '').trim(),
    ...(email && { email }),
  };

  await chamarApi('/identificacao', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
});

btnVerSessao.addEventListener('click', async () => {
  await chamarApi('/sessao');
});

btnLerPreferencias.addEventListener('click', async () => {
  await chamarApi('/preferencias');
});

btnSair.addEventListener('click', async () => {
  await chamarApi('/sair', {
    method: 'POST',
  });
});