import gql from 'graphql-tag';

export const TRANSACTION_QUERY = gql`
    query transaction($id: String) {
        transaction(id: $id) {
            id
            hash
            index
            from
            to
            value
            gasUsed
            gasPrice
            timestamp
            block {
                number
                hash
            }
            transferEvents {
                id
                from
                to
                value
            }
        }
    }
`;
