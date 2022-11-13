let perguntas = [
  {
    pergunta: 'PHP foi desenvolvido para qual fim?',
    alternativas: [
      'front-end',
      'back-end',
      'banco de dados',
      'sistema operacional'
    ],
    resposta: 2
  },
  {
    pergunta: 'Uma forma de declarar variável em JavaScript',
    alternativas: ['var', '$var', '@var', '#let'],
    resposta: 1
  },
  {
    pergunta: 'Qual o seletor de id no CSS?',
    alternativas: ['#', '.', '@', '/'],
    resposta: 1
  }
]

let idpergunta = 0
let botaoVoltar = document.getElementById('pergunta-anterior')
let botaoAvancar = document.getElementById('proxima-pergunta')

let questionario = document.getElementById('questionario')
let resultado = document.getElementById('resultado')

let pergunta = document.getElementById('pergunta')
let r1 = document.getElementById('r1')
let r2 = document.getElementById('r2')
let r3 = document.getElementById('r3')
let r4 = document.getElementById('r4')
let r1Texto = document.createTextNode(perguntas[idpergunta].alternativas[0])
let r2Texto = document.createTextNode(perguntas[idpergunta].alternativas[1])
let r3Texto = document.createTextNode(perguntas[idpergunta].alternativas[2])
let r4Texto = document.createTextNode(perguntas[idpergunta].alternativas[3])
let perguntaTexto = document.createTextNode(
  idpergunta + 1 + ' - ' + perguntas[idpergunta].pergunta
)
r1.appendChild(r1Texto)
r2.appendChild(r2Texto)
r3.appendChild(r3Texto)
r4.appendChild(r4Texto)
pergunta.appendChild(perguntaTexto)

if (idpergunta == 0) {
  // verifica se está na primeira pergunta para desabilitar o botão de voltar pergunta
  botaoVoltar.disabled = true
}

//botao voltar pergunta
botaoVoltar.addEventListener('click', function () {
  limpar() // limpa os dados da pergunta anterior
  idpergunta -= 1
  if (perguntas[idpergunta].selecionada != null) {
    //verifica se a pergunta ja tinha sido respondida e marca novamente o radioButton
    document.getElementById(
      `resposta-${perguntas[idpergunta].selecionada}`
    ).checked = true
    document
      .getElementById(`resposta-${perguntas[idpergunta].selecionada}`)
      .parentNode.classList.add('selecionada')
  }
  verificarFinalizarTeste() //verifica se é a ultima pergunta para habilitar o botão de finalizar teste
  if (idpergunta == 0) {
    // verifica se é a primeira pergunta para desabilitar o botão de voltar pergunta
    botaoVoltar.disabled = true
  }
  mudarPergunta(idpergunta)
})

function limpar() {
  let labels = document.querySelectorAll('label') // limpa os textos dos labels
  for (let i = 0; i < labels.length; i++) {
    labels[i].replaceChildren()
  }
  document.querySelector('#pergunta').replaceChildren() // limpa o texto da pergunta
  let inputs = document.querySelectorAll('input') //desmarca todos os radioButtons
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].checked = false
  }
  let divs = document.querySelectorAll('.opcao')
  for (let i = 0; i < divs.length; i++) {
    if (divs[i].classList.contains('selecionada')) {
      divs[i].classList.remove('selecionada')
    }
  }
}

//botao proxima pergunta
function proximaPergunta() {
  limpar()
  idpergunta += 1
  if (perguntas[idpergunta].selecionada != null) {
    document.getElementById(
      `resposta-${perguntas[idpergunta].selecionada}`
    ).checked = true
    document
      .getElementById(`resposta-${perguntas[idpergunta].selecionada}`)
      .parentNode.classList.add('selecionada')
  }

  if (idpergunta != 0) {
    botaoVoltar.disabled = false
  }
  mudarPergunta(idpergunta)
  verificarFinalizarTeste()
}

//botao finalizar teste
function finalizarTeste() {
  botaoAvancar.disabled = true
  let pontuacao = 0
  for (let i = 0; i < perguntas.length; i++) {
    //percorre os array comparando a resposta com o radio selecionado e adiciona na variavel de pontuaçao
    if (perguntas[i].resposta == perguntas[i].selecionada) {
      pontuacao++
    }
  }

  questionario.style.display = 'none'
  let textoResultado = document.createTextNode(
    `Você acertou ${pontuacao} pergunta(s) de um total de ${perguntas.length}!`
  )
  let elementoTextoResultado = document.getElementById('texto-resultado')
  elementoTextoResultado.appendChild(textoResultado)
  let telaResultado = document.getElementById('resultado')
  telaResultado.classList.remove('hide')
  respostas()
}

function mudarPergunta(idpergunta) {
  pergunta = document.getElementById('pergunta')
  r1 = document.getElementById('r1')
  r2 = document.getElementById('r2')
  r3 = document.getElementById('r3')
  r4 = document.getElementById('r4')
  r1Texto = document.createTextNode(perguntas[idpergunta].alternativas[0])
  r2Texto = document.createTextNode(perguntas[idpergunta].alternativas[1])
  r3Texto = document.createTextNode(perguntas[idpergunta].alternativas[2])
  r4Texto = document.createTextNode(perguntas[idpergunta].alternativas[3])
  perguntaTexto = document.createTextNode(
    idpergunta + 1 + ' - ' + perguntas[idpergunta].pergunta
  )
  r1.appendChild(r1Texto)
  r2.appendChild(r2Texto)
  r3.appendChild(r3Texto)
  r4.appendChild(r4Texto)
  pergunta.appendChild(perguntaTexto)
}

function salvarSelecao(value) {
  perguntas[idpergunta].selecionada = value

  let inputs = document.querySelectorAll('.opcao')
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].classList.contains('selecionada')) {
      inputs[i].classList.remove('selecionada')
    }
  }
  let inputSelecionado = document.getElementById(`resposta-${value}`).parentNode
  inputSelecionado.classList.add('selecionada')
}

function verificarFinalizarTeste() {
  if (idpergunta == perguntas.length - 1) {
    botaoAvancar.setAttribute('onclick', 'finalizarTeste()')
    botaoAvancar.innerHTML = 'Finalizar Teste'
  } else {
    botaoAvancar.setAttribute('onclick', 'proximaPergunta()')
    botaoAvancar.innerHTML = 'Próxima pergunta'
  }
}

function respostas() {
  perguntas.forEach(p => {
    if (p.alternativas[p.resposta - 1] != p.alternativas[p.selecionada - 1]) {
      let index = perguntas.indexOf(p)
      let exibirGabarito = document.getElementById(`gabarito-${index + 1}`)
      exibirGabarito.classList.remove('hide')
      let alternativaMarcada = document.createTextNode(
        p.alternativas[p.selecionada - 1]
      )

      let resposta = document.createTextNode(p.alternativas[p.resposta - 1])
      let pResposta = document.getElementById(`gc${index + 1}`)
      pResposta.appendChild(resposta)
      let pAlternativa = document.getElementById(`g${index + 1}`)
      pAlternativa.appendChild(alternativaMarcada)
    }
  })
}
