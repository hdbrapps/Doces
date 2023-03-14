const btnComprar = document.querySelectorAll('.btn-comprar');
const carrinho = document.querySelector('.carrinho tbody');
const total = document.querySelector('.total');
const enviarPedido = document.querySelector('.enviar-pedido');
const btnPedido = document.querySelector('.btn-pedido');
const inputNome = document.querySelector('#nome');
const inputPedido = document.querySelector('#pedido');
const btnToggleTheme = document.querySelector('#toggle-theme');
const themeNoturno = document.querySelector('#theme-noturno');


let qtdeProdutos = 0;
let valorTotal = 0;

btnComprar.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const produto = event.target.dataset.produto;
    const preco = parseFloat(event.target.dataset.preco);

    adicionarProduto(produto, preco);
  });
});

function adicionarProduto(produto, preco) {
  qtdeProdutos++;
  valorTotal += preco;

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${produto}</td>
    <td>1</td>
    <td>R$ ${preco.toFixed(2)}</td>
    <td><button class="btn-remover">Remover</button></td>
  `;

  carrinho.append(tr);

  atualizarTotal();
  atualizarPedido();
}

function removerProduto(tr) {
  const preco = parseFloat(tr.querySelector('td:nth-child(3)').textContent.replace('R$ ', ''));

  qtdeProdutos--;
  valorTotal -= preco;

  tr.remove();

  atualizarTotal();
  atualizarPedido();
}

function atualizarTotal() {
  total.textContent = `R$ ${valorTotal.toFixed(2)}`;
}

function atualizarPedido() {
  let pedido = '';

  carrinho.querySelectorAll('tr').forEach((tr) => {
    const produto = tr.querySelector('td:nth-child(1)').textContent;
    const preco = tr.querySelector('td:nth-child(3)').textContent;
    const qtde = tr.querySelector('td:nth-child(2)').textContent;

    pedido += `${produto} (${qtde}) - ${preco}\n`;
  });

  inputPedido.value = pedido;
}

carrinho.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-remover')) {
    const tr = event.target.closest('tr');
    removerProduto(tr);
  }
});

btnPedido.addEventListener('click', () => {
  const nome = inputNome.value.trim();
  const pedido = inputPedido.value.trim();
//Alerta para colocar o nome
  if (nome === '') {
    alert('Por favor, informe seu nome.');
    inputNome.focus();
    return;
  }
// Alerta carrinho vazio
  if (pedido === '') {
    alert('Seu carrinho está vazio. Adicione produtos antes de enviar seu pedido.');
    return;
  }
  

  // Gerar código aleatório
  const codigo = Math.floor(Math.random() * 900000) + 100000;


// Adicionar código à mensagem
const mensagem = `Olá, meu nome é ${nome} e gostaria de fazer o seguinte pedido:\n\n${pedido}\nCódigo do pedido: ${codigo}`;

// Link do whatsApp
  const url = `https://api.whatsapp.com/send?phone=5598970180089&text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');

  inputNome.value = '';
  inputPedido.value = '';

  qtdeProdutos = 0;
  valorTotal = 0;
  carrinho.querySelectorAll('tr').forEach((tr) => tr.remove());
  atualizarTotal();
});
// Tema noturno
btnToggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('theme-noturno');
  btnToggleTheme.querySelector('span').classList.toggle('fa-moon');
  btnToggleTheme.querySelector('span').classList.toggle('fa-sun');
});

const toggleThemeBtn = document.getElementById('toggle-theme');
const bodyEl = document.querySelector('body');

toggleThemeBtn.addEventListener('click', function() {
  bodyEl.classList.toggle('dark-mode');
});
//Final do tema
// Função atualizar pedido
function atualizarPedido() {
  let pedido = '';
  const pagamento = document.querySelector('#pagamento').value;

  carrinho.querySelectorAll('tr').forEach((tr) => {
    const produto = tr.querySelector('td:nth-child(1)').textContent;
    const preco = tr.querySelector('td:nth-child(3)').textContent;
    const qtde = tr.querySelector('td:nth-child(2)').textContent;

    pedido += `${produto} (${qtde}) - ${preco}\n`;
  });

  pedido += ` Forma de pagamento: ${pagamento}\n`;
  pedido += ` Total do pedido: R$ ${valorTotal.toFixed(2)}`;

  inputPedido.value = pedido;
}





