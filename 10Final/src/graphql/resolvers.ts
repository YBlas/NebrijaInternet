import { IResolvers } from "@graphql-tools/utils";
import { createTrainer, validateTrainer } from "../collections/trainers";
import { signToken } from "../auth";
import { createPokemon, getAllPokemons, getPokemonById } from "../collections/pokemons";
import { catchPokemon, freePokemon } from "../collections/ownedPokemons";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";
import { COLLECTION_TRAINERS } from "../utils";






export const resolvers: IResolvers = {
    Mutation: {
        startJourney: async (_, { name, password }) => {
            const db = getDB();
            const existingTrainer = await db.collection(COLLECTION_TRAINERS).findOne({ name });
            if (existingTrainer) throw new Error("Trainer with this name already exists");
            const trainerId = await createTrainer(name, password);
            return signToken(trainerId);
        },
        login: async (_, { name, password }) => {
            const trainer = await validateTrainer(name, password);
            if(!trainer) throw new Error("Invalid credentials");
            return signToken(trainer._id.toString());
        },
        createPokemon: async (_, { name, description, height, weight, types }, { trainer }) => {
            if(!trainer) throw new Error("You must be logged in to create a pokemon");
            return await createPokemon(name, description, height, weight, types);
        },
        catchPokemon: async (_, { pokemonId, nickname }, { trainer }) => {
            if(!trainer) throw new Error("You must be logged in to catch a pokemon");
            if(trainer.pokemons.length >= 6) throw new Error("You can't have more than 6 pokemons in your team");
            const pokemon = await getPokemonById(pokemonId);
            if(!pokemon) throw new Error("Pokemon not found");
            return await catchPokemon(pokemonId, nickname || null, trainer._id.toString());
        },
        freePokemon: async (_, { ownedPokemonId }, { trainer }) => {
            if(!trainer) throw new Error("You must be logged in to free a pokemon");
            if(trainer.pokemons.length === 0) throw new Error("You don't have any pokemons to free");
            if(!trainer.pokemons.find((p: string) => p === ownedPokemonId)) throw new Error("You don't own this pokemon");
            return await freePokemon(ownedPokemonId, trainer._id.toString());
        }
    },
    Query: {
        me: async (_, __, { trainer }) => {
            if(!trainer) return null;
            return {
                _id: trainer._id.toString(),
                ...trainer
            }
        },
        pokemons: async (_, { page = 1, size = 10 }) => {
            return await getAllPokemons(page, size);
        },
        pokemon: async (_, { id }) => {
            return await getPokemonById(id);
        }
    },
    OwnedPokemon: {
        pokemon: async (parent) => {
            return await getPokemonById(parent.pokemon);
        }
    },
    Trainer: {
        pokemons: async (parent) => {
            const pokemonsIds = parent.pokemons || [];
            if (Array.isArray(pokemonsIds) && pokemonsIds.length > 0 && pokemonsIds.every(id => typeof id === 'string')) {
                const db = getDB();
                const objectIds = pokemonsIds.map((id: string) => new ObjectId(id));
                return db
                    .collection("ownedPokemons")
                    .find({ _id: { $in: objectIds } })
                    .toArray();
            }
            return [];
        }
    }
}