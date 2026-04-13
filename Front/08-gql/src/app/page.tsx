'use client';

import { GET_SIMPLE_CHARACTERS } from "@/features/characters/queries";
import { GetSimpleCharactersQuery, GetSimpleCharactersQueryVariables } from "@/gql/graphql";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";


export default function Home() {

  const {data, loading} = useQuery<GetSimpleCharactersQuery,GetSimpleCharactersQueryVariables>(GET_SIMPLE_CHARACTERS);

  if(loading) return <p>Loading...</p>

  return (
    <div>
      {data?.characters?.results?.map((e)=>(
        <p key={e?.id}>{e?.name}</p>
      ))}
    </div>
  );
}
