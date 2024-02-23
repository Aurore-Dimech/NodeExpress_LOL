import champions from "./champions.json" assert { type: 'json' }
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

let names = new Set();

const main = async () => {
    for (let champion of champions) {
        if (!names.has(champion.name)) {
            names.add(champion.name);
            try {
                await prisma.character.upsert({
                    where: { name: champion.name },
                    update: {},
                    create: champion
                });
            } catch (error) {
                throw error;
            }
        }
    }
}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally( async () => {
    await prisma.$disconnect()
})

main()