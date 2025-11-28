const db = require("../data/connection");

const listar = async (req, res) => {
    const oficinas = await db.query("SELECT * FROM oficinas");
    res.json(oficinas[0]).end();
};


const cadastrar = async (req, res) => {
    const { nome, categoria, vagas } = req.body;

    if (!nome || !categoria || !vagas) {
        return res.status(400).json({ msg: "Preencha todos os campos" }).end();
    }

    if (vagas < 1) {
        return res.status(400).json({ msg: "As vagas devem ser no mínimo 1" }).end();
    }

    try {
        const results = await db.query(
            "INSERT INTO oficinas (nome, categoria, vagas) VALUES (?, ?, ?)",
            [nome, categoria, vagas]
        );

        const novaOficina = {
            id: results[0].insertId,
            nome,
            categoria,
            vagas
        };

        res.status(201).json(novaOficina).end();

    } catch (error) {
        const info = { msg: "Erro ao cadastrar oficina" };
        res.status(500).json(info).end();
    }
};

const atualizar = async (req, res) => {
    const idOficina = req.params.id;
    const { nome, categoria, vagas } = req.body;

    const updateOficina = await db.query(
        "UPDATE oficinas SET nome=?, categoria=?, vagas=? WHERE id=?",
        [nome, categoria, vagas, idOficina]
    );

    const info = { msg: "" };

    if (updateOficina[0].affectedRows === 1) {
        info.msg = "Oficina atualizada com sucesso";
    } else {
        info.msg = "Oficina não encontrada";
    }

    res.status(200).json(info).end();
};

const excluir = async (req, res) => {
    const idOficina = req.params.id;

    try {
        const delOficina = await db.query(
            "DELETE FROM oficinas WHERE id = ?",
            [idOficina]
        );

        const info = { msg: "" };

        if (delOficina[0].affectedRows === 1) {
            info.msg = "Oficina excluída com sucesso";
        } else {
            info.msg = "Oficina não encontrada";
        }

        res.status(200).json(info).end();

    } catch (error) {
        const info = { msg: "" };

        if (error.errno === 1451) {
            info.msg = "Oficina vinculada a outra tabela (possui inscrições)";
            return res.status(409).json(info).end();
        }

        info.msg = "Erro ao excluir oficina";
        res.status(500).json(info).end();
    }
};

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};
