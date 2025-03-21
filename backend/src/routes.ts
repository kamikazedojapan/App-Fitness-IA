import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutritionController } from "./controllers/CreateNutritionController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText = "```json\n{\n  \"nome\": \"Marcio\",\n  \"sexo\": \"Masculino\",\n  \"idade\": 21,\n  \"altura\": 1.79,\n  \"peso\": 80,\n  \"objetivo\": \"Ganhar Massa Muscular\",\n  \"refeicoes\": [\n    {\n      \"horario\": \"7:00\",\n      \"nome\": \"Cafe da manha\",\n      \"alimentos\": [\n        \"3 ovos inteiros\",\n        \"2 fatias de pao integral\",\n        \"1 colher de sopa de pasta de amendoim\",\n        \"1 banana\"\n      ]\n    },\n    {\n      \"horario\": \"10:00\",\n      \"nome\": \"Lanche da manha\",\n        \"alimentos\": [\n        \"Shake de proteina com leite (30g de proteina em po + 200ml de leite)\",\n        \"1 fruta (maca ou laranja)\"\n      ]\n    },\n    {\n      \"horario\": \"13:00\",\n      \"nome\": \"Almoco\",\n      \"alimentos\": [\n        \"200g de frango grelhado\",\n        \"150g de arroz integral\",\n        \"150g de batata doce\",\n        \"Salada verde a vontade\"\n      ]\n    },\n    {\n      \"horario\": \"16:00\",\n      \"nome\": \"Lanche da tarde\",\n      \"alimentos\": [\n        \"1 copo de iogurte grego\",\n        \"1 punhado de castanhas\"\n      ]\n    },\n    {\n      \"horario\": \"19:00\",\n      \"nome\": \"Janta\",\n      \"alimentos\": [\n        \"150g de peixe grelhado\",\n        \"100g de brócolis\",\n        \"100g de quinoa\"\n      ]\n    },\n    {\n      \"horario\": \"21:00\",\n      \"nome\": \"Lanche antes de dormir\",\n      \"alimentos\": [\n        \"Caseina (30g) com agua\"\n      ]\n    }\n  ],\n  \"suplementos\": [\n    \"Creatina\",\n    \"Proteina do soro do leite\",\n    \"BCAA\",\n    \"Omega-3\"\n  ]\n}\n```\n"

    try {
      let jsonString = responseText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim()

      let jsonObject = JSON.parse(jsonString)
      
      return reply.send({ data: jsonObject})
    } catch (error) {
      console.log(error)
    }
  })
  
  fastify.post("/create", async(request: FastifyRequest, reply: FastifyReply) => {
    return new CreateNutritionController().handle(request, reply);
  })
}
