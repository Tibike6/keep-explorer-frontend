import gql from 'graphql-tag';

export const STAKES_QUERY = gql`
    query stakes($pageSize: Int, $skip: Int) {
        stakes(first: $pageSize, skip: $skip, where: { status: Staked }, orderBy: amount, orderDirection: desc) {
            id
            amount
            status
            timestamp
            lockedUntil
            undelegatedAt
            recoveredAt
            lockCreator
            transactionHash
        }
    }
`;
