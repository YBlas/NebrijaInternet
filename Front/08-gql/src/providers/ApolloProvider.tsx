import { client } from "@/lib/api/gqlClient";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode } from "react";




const ApolloProviderWrapper = ({children} : {children: ReactNode}) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
};


export default ApolloProviderWrapper;