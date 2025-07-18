// SCROLL SUAVE
const links = document.querySelectorAll('a[href^="#"]');

function ScrollLinks(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute("href");
  const target = document.querySelector(href);

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

links.forEach((link) => {
  link.addEventListener("click", ScrollLinks);
});

// -------------------------------------------------

// Menu Hamburger

const menuToggle = document.querySelector(".menu-toggle");
const headerMenu = document.querySelector(".header-menu");
const menuLinks = document.querySelectorAll(".header-menu a");

menuToggle.addEventListener("click", () => {
  headerMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    headerMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});

// Espera o DOM carregar antes de ativar o autocomplete pra calculadora
window.addEventListener("load", () => {
  const origemInput = document.getElementById("origem");
  const destinoInput = document.getElementById("destino");

  new google.maps.places.Autocomplete(origemInput, {
    types: ["geocode"],
    componentRestrictions: { country: "br" },
  });

  new google.maps.places.Autocomplete(destinoInput, {
    types: ["geocode"],
    componentRestrictions: { country: "br" },
  });
});

// Function CalcularPreco para a calculadora

function calcularPreco(distanciaKm) {
  if (distanciaKm <= 2) {
    return 40;
  } else if (distanciaKm <= 5) {
    return 50;
  } else if (distanciaKm <= 10) {
    return 100;
  } else if (distanciaKm <= 20) {
    return 150;
  } else if (distanciaKm <= 40) {
    return 200;
  } else if (distanciaKm <= 80) {
    return distanciaKm * 2 * 2.3; // ida e volta
  } else {
    return distanciaKm * 2 * 1.6; // ida e volta
  }
}

// Codigo puxando api do google pra fazer o calculo de valor de KM

const form = document.getElementById("form");
const boxResultado = document.getElementById("box-resultado");
const precoSpan = document.getElementById("preco-frete");
const distanciaSpan = document.getElementById("distancia-frete");
const alteracaoDistancia = document.getElementById("alteracao-distancia");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const origem = document.getElementById("origem").value;
  const destino = document.getElementById("destino").value;

  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origem],
      destinations: [destino],
      travelMode: "DRIVING",
      unitSystem: google.maps.UnitSystem.METRIC,
    },
    function (response, status) {
      if (status !== "OK") {
        boxResultado.style.display = "block";
        precoSpan.innerText = "Erro";
        distanciaSpan.innerText = "Erro ao calcular distância.";
      } else {
        const elemento = response.rows[0].elements[0];
        if (elemento.status === "OK") {
          const distanciaText = elemento.distance.text;
          const distanciaKm = elemento.distance.value / 1000;

          const preco = calcularPreco(distanciaKm);

          boxResultado.style.display = "block";
          precoSpan.innerText = `R$ ${preco.toFixed(2)}`;
          distanciaSpan.innerText = `Distância: ${distanciaText}`;
          alteracaoDistancia.innerText =
            "O valor é uma estimativa e pode variar. Fale conosco para confirmar o frete.";
        } else {
          boxResultado.style.display = "block";
          precoSpan.innerText = "Erro";
          distanciaSpan.innerText = "Endereço não encontrado.";
        }
      }
    }
  );
});

// Formulário

const formulario = document.getElementById("form-contato");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const servico = document.getElementById("servico-contato-item").value;
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !servico || !mensagem) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  if (mensagem.length <= 2) {
    alert("Por favor, preencha a mensagem com detalhes do pedido");
    return;
  }

  const numeroWhatsApp = "5511981223332";

  const texto = `Meu nome é *${nome}* e estou entrando em contato através do site.\n\nTenho interesse no serviço de *${servico}* e gostaria de solicitar um orçamento.\n\n📝 *Detalhes do pedido:*\n${mensagem}\n\nAguardo retorno. Obrigado!`;

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    texto
  )}`;
  window.open(url, "_blank");
  formulario.reset();
});

// Animação ao Scroll
