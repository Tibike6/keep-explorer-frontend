import gql from 'graphql-tag';

export const TRANSFERS_QUERY = gql`
    query transfers($pageSize: Int, $skip: Int) {
        transfers(first: $pageSize, skip: $skip, orderBy: timestamp, orderDirection: desc) {
            from
            to
            value
            timestamp
            transaction {
                hash
                block {
                    number
                    hash
                }
            }
        }
    }
`;

export const MONTHLY_TRANSFERS_QUERY = gql`
    query montlyTransferAggregations($timestampFrom: Int) {
        montlyTransferAggregations(where: { timestamp_gt: $timestampFrom }) {
            id
            count
            sum
            timestamp
        }
    }
`;

export const DAILY_TRANSFERS_QUERY = gql`
    query dailyTransferAggregations($timestampFrom: Int) {
        dailyTransferAggregations(where: { timestamp_gt: $timestampFrom }) {
            id
            count
            sum
            timestamp
        }
    }
`;
