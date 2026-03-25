import { defineField, defineType } from "sanity";

export default defineType({
  name: "informacoesMedicos",
  title: "Equipe Médica",
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
      name: "especialidade",
      title: "Especialidade",
      type: "string",
    }),
    defineField({
      name: "formacao",
      title: "Formação",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "E-mail",
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
    // A IMAGEM AGORA FICA AQUI, JUNTO COM OS DADOS DELE!
    defineField({
      name: "imagem",
      title: "Foto do Médico",
      type: "image",
      options: {
        hotspot: true, // Permite cortar a imagem lá no painel
      },
    }),
  ],
  // Organiza a listagem no painel do Sanity
  preview: {
    select: {
      title: 'nome',
      subtitle: 'crm',
      media: 'imagem' // Isso faz a foto real do médico aparecer na bolinha da lista!
    }
  }
})