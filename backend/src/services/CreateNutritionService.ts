import { DataProps } from "../controllers/CreateNutritionController";
import { GoogleGenerativeAI } from '@google/generative-ai'

class CreateNutritionService {
    async execute({nome, peso, altura, idade, genero, objetivo, level}: DataProps) {
        try {
            const genAI = new GoogleGenerativeAI("AIzaSyD6iSaKR699P9CxErn-RJwqmOwwMlRS-cA")
            const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"})

            const response = await model.generateContent(`Crie uma dieta completa para uma pessoa com nome: ${nome} do sexo ${genero} com peso atual: ${peso}kg, altura: ${altura}, idade: ${idade} anos e com foco e objetivo em ${objetivo}, atualmente nível de atividade: ${level} e ignore qualquer outro parâmetro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propriedade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação além das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`)
            
            console.log(JSON.stringify(response, null, 2))

            if (response.response && response.response.candidates){
                const jsonText = response.response.candidates[0].content.parts[0].text as string;

                let jsonString = jsonText.replace(/```\w*\n/g, '').replace(/\n```/g, '').trim()

                let jsonObject = JSON.parse(jsonString)

                return { data : jsonObject}
            }

        } catch (error) {
            console.error(error)
            throw new Error("Failed create")
        }
    }
}

export {CreateNutritionService}