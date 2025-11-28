const express = require("express");
const router = express.Router();
const oficinasControllers = require("../controllers/oficinas.controllers");

router.get("/oficinas", oficinasControllers.listar);
router.post("/oficina", oficinasControllers.cadastrar);
router.put("/oficina/:id", oficinasControllers.atualizar);
router.delete("/oficina/:id", oficinasControllers.excluir);

module.exports = router;
