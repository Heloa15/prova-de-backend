const express = require("express");
const router = express.Router();

const inscricoesControllers = require("../controllers/inscricoes.controllers");

router.get("/inscricoes", inscricoesControllers.listar);
router.post("/inscricao", inscricoesControllers.cadastrar);
router.put("/inscricao:id", inscricoesControllers.atualizar);
router.delete("/inscricao:id", inscricoesControllers.excluir);

module.exports = router;
