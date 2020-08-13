import gql from 'graphql-tag';

export const TOKENHOLDERS_QUERY = gql`
    query grants($pageSize: Int, $skip: Int) {
        tokenHolders(first: $pageSize, skip: $skip, orderBy: tokenBalance, orderDirection: desc) {
            id
            tokenBalance
            transfersCount
        }
    }
`;
