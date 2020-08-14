import gql from 'graphql-tag';

export const GRANTS_QUERY = gql`
    query grants($pageSize: Int, $skip: Int) {
        grants(first: 1000, orderBy: id) {
            id
            grantManager
            grantee
            revokedAt
            revokedAmount
            revokedWithdrawn
            revocable
            amount
            duration
            start
            cliff
            withdrawn
            staked
            stakingPolicy
            transactionHash
            timestamp
        }
    }
`;

export const GRANT_QUERY = gql`
    query grants($id: String) {
        grants(id: $id, orderBy: id) {
            id
            grantManager
            grantee
            revokedAt
            revokedAmount
            revokedWithdrawn
            revocable
            amount
            duration
            start
            cliff
            withdrawn
            staked
            stakingPolicy
            transactionHash
            timestamp
        }
    }
`;
