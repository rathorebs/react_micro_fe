import { gql } from "@apollo/client";

export const API_CALL = gql`
  query AllStates {
    allStates {
      stateId
      stateName
    }
  }
`;
