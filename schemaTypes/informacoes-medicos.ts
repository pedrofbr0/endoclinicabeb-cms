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
      name: "residencyClinica",
      title: "Residência Clínica",
      type: "string",
    }),
    defineField({
      name: "residencyEndo",
      title: "Residência em Endocrinologia",
      type: "string",
    }),
   ],
})