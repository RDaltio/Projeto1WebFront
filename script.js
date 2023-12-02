document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    const limparCamposBtn = document.getElementById('LimparCampos');

    const listaContainer = document.getElementById('listaContainer');

    const excluirTodosBtn = document.getElementById('ExcluirTodos');

    const pesquisarBtn = document.getElementById('Pesquisar');

    const campoPesquisa = document.getElementById('CampoPesquisa');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('Nome').value;
        const idade = document.getElementById('Idade').value;
        const cidade = document.getElementById('Cidade').value;
        const email = document.getElementById('Email').value;
        const opiniao = document.getElementById('Opiniao').value;

        const dataEnvio = new Date().toLocaleString();
        const dados = {
            nome,
            idade,
            cidade,
            email,
            opiniao,
            dataEnvio,
        };

        adicionarDadosALista(dados);

        armazenarDadosNoLocalStorage(dados);

        limparCamposFormulario();
    });

    limparCamposBtn.addEventListener('click', function () {
        limparCamposFormulario();
    }); 

    excluirTodosBtn.addEventListener('click', function () {
        limparListaELocalStorage();
    });

    pesquisarBtn.addEventListener('click', function () {
        const termoPesquisa = campoPesquisa.value.toLowerCase();
        pesquisarNaLista(termoPesquisa);
        campoPesquisa.value = '';
    });

    function adicionarDadosALista(dados) {
        const paragrafo = document.createElement('p');
        paragrafo.textContent = `Data de Envio: ${dados.dataEnvio}, Nome: ${dados.nome}, Idade: ${dados.idade}, Email: ${dados.email}`;
        paragrafo.classList.add('dados-paragrafo');

        listaContainer.appendChild(paragrafo);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.addEventListener('click', function () {
            listaContainer.removeChild(paragrafo);
            removerDadosDoLocalStorage(dados);
        });

        paragrafo.appendChild(botaoExcluir);
    }

    function armazenarDadosNoLocalStorage(dados) {
        const dadosArmazenados = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

        dadosArmazenados.push(dados);

        localStorage.setItem('dadosFormulario', JSON.stringify(dadosArmazenados));
    }

    function removerDadosDoLocalStorage(dados) {
        const dadosArmazenados = JSON.parse(localStorage.getItem('dadosFormulario')) || [];

        const indice = dadosArmazenados.findIndex(item => item.dataEnvio === dados.dataEnvio);
        if (indice !== -1) {
            dadosArmazenados.splice(indice, 1);
            localStorage.setItem('dadosFormulario', JSON.stringify(dadosArmazenados));
        }
    }

    function limparCamposFormulario() {
        form.reset();
    }

    function limparListaELocalStorage() {
        listaContainer.innerHTML = '';
        localStorage.removeItem('dadosFormulario');
    }

    function pesquisarNaLista(termoPesquisa) {
        const itensLista = listaContainer.getElementsByTagName('p');

        for (const item of itensLista) {
            const textoItem = item.textContent.toLowerCase();

            if (textoItem.includes(termoPesquisa)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    }
});
