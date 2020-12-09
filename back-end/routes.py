from config import *
from models import Sapato, Pessoa, Sapateira


@app.route("/")
def index():
    return "<a href='/pagina_principal'>Listar Sapatos</a>"

@app.route("/listar_sapatos")
def listar_sapatos():
    sapatos = db.session.query(Sapato).all()
    json_sapatos = [x.json() for x in sapatos]
    resposta = jsonify(json_sapatos)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/incluir_sapato", methods=["POST"])
def incluir_sapato():
    resposta = jsonify({"status": "passou",
                      "detalhes": "nenhum detalhe"})
    data_post = request.get_json()
    try:
        new = Sapato(**data_post)
        db.session.add(new)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"status": "erro",
                          "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/excluir_sapato/<int:sapato_id>", methods=["DELETE"])
def excluir_sapato(sapato_id):
    resposta = jsonify({"status": "passou",
                      "detalhes": "nenhum detalhe"})
    try:
        Sapato.query.filter(Sapato.id==sapato_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"status": "erro",
                          "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/listar_pessoas")
def listar_pessoas():
    pessoas = db.session.query(Pessoa).all()
    json_pessoas = [x.json() for x in pessoas]
    resposta = jsonify(json_pessoas)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/listar_sapateiras")
def listar_sapateiras():
    sapateiras = db.session.query(Sapateira).all()
    json_sapateiras = [x.json() for x in sapateiras]
    resposta = jsonify(json_sapateiras)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta