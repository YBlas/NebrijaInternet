import { IResolvers } from "@graphql-tools/utils"


type Cochesito = {
    id: string;
    name: string;
    brand: string;
    plate: string;
}

const carros : Cochesito[] = [
    {
        id: '1',
        name: 'Patrol a428',
        brand: 'Nissan',
        plate: '1234ABC'
    },
    {
        id: '2',
        name: 'Mustang',
        brand: 'Ford',
        plate: '5678DEF'
    }
];


export const resolvers: IResolvers = {
    Query: {
        getCars: ()=> carros,
        getCar: (_, { id })=> carros.find(x => x.id === id)
    },
    Mutation: {
        addCar: (_, { name, brand, plate}) => {
            const newCar = {
                id: String(carros.length+1),
                name,
                brand,
                plate
            };
            carros.push(newCar);
            return carros.find(x => x.id === String(carros.length))
        }
    }
}