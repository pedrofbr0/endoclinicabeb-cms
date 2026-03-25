import { defineField, defineType } from "sanity";

export default defineType({
  name: "informacoesMedicos",
  title: "Informações dos Médicos",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome do Médico",
      type: "string",
    }),
    defineField({
      name: "crm",
      title: "CRM",
      type: "string",
    }),
    defineField({
      name: "residency-clinica",
      title: "Residência Clínica",
      type: "string",
    }),
    defineField({
      name: "residency-endo",
      title: "Residência em Endocrinologia",
      type: "string",
    }),
   ],
})