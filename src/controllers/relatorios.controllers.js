const db = require("../data/connection");
const router = require("../routes/relatorios.routes");

const inscricoesPorOficina = async (req, res) => {
    try {
        const [result] = await db.query(`SELECT id_oficina AS oficina, COUNT(*) AS total_inscricoes FROM inscricoes GROUP BY id_oficina`);

        res.json(result).end();
    } catch (error) {
        res.status(500).json({ erro: "Erro ao gerar relatório." }).end();
    }
};

const inscricoesPorCategoria = async (req, res) => {
    try {
        const [result] = await db.query(
            "SELECT id_categoria AS categoria, COUNT(*) AS total_inscricoes FROM inscricoes GROUP BY id_categoria"
        );

        res.json(result).end();
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao gerar relatório.' }).end();
    }
};

module.exports = {
    inscricoesPorOficina,
    inscricoesPorCategoria
};