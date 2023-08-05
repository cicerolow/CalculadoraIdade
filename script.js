// Algoritmo

// CALCULADORAIDADE
// 1. Pegar os valores
// 2. Calcular a Idade
//  a. Com base no ano
//  b. Com mês (EXTRA)
//  c. Com dia (EXTRA)

// 3. Gerar a faixa etária

//  Resultado     Faixa
//  0 à 12        Criança
//  13 à 17       Adolescente
//  18 à 65       Adulto
//  Acima de 65   Idoso

// 4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros;


//Funcao principal (chamada no html)
function calcularIdade(event) {
    //event.preventDefault()

    console.log("Funcionante!!!");

    let dadosUsuario = pegarValores();

    let idade = calcular(dadosUsuario.anoNascimento);

    let classificar = classificarIdade(idade);
    console.log(classificar);

    let dadosAtualizado = organizarDados(dadosUsuario, classificar, idade);
    console.log(dadosAtualizado);

    cadastrarUsuario(dadosAtualizado);
}

// Passo 1 - Pegar valor
function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let dataRecebida = parseFloat(document.getElementById("ano-nascimento").value);

    let dadosUsuario = {
        nome: nomeRecebido,
        anoNascimento: dataRecebida,
    }

    console.log(dadosUsuario);

    return dadosUsuario;
}

// Passo 2 - Calcular
function calcular(anoNascimento) {
    let idade = (new Date().getFullYear()) - anoNascimento;

    console.log(idade);

    return idade;
}

// Passo 3 - Classificar
function classificarIdade(idade) {
    /*
    Resultado     Faixa
    0 à 12        Criança
    13 à 17       Adolescente
    18 à 65       Adulto
    Acima de 65   Idoso
    */

    if (idade <= 12) {
        return "Crianca!";

    } else if (idade < 17) {
        return "Adolescente!!";

    } else if (idade < 65) {
        return "Adulto!!!";

    } else {
        return "Idoso!!!!";
    }
}

// Passo 4 - Organizar informacoes 
function organizarDados(dadosUsuario, classificarIdade, idade) {
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        classificacao: classificarIdade,
        dataCadastro: dataHoraAtual,
        idade: idade
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;
}

// Passo 5 - Salvar
function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

//Passo 6 - Ler lista
function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="=4">Nenhum usuario cadastrado!</td>
     </tr>`

    } else {
       montarTabela(listaUsuarios);
 }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

//Passo 7 - Montar tabela
function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");
 
    let template = '';
 
      console.log(listaDeCadastrados);
 
     listaDeCadastrados.forEach(pessoa => {
        template += `<tr>
         <td data-cell="nome">${pessoa.nome}</td>
         <td data-cell="data de nascimento">${pessoa.anoNascimento}</td>
         <td data-cell="idade">${pessoa.idade}</td>         
         <td data-cell="faixa etária">${pessoa.classificacao}</td>
     </tr>`
      });
 
      tabela.innerHTML = template;
  }
 
  //Passo 8 - Limpar local storage
  function deletarRegistros() {
      localStorage.removeItem("usuariosCadastrados")
      window.location.reload();
  }

  //
//   function executar() {
//     let data_atual = new Date();
//     let data_nascimento = new Date (1973, 9, 19);

// }
// document.getElementById("mensagem".innerHTML = "A pessoa tem " + anos + )
//   //