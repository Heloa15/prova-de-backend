const db = require("../data/connection");

const listar = async (req, res) => {
    const alunos = await db.query("SELECT * FROM alunos");
    res.json(alunos[0]).end();
};


const cadastrar = async (req, res) => {
    const { id, nome, turma } = req.body;

    try {
        await db.query(
            "INSERT INTO alunos VALUES (?, ?, ?)",
            [id, nome, turma]
        );

        const novoAluno = { id, nome, turma };
        res.status(201).json(novoAluno).end();

    } catch (error) {
        const info = { msg: "" };

        if (error.errno === 1062) {
            info.msg = "ID do aluno já existe";
            return res.status(409).json(info).end();
        }

        info.msg = "Erro ao cadastrar aluno";
        res.status(500).json(info).end();
    }
};

const atualizar = async (req, res) => {
    const idAluno = req.params.id;
    const { nome, turma } = req.body;

    const updateAluno = await db.query(
        "UPDATE alunos SET nome=?, turma=? WHERE id=?",
        [nome, turma, idAluno]
    );

    const info = { msg: "" };

    if (updateAluno[0].affectedRows === 1) {
        info.msg = "Aluno atualizado com sucesso";
    } else {
        info.msg = "Aluno não encontrado";
    }

    res.status(200).json(info).end();
};

const excluir = async (req, res) => {
    const idAluno = req.params.id;

    try {
        const delAluno = await db.query(
            "DELETE FROM alunos WHERE id = ?",
            [idAluno]
        );

        const info = { msg: "" };

        if (delAluno[0].affectedRows === 1) {
            info.msg = "Aluno excluído com sucesso";
        } else {
            info.msg = "Aluno não encontrado";
        }

        res.status(200).json(info).end();

    } catch (error) {
        const info = { msg: "" };

        if (error.errno === 1451) {
            info.msg = "Aluno vinculado a outra tabela";
        }

        res.status(500).json(info).end();
    }
};

module.exports = {
    listar,
    cadastrar,
    atualizar,
    excluir
};
