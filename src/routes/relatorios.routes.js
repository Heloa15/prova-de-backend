const express = require("express");
const router = express.Router();
const relatoriosControllers = require("../controllers/relatorios.controllers");

router.get("/relatorio", relatoriosControllers.inscricoesPorOficina);
router.get("/categorias", relatoriosControllers.inscricoesPorCategoria);

module.exports = router;
