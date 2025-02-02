import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { LS_TOKEN } from './constants';

const token = localStorage.getItem(LS_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
    uri: "https://ubereats-challenge-backend.herokuapp.com/graphql",
    //uri:"http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
        ...headers,
        "x-jwt": authTokenVar() || "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies:{
            Query:{
                fields:{
                    isLoggedIn:{
                        read(){
                            return isLoggedInVar();
                        }
                    },
                    token: {
                        read() {
                            return authTokenVar();
                        },
                    },
                }
            }
        }
    })
});