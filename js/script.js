var usuarios = [];

function adicionarUsuario(usuario, senha) {
    var novoUsuario = {
        usuario: usuario,
        senha: senha
    };
    usuarios.push(novoUsuario);
    atualizarTabela();
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    alert("Usuário Criado com sucesso");
}

function atualizarTabela() {
    var tabela = document.getElementById("tabelaDados");
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1);
    }

    for (var i = 0; i < usuarios.length; i++) {
        var usuario = usuarios[i];
        var novaLinha = tabela.insertRow(-1);
        var cellID = novaLinha.insertCell(0);
        var cellUsuario = novaLinha.insertCell(1);
        var cellSenha = novaLinha.insertCell(2);
        var cellEditar = novaLinha.insertCell(3);
        var cellDeletar = novaLinha.insertCell(4);

        cellID.innerHTML = i + 1;
        cellUsuario.innerHTML = usuario.usuario;
        cellSenha.innerHTML = usuario.senha;

        var botaoEditar = document.createElement("button");
        botaoEditar.innerHTML = "Editar";
        botaoEditar.setAttribute("data-indice", i);
        botaoEditar.addEventListener("click", function(event) {
            var indice = event.target.getAttribute("data-indice");
            editarUsuario(indice);
        });

        var botaoDeletar = document.createElement("button");
        botaoDeletar.innerHTML = "Deletar";
        botaoDeletar.setAttribute("data-indice", i);
        botaoDeletar.addEventListener("click", function(event) {
            var indice = event.target.getAttribute("data-indice");
            deletarUsuario(indice);
        });

        cellEditar.appendChild(botaoEditar);
        cellDeletar.appendChild(botaoDeletar);
    }
}

function editarUsuario(indice) {
    var usuarioAtual = usuarios[indice];
    if (!usuarioAtual) return;

    var novoUsuario = prompt("Editar Usuário:", usuarioAtual.usuario);
    var novaSenha = prompt("Editar Senha:", usuarioAtual.senha);

    if (novoUsuario === null || novaSenha === null) return;

    usuarios[indice].usuario = novoUsuario;
    usuarios[indice].senha = novaSenha;

    atualizarTabela();
}

function deletarUsuario(indice) {
    var confirmacao = window.confirm("Tem certeza de que deseja deletar este usuário?");

    if (confirmacao) {
        usuarios.splice(indice, 1);
        atualizarTabela();
    }
}

document.getElementById("entrarButton").addEventListener("click", function() {
    var usuario = document.getElementById("username").value;
    var senha = document.getElementById("password").value;
    adicionarUsuario(usuario, senha);
});
