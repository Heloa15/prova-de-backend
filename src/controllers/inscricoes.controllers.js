const db = require("../data/connection");

const listar = async (req, res) => {
    const inscricoes = await db.query("SELECT * FROM inscricoes");
    res.json(inscricoes[0]).end();
};


const cadastrar = async (req, res) => {
    const { id_aluno, id_oficina } = req.body;

    if (!id_aluno || !id_oficina) {
        return res.status(400).json({ msg: "Preencha todos os campos" }).end();
    }

    try {
        const results = await db.query(
            "INSERT INTO inscricoes (data_inscricao, id_aluno, id_oficina) VALUES (CURDATE(), ?, ?)",
            [id_aluno, id_oficina]
        );

        const novaInscricao = {
            id: results[0].insertId,
            id_aluno,
            id_oficina,
            data_inscricao: new Date().toISOString().split("T")[0]
        };

        res.status(201).json(novaInscricao).end();

    } catch (error) {
        const info = { msg: "" };

        if (error.errno === 1452) {
            info.msg = "Aluno ou oficina não encontrados";
            return res.status(400).json(info).end();
        }

        info.msg = "Erro ao cadastrar inscrição";
        res.status(500).json(info).end();
    }
};

const atualizar = async (req, res) => {
    const idInscricao = req.params.id;
    const { id_aluno, id_oficina } = req.body;

    const updateInscricao = await db.query(
        "UPDATE inscricoes SET id_aluno=?, id_oficina=? WHERE id=?",
        [id_aluno, id_oficina, idInscricao]
    );

    const info = { msg: "" };

    if (updateInscricao[0].affectedRows === 1) {
        info.msg = "Inscrição atualizada com sucesso";
    } else {
        info.msg = "Inscrição não encontrada";
    }

    res.status(200).json(info).end();
};

const excluir = async (req, res) => {
    const idInscricao = req.params.id;

    try {
        const delInscricao = await db.query(
            "DELETE FROM inscricoes WHERE id = ?",
            [idInscricao]
        );

        const info = { msg: "" };

        if (delInscricao[0].affectedRows === 1) {
            info.msg = "Inscrição excluída com sucesso";
        } else {
            info.msg = "Inscrição não encontrada";
        }

        res.status(200).json(info).end();

    } catch (error) {
        const info = { msg: "Erro ao excluir inscrição" };
        res.status(500).json(info).end();
    }
};

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};
