import { gql } from "@apollo/client";



export const GET_SIMPLE_CHARACTERS = gql`
    query GetSimpleCharacters {
        characters {
            results {
                id
                name
            }
        }
    }
`;