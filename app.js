// app.js

// Array para armazenar os pacotes
let packages = [];

// Função para gerar o código de rastreamento único
function generateTrackingCode(packageId, weight) {
  return (packageId << 4 | weight).toString(2);
}

// Função para validação dos dados
function validatePackageData(recipient, packageId, address, weight) {
  // Validações do nome do destinatário (apenas letras)
  if (!/^[A-Za-z\s]+$/.test(recipient)) {
    return "Error: Invalid Recipient Name. Only alphabetic characters are allowed.";
  }

  // Validação do Package ID (somente números)
  if (!Number.isInteger(Number(packageId)) || packageId === '') {
    return "Error: Invalid Package ID. Please enter numeric values only.";
  }

  // Validação do endereço (não pode conter números)
  if (/\d/.test(address)) {
    return "Error: Invalid Delivery Address. It should not contain numbers.";
  }

  // Validação do peso (deve ser um número positivo)
  if (isNaN(weight) || weight <= 0) {
    return "Error: Invalid Weight. Weight must be a positive number.";
  }

  return null;  // Retorna null se tudo for válido
}

// Função para adicionar pacotes
function addPackage(event) {
  event.preventDefault();

  const recipient = document.getElementById("recipient").value.trim();
  const packageId = document.getElementById("packageId").value.trim();
  const address = document.getElementById("address").value.trim();
  const weight = parseFloat(document.getElementById("weight").value.trim());

  // Validar os dados inseridos
  const errorMessage = validatePackageData(recipient, packageId, address, weight);
  if (errorMessage) {
    document.getElementById("errorMessage").textContent = errorMessage;
    return;
  }

  // Gerar código de rastreamento
  const trackingCode = generateTrackingCode(parseInt(packageId), weight);

  // Adicionar o pacote ao array
  packages.push({ recipient, packageId, address, weight, trackingCode });

  // Limpar campos e erro
  document.getElementById("packageForm").reset();
  document.getElementById("errorMessage").textContent = '';

  // Exibir pacotes ordenados
  displayPackages();
}

// Função para exibir os pacotes ordenados
function displayPackages() {
  // Ordenar pacotes pelo peso (do mais leve para o mais pesado)
  packages.sort((a, b) => a.weight - b.weight);

  // Obter a tabela e limpar o conteúdo
  const tableBody = document.getElementById("packageTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = '';

  // Preencher a tabela com os pacotes ordenados
  packages.forEach(pkg => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = pkg.recipient;
    row.insertCell(1).textContent = pkg.packageId;
    row.insertCell(2).textContent = pkg.address;
    row.insertCell(3).textContent = pkg.weight;
    row.insertCell(4).textContent = pkg.trackingCode;
  });
}

// Adicionar ouvinte de evento para o formulário
document.getElementById("packageForm").addEventListener("submit", addPackage);
