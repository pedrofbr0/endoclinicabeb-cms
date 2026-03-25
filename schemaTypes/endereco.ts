import { defineField, defineType } from "sanity";

export default defineType({
  name: "endereco",
  title: "Endereço da Clínica",
  type: "document",
  fields: [
    defineField({
      name: "logradouro",
      title: "Logradouro",
      type: "string",
    }),
    defineField({
      name: "numero",
      title: "Número",
      type: "string",
    }),
    defineField({
      name: "bairro",
      title: "Bairro",
      type: "string",
    }),
    defineField({
      name: "cidade",
      title: "Cidade",
      type: "string",
    }),
    defineField({
      name: "estado",
      title: "Estado",
      type: "string",
    }),
    defineField({
      name: "cep",
      title: "CEP",
      type: "string",
    }),
    defineField({
      name: "complemento",
      title: "Complemento",
      type: "string",
    })
    ],
})