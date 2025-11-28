const express = require("express");
const router = express.Router();
const alunosControllers = require("../controllers/alunos.controllers");

router.get("/alunos", alunosControllers.listar);
router.post("/aluno", alunosControllers.cadastrar);
router.put("/aluno/:id", alunosControllers.atualizar);
router.delete("/aluno/:id", alunosControllers.excluir);

module.exports = router;
