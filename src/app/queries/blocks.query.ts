import gql from 'graphql-tag';

export const BLOCKS_QUERY = gql`
    query blocks($pageSize: Int, $skip: Int) {
        blocks(first: $pageSize, skip: $skip, orderBy: timestamp, orderDirection: desc) {
            timestamp
            hash
            gasUsed
            author
            number
            transactions {
                hash
                transferEvents {
                    from
                    to
                    value
                }
            }
        }
    }
`;

export const BLOCK_QUERY = gql`
    query block($id: String) {
        block(id: $id) {
            id
            hash
            parentHash
            unclesHash
            author
            stateRoot
            transactionsRoot
            receiptsRoot
            number
            gasUsed
            gasLimit
            timestamp
            difficulty
            totalDifficulty
            size
            transactions {
                hash
                transferEvents {
                    id
                }
            }
        }
    }
`;
