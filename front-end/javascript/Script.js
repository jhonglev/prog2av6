$( document ).ready(function() {
  $("#mensagem_principal").removeClass("d-none");
  $("#listaSapatos").addClass("d-none");
  $("#listaPessoas").addClass("d-none");
  $("#listaSapateiras").addClass("d-none");

  $("#linkPrincipal").click(() => {
    $("#mensagem_principal").removeClass("d-none");
    $("#listaSapatos").addClass("d-none");
    $("#listaPessoas").addClass("d-none");
    $("#listaSapateiras").addClass("d-none");
  })

  $("#linkListarSapatos").click(function () {
    $.ajax({
      url: "http://localhost:5000/listar_sapatos",
      method: "GET",
      dataType: "json",
      success: listarSapatos,
      error: function () {
        alert("Backend não conectado!");
      }
    });

    function listarSapatos(sapatos) {
      $("#listaSapatos tr>td").remove();
      for (var i in sapatos) {
        line = `<tr id="linha_${sapatos[i].id}">
          <td>${sapatos[i].modelo}</td>
          <td>${sapatos[i].tamanho}</td>
          <td>${sapatos[i].cor}</td>
          <td>
            <a href="#" id="${sapatos[i].id}" class="excluir_sapato">
              <p class="badge badge-danger">Excluir</p>
            </a>
          </td>
          </tr>`;

        $("#tabelaSapatos").append(line);
      };

      $("#mensagem_principal").addClass("d-none");
      $("#listaPessoas").addClass("d-none");
      $("#listaSapateiras").addClass("d-none");
      $("#listaSapatos").removeClass("d-none");
    };
  });

  $("#linkListarPessoas").click(function () {
    $.ajax({
      url: "http://localhost:5000/listar_pessoas",
      method: "GET",
      dataType: "json",
      success: listarPessoas,
      error: function () {
        alert("Backend não conectado!");
      }
    });

    function listarPessoas(pessoas) {
      $("#listaPessoas tr>td").remove();

      for (var i in pessoas) {
        line = `<tr id="linha_${pessoas[i].id}">
          <td>${pessoas[i].nome}</td>
          <td>${pessoas[i].idade}</td>
          </tr>`;

        $("#tabelaPessoas").append(line);
      };

      $("#mensagem_principal").addClass("d-none");
      $("#listaSapatos").addClass("d-none");
      $("#listaSapateiras").addClass("d-none");
      $("#listaPessoas").removeClass("d-none");
    };
  });

  $("#linkListarSapateiras").click(function () {
    $.ajax({
      url: "http://localhost:5000/listar_sapateiras",
      method: "GET",
      dataType: "json",
      success: listarSapateiras,
      error: function () {
        alert("Backend não conectado!");
      }
    });

    function listarSapateiras(sapateiras) {
      $("#listaSapateiras tr>td").remove();
      console.log(sapateiras);
      for (var i in sapateiras) {
        line = `<tr id="linha_${sapateiras[i].id}">
          <td>${sapateiras[i].capacidade}</td>
          <td>${sapateiras[i].cor}</td>
          <td>${sapateiras[i].material}</td>
          <td>${sapateiras[i].sapato.modelo}</td>
          <td>${sapateiras[i].sapato.tamanho}</td>
          <td>${sapateiras[i].sapato.cor}</td>
          <td>${sapateiras[i].pessoa.nome}</td>
          <td>${sapateiras[i].pessoa.idade}</td>
          </tr>`;

        $("#tabelaSapateiras").append(line);
      };

      $("#mensagem_principal").addClass("d-none");
      $("#listaSapatos").addClass("d-none");
      $("#listaPessoas").addClass("d-none");
      $("#listaSapateiras").removeClass("d-none");
    };
  });

  $("#incluir_sapato").click(function () {
    input_modelo = $("#input_modelo").val();
    input_tamanho = $("#input_tamanho").val();
    input_cor = $("#input_cor").val();
    data_post = JSON.stringify({
      modelo: input_modelo,
      tamanho: input_tamanho,
      cor: input_cor
    });

    $.ajax({
      url: "http://localhost:5000/incluir_sapato",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: data_post,
      success: incluirSapato,
      error: erroIncluir
    });

    function incluirSapato(resposta) {
      if (resposta.status == "passou") {
        alert("Operação concluída");
        $("#input_modelo").val("");
        $("#input_tamanho").val("");
        $("#input_cor").val("");
      } else {
        alert("Operação não concluída");
      }
    };

    function erroIncluir(resposta) {
      alert("Erro no backend");
    };
  });

  $(document).on("click", ".excluir_sapato", function() {
    var idSapato = $(this).attr("id");

    $.ajax({
      url: `http://localhost:5000/excluir_sapato/${idSapato}`,
      type: "DELETE",
      dataType: 'json',
      success: excluirSapato,
      error: erroExclusao
    });

    function excluirSapato(retorno) {
      if (retorno.status === "passou") {
        $(`#linha_${idSapato}`).fadeOut();
      } else {
        alert(`ERRO: ${retorno.status}: ${retorno.detalhes}`);
      }
    }

    function erroExclusao(retorno) {
      alert("Erro na rota");
    }
  });
});