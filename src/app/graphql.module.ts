import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, APOLLO_NAMED_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClientOptions } from 'apollo-client';

const keepUri = 'https://api.thegraph.com/subgraphs/name/tibike6/keep';
const tbtcUri = 'https://api.thegraph.com/subgraphs/name/tibike6/tbtc';

export function createDefaultApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: httpLink.create({ uri: keepUri }),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all'
            }
        }
    };
}

export function createNamedApollo(httpLink: HttpLink): Record<string, ApolloClientOptions<any>> {
    return {
        keep: {
            name: 'keep',
            link: httpLink.create({ uri: keepUri }),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    errorPolicy: 'all'
                }
            }
        },
        tbtc: {
            name: 'tbtc',
            link: httpLink.create({ uri: tbtcUri }),
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    errorPolicy: 'all'
                }
            }
        }
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            deps: [HttpLink],
            useFactory: createDefaultApollo
        },
        {
            provide: APOLLO_NAMED_OPTIONS,
            deps: [HttpLink],
            useFactory: createNamedApollo
        }
    ]
})
export class GraphQLModule {}
