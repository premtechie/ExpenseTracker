import { gql } from "@apollo/client";

export const GET_MONTH_ENTRY = gql`
  query {
    monthEntry {
      id
      name
    }
    yearEntry {
      id
      name
    }
  }
`;

export const GET_YEAR_ENTRY = gql`
  query {
    yearEntry {
      id
      name
    }
  }
`;

