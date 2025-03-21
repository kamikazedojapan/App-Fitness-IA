import { FastifyRequest, FastifyReply } from "fastify";
import { CreateNutritionService } from "../services/CreateNutritionService";

export interface DataProps{
    nome: string;
    peso: string;
    altura: string;
    idade: string;
    genero: string;
    objetivo: string;
    level: string;
}

class CreateNutritionController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const {nome, peso, altura, idade, genero, objetivo, level} = request.body as DataProps;

        console.log("Route Callback!");

        const createNutrition = new CreateNutritionService();
        const nutrition = await createNutrition.execute({
            nome, 
            peso, 
            altura, 
            idade, 
            genero, 
            objetivo, 
            level
        });

        reply.send(nutrition);
    }
}

export { CreateNutritionController };
