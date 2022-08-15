const valorTotal = document.querySelector(".valor-total");
function listaProdutos() {
  produtos.forEach((produto) => {
    const { id } = produto;
    criaVitrine(produto, id);
  });
}
function criaVitrine(arrayProdutos, id) {
  const vitrineProdutos = document.querySelector(".vitrine-produtos");
  const produto = criaProdutos(arrayProdutos, id);
  vitrineProdutos.append(produto);
}
function criaProdutos(arrayProdutos, id) {
  const { componentes } = arrayProdutos;
  const produto = document.createElement("li");
  produto.classList.add("produtos");
  const produto__info = document.createElement("div");
  produto__info.classList.add("info-box");
  const produto__componentes = document.createElement("p");
  produto__componentes.classList.add("produto__componentes");
  produto__componentes.innerText = `  componentes : ${[...componentes]}`;
  const img = document.createElement("img");
  img.classList.add("img-produtos");
  img.src = arrayProdutos.img;
  const h2 = document.createElement("h2");
  h2.classList.add("nome-produtos");
  h2.innerText = arrayProdutos.nome;
  const p_Categoria = document.createElement("p");
  p_Categoria.classList.add("categoria-produtos");
  p_Categoria.innerText = arrayProdutos.secao;
  const p_preco = document.createElement("p");
  p_preco.classList.add("preco-produtos");
  const imgAdd = document.createElement("img");
  imgAdd.src = "src/img/add.svg";
  imgAdd.classList.add("img-add");
  p_preco.innerText = `R$${arrayProdutos.preco},00`;
  produto.id = id;
  produto__info.append(img, h2, p_Categoria, p_preco, imgAdd);
  produto.append(produto__info, produto__componentes);
  return produto;
}
function recarregaProdutos() {
  const btnMostraTudo = document.querySelector(".btn-all");
  const vitrineProdutos = document.querySelector(".vitrine-produtos");
  btnMostraTudo.addEventListener("click", function () {
    vitrineProdutos.innerHTML = "";
    produtos.forEach((TodosProdutos) => {
      const { id } = TodosProdutos;
      criaVitrine(TodosProdutos, id);
    });
  });
}
function filtraHortiFruit() {
  const btnHortiFruit = document.querySelector(".btn-hortifruit");
  const vitrineProdutos = document.querySelector(".vitrine-produtos");
  const listaHortifruti = produtos.filter(
    (produto) => produto.secao == "Hortifruit"
  );
  btnHortiFruit.addEventListener("click", function (el) {
    vitrineProdutos.innerHTML = "";
    listaHortifruti.forEach((produtosHortifruti) => {
      const { id } = produtosHortifruti;
      criaVitrine(produtosHortifruti, id);
    });
  });
}
function filtraPanificadora() {
  const btnPanificadora = document.querySelector(".btn-panificadora");
  const vitrineProdutos = document.querySelector(".vitrine-produtos");
  const listaPanificadora = produtos.filter(
    (produto) => produto.secao == "Panificadora"
  );
  btnPanificadora.addEventListener("click", function (e) {
    vitrineProdutos.innerHTML = "";
    listaPanificadora.forEach((produtosPanificadora) => {
      const { id } = produtosPanificadora;
      criaVitrine(produtosPanificadora, id);
    });
  });
}
function filtraLaticinios() {
  const btnLaticinios = document.querySelector(".btn-laticinios");
  const vitrineProdutos = document.querySelector(".vitrine-produtos");
  const listaLaticinios = produtos.filter((el) => el.secao == "Laticinios");
  btnLaticinios.addEventListener("click", function (el) {
    vitrineProdutos.innerHTML = "";
    listaLaticinios.forEach((produtosLaticinio) => {
      const { id } = produtosLaticinio;
      criaVitrine(produtosLaticinio, id);
    });
  });
}
function pesquisaProduto() {
  const btnPesquisa = document.querySelector(".pesquisa-icon");
  const inputPesquisa = document.querySelector(".pesquisa");
  inputPesquisa.addEventListener("change", pesquisa);
  inputPesquisa.addEventListener("input", pesquisa);
  btnPesquisa.addEventListener("click", pesquisa);
}
function pesquisa() {
  const vitrineProdutos = document.querySelector(".vitrine-produtos");
  const produtoPesquisado = [];
  const inputPesquisa = document.querySelector(".pesquisa").value.toLowerCase();
  produtos.forEach((produto) => {
    const { nome, secao, categoria } = produto;
    if (
      nome.toLowerCase().match(inputPesquisa) ||
      secao.toLowerCase().match(inputPesquisa) ||
      categoria.toLowerCase().match(inputPesquisa)
    ) {
      produtoPesquisado.push(produto);
    }
  });
  vitrineProdutos.innerHTML = "";
  somaPesquisa(produtoPesquisado);
  produtoPesquisado.forEach((produto) => {
    const { id } = produto;
    criaVitrine(produto, id);
  });
}
function somaPesquisa(produtos) {
  const p_valor = document.querySelector(".valor-preco");
  let precosPesquisados = [];
  produtos.forEach((produto) => {
    precosPesquisados.push(produto.preco);
  });
  precosPesquisados = precosPesquisados.reduce((precoAtual, ProximoPreco) => {
    return precoAtual + ProximoPreco;
  });
  p_valor.innerText = `R$ ${precosPesquisados.toFixed(2)}`;
}
function carrinhoFixo() {
  const btnCarrinho = document.querySelector("figure");
  btnCarrinho.addEventListener("click", function () {
    const carrinho = document.querySelector("aside");
    carrinho.classList.toggle("fixed");
  });
}
function listaProdutoCarrinho() {
  let arrayFiltradoPorId = [];
  document.addEventListener("click", function (el) {
    if (el.target.classList.contains("img-add")) {
      const idDoAncestral = el.target.closest(".produtos").id;
      arrayFiltradoPorId = produtos.filter(({ id }) => id == idDoAncestral);
      arrayFiltradoPorId.forEach((produto) => {
        const { id } = produto;
        criaProdutoCarrinho(produto, id);
      });
      checaCarrinhoVazio();
      somaPrecosCarrinho();
      quantidadeProdutosCarrinho();
    }
  });
}
function criaProdutoCarrinho(arrayProdutos, id) {
  const { nome, preco, secao, img } = arrayProdutos;

  const carrinho = document.querySelector(".carrinho-produtos");

  const li = document.createElement("li");
  li.classList.add("carrinho-produto");
  li.id = id;

  const li__box = document.createElement("div");
  li__box.classList.add("carrinho-box");

  const li__box__img = document.createElement("div");
  li__box__img.classList.add("box-remove");

  const li__img_remove = document.createElement("img");
  li__img_remove.classList.add("img-remove");
  li__img_remove.src = "/src/img/trash.svg";

  const li__box__info = document.createElement("div");
  li__box__info.classList.add("carrinho-info");

  const li__img = document.createElement("img");
  li__img.classList.add("carrinho-img");
  li__img.src = img;

  const li__box__info__p = document.createElement("div");
  li__box__info__p.classList.add("carrinho-p");

  const li__p1 = document.createElement("p");
  li__p1.innerText = nome;

  const li__p2 = document.createElement("p");
  li__p2.innerText = secao;

  const li__p3 = document.createElement("p");
  li__p3.classList.add("carrinho-preco");
  li__p3.innerText = `R$ ${preco},00`;

  li__box__info__p.append(li__p1, li__p2, li__p3);
  li__box__info.append(li__img, li__box__info__p);
  li__box.append(li__box__info);
  li__box__img.append(li__img_remove);
  li.append(li__box, li__box__img);

  carrinho.appendChild(li);
}
function removeProdutoCarrinho() {
  document.addEventListener("click", (el) => {
    if (el.target.classList.contains("img-remove")) {
      el.target.closest(".carrinho-produto").remove();
      checaCarrinhoVazio();
      somaPrecosCarrinho();
      quantidadeProdutosCarrinho();
    }
  });
}
function checaCarrinhoVazio() {
  const carrinho__msg__vazio = document.querySelector("#msg");
  const carrinho__valores_pai = document.querySelector(".valores-pai");
  const carrinhoProdutos = document.querySelector(".carrinho-produtos");
  const carrinhos = document.querySelectorAll(".carrinho-produto");
  if (carrinhos.length != 0) {
    carrinhoProdutos.classList.remove("hidden");
    carrinho__valores_pai.classList.remove("hidden");
    carrinho__msg__vazio.classList.add("hidden");
  } else {
    carrinhoProdutos.classList.add("hidden");
    carrinho__valores_pai.classList.add("hidden");
    carrinho__msg__vazio.classList.remove("hidden");
  }
}
function somaPrecosCarrinho() {
  const preco = document.querySelectorAll(".carrinho-preco");
  let valores = [];
  preco.forEach((carrinho) => {
    let precoFormatado = carrinho.innerText;
    precoFormatado = parseFloat(
      precoFormatado.replace(/[R$ ]/g, "").replace(",", ".")
    );
    valores.push(precoFormatado);
  });
  valores = valores.reduce((contador, valor) => {
    return contador + valor;
  }, 0);
  const total = document.querySelector("#total");
  total.innerText = `R$ ${valores},00  `;
}
function quantidadeProdutosCarrinho() {
  const quantidade = document.querySelector("#quantidade");
  const quantidadeProdutos =
    document.querySelectorAll(".carrinho-produto").length;
  quantidade.innerText = quantidadeProdutos;
}
checaCarrinhoVazio();
removeProdutoCarrinho();
listaProdutoCarrinho();
carrinhoFixo();
listaProdutos();
recarregaProdutos();
filtraHortiFruit();
filtraPanificadora();
filtraLaticinios();
pesquisaProduto();
