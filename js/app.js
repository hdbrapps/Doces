const catalogo = document.querySelector('.catalogo');
const carrinho = document.querySelector('.carrinho');
const tbody = carrinho.querySelector('tbody');
const total = carrinho.querySelector('.total');
const enviarPedidoBtn = carrinho.querySelector('.btn-pedido');
const inputPedido = document.querySelector('#seu-pedido');

let carrinhoItens = [];

catalogo.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const produto = event.target.getAttribute('data-produto');
    const preco = Number(event.target.getAttribute('data-preco'));

    adicionarItemCarrinho(produto, preco);
  }
});

carrinho.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const id = event.target.getAttribute('data-id');
    removerItemCarrinho(id);
  }
});

enviarPedidoBtn.addEventListener('click', enviarPedidoWhatsapp);

function adicionarItemCarrinho(produto, preco) {
  const item = carrinhoItens.find((item) => item.produto === produto);

  if (item) {
    item.quantidade++;
    item.preco = item.quantidade * preco;
    document.getElementById(item.id).textContent = item.quantidade;
  } else {
    const id = Date.now();
    carrinhoItens.push({ id, produto, quantidade: 1, preco });
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${produto}</td>
      <td id="${id}">1</td>
      <td>R$ ${preco.toFixed(2)}</td>
      <td><button data-id="${id}">Remover</button></td>
    `;
    tbody.appendChild(tr);
  }

  const botoesRemover = document.querySelectorAll('.carrinho button[data-id]');
  botoesRemover.forEach(botao => {
    botao.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      removerItemCarrinho(id);
    });
  });

  atualizarTotal();
  atualizarPedido();
}

function removerItemCarrinho(id) {
  const itemIndex = carrinhoItens.findIndex((item) => item.id === Number(id));
  
  if (itemIndex !== -1) {
    carrinhoItens.splice(itemIndex, 1);

    const tr = event.target.closest('tr');
    tr.parentNode.removeChild(tr);
    
    atualizarTotal();
    atualizarPedido();
  }
}

function atualizarTotal() {
  const totalCarrinho = carrinhoItens.reduce((acc, item) => acc + item.preco, 0);
  total.textContent = `R$ ${totalCarrinho.toFixed(2)}`;
}

function atualizarPedido() {
  const pedido = carrinhoItens.map(item => `${item.quantidade}x ${item.produto}`).join(', ');
document.getElementById('pedido').value = pedido;

}

function enviarPedidoWhatsapp() {
  const nome = document.getElementById('nome').value;
  const pedido = carrinhoItens.map(item => `${item.quantidade}x ${item.produto}`).join(', ');
  const totalCarrinho = carrinhoItens.reduce((acc, item) => acc + item.preco, 0).toFixed(2);
  const mensagem = `Olá, meu nome é ${nome} e gostaria de fazer o seguinte pedido: ${pedido}. Total: R$ ${totalCarrinho}`;

  const numeroTelefone = '5598970180089';
  const linkWhatsapp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;

  const link = document.createElement('a');
  link.setAttribute('href', linkWhatsapp);
  link.setAttribute('target', '_blank');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


 const toggleThemeButton = document.getElementById('toggle-theme');
const body = document.body;

toggleThemeButton.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
});

const slider = document.querySelector('.slider');
const sliderTexts = ['Deliciosos Doces', 'Doces Feitos com Amor', 'Compre Doces Agora'];

let index = 0;

setInterval(() => {
  slider.classList.remove('animate');
  slider.textContent = sliderTexts[index];
  slider.classList.add('animate');
  
  index++;
  if (index === sliderTexts.length) {
    index = 0;
  }
}, 3000);
