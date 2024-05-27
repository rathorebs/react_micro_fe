import { gql, useMutation } from "@apollo/client";
import constants from "../utils/constants";

const USER_JOINED_GROUP_SESSION = gql`
  mutation UserJoinedGroupSession($input: UserJoinedGroupSessionInput!) {
    userJoinedGroupSession(input: $input) {
      ok
    }
  }
`;

const REPORT_GROUP_SESSION_PING = gql`
  mutation ReportGroupSessionPing(
    $groupSessionInstanceId: ID!
    $input: GroupSessionReportDataInput!
  ) {
    reportGroupSessionPing(
      groupSessionInstanceId: $groupSessionInstanceId
      input: $input
    ) {
      ok
    }
  }
`;

const REPORT_GROUP_SESSION_LEFT = gql`
  mutation ReportGroupSessionLeft(
    $groupSessionInstanceId: ID!
    $input: GroupSessionReportDataInput!
  ) {
    reportGroupSessionLeft(
      groupSessionInstanceId: $groupSessionInstanceId
      input: $input
    ) {
      ok
    }
  }
`;

export default function useReportEvents(sessionId) {
  const [reportGroupSessionPing] = useMutation(REPORT_GROUP_SESSION_PING);
  const [reportGroupSessionLeft] = useMutation(REPORT_GROUP_SESSION_LEFT);
  const [userJoinedGroupSession] = useMutation(USER_JOINED_GROUP_SESSION);

  return {
    reportGroupSessionJoin: () =>
      userJoinedGroupSession({
        variables: {
          input: {
            groupSessionInstanceID: sessionId,
            sessionJoiningPlatform: constants.APP_PLATFORM,
          },
        },
      }),
    reportGroupSessionPing: () =>
      reportGroupSessionPing({
        variables: {
          groupSessionInstanceId: sessionId,
          input: {
            at: new Date().getTime(),
            platform: constants.APP_PLATFORM,
          },
        },
      }),
    reportGroupSessionLeave: () =>
      reportGroupSessionLeft({
        variables: {
          groupSessionInstanceId: sessionId,
          input: {
            at: new Date().getTime(),
            platform: constants.APP_PLATFORM,
          },
        },
      }),
  };
}
