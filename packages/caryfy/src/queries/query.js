import { gql } from "@apollo/client";

export const API_CALL = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;
