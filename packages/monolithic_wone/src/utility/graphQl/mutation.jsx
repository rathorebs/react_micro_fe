import { gql } from "@apollo/client";
import {
  LEARNER_ONBOARDING_PARTS,
  LEARNER_PARTS,
  LEARNER_ARTICLE_PARTS,
  LEARNER_PRACTITIONER_PARTS,
  LEARNER_RECORDING_PARTS,
  LEARNER_GROUP_SESSION_PARTS,
  LEARNER_PROFILE_PARTS,
  LEARNER_PROFILE_SETTINGS_PARTS,
  BOOLEAN_INPUT_PARTS,
  LEARNER_INDEX_BREAK_DOWN_PILLAR_PARTS,
} from "./fragment";

//USER_SESSION_LINK FOR 1-CLICK SESSION
export const USER_SESSION_LINK = gql`
  mutation UserSessionLink($input: UserSessionLinkInput!) {
    userSessionLink(input: $input) {
      ok
      user {
        id
        email
      }
      privateSession {
        id
        joiningLink
        startDateTime
        endDateTime
        classObj {
          name
          description
        }
        classType {
          name
        }
        teacher {
          id
          landscapePhoto
          userdetailObj {
            photo
            userObj {
              firstName
              lastName
            }
          }
        }
        student {
          id
          userdetailObj {
            photo
            userObj {
              id
              firstName
              lastName
            }
          }
        }
      }
      groupSessionInstance {
        id
        joiningLink
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
        instanceDisplayEndDateTime
        teacher {
          id
          landscapePhoto
          userdetailObj {
            userObj {
              firstName
              lastName
              id
            }
          }
        }
        groupsessionpeoplejoiningSet {
          user {
            userdetail {
              photo
            }
            id
            firstName
            lastName
          }
        }
        groupSession {
          name
          photo
          id
          description
          preparationMaterial
          classObj {
            name
            description
          }
          classType {
            name
          }
          day
          groupSessionFor
          corporateCompany {
            name
          }
        }
      }
    }
  }
`;

//UNREGISTER_FOR_GROUP_SESSION
export const UNREGISTER_FOR_GROUP_SESSION = gql`
  mutation UnRegisterForGroupSession($input: RegisterForGroupSessionInput!) {
    unRegisterForGroupSession(input: $input) {
      groupSessionPersonLeft {
        user {
          firstName
          lastName
        }
        groupSessionInstance {
          instanceDisplayEndDateTime
          instanceStartDateTime
          instanceEndDateTime
        }
      }
    }
  }
`;

//REGISTER_FOR_GROUP_SESSION
export const REGISTER_FOR_GROUP_SESSION = gql`
  mutation RegisterForGroupSession($input: RegisterForGroupSessionInput!) {
    registerForGroupSession(input: $input) {
      groupSessionPersonJoined {
        id
        groupSessionInstance {
          instanceDisplayEndDateTime
          instanceStartDateTime
          instanceEndDateTime
        }
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

//JOIN_OUR_COMMUNITY
export const JOIN_OUR_COMMUNITY = gql`
  query JoinOurCommunity($roleName: String!) {
    joinOurCommunity(roleName: $roleName) {
      communitySessionToday {
        id
        instanceDisplayEndDateTime
        instanceStartDateTime
        instanceEndDateTime
        groupsessionpeoplejoiningSet {
          user {
            userdetail {
              photo
            }
            id
            firstName
            lastName
          }
        }
        groupSession {
          id
          photo
          description
          groupSessionFor
          name
          day
          classObj {
            description
            name
          }
          classType {
            name
          }
          preparationMaterial
        }
        joiningLink
        studentfeedbackbyteacherSet {
          id
          title
          notes
        }
        teacher {
          id
          landscapePhoto
          userdetailObj {
            userObj {
              id
              firstName
              lastName
            }
          }
        }
      }
      communitySessionThisWeek {
        id
        instanceDisplayEndDateTime
        instanceStartDateTime
        instanceEndDateTime
        groupsessionpeoplejoiningSet {
          user {
            userdetail {
              photo
            }
            id
            firstName
            lastName
          }
        }
        groupSession {
          id
          photo
          description
          groupSessionFor
          name
          day
          classObj {
            description
            name
          }
          classType {
            name
          }
          preparationMaterial
        }
        joiningLink
        studentfeedbackbyteacherSet {
          id
          title
          notes
        }
        teacher {
          id
          landscapePhoto
          userdetailObj {
            userObj {
              firstName
              lastName
              id
            }
          }
        }
      }
    }
  }
`;

//QUERY_TEACHERSESSIONDETAILTODAY
export const QUERY_TEACHERSESSIONDETAILTODAY = gql`
  query UserSessionsToday($roleName: String!, $tz: String!) {
    userSessionsToday(roleName: $roleName, tz: $tz) {
      ... on ClassSessionType {
        id
        day
        startDateTime
        endDateTime
        joiningLink
        studentfeedbackbyteacherSet {
          id
          title
          notes
        }
        classType {
          name
        }
        classObj {
          id
          name
          description
          service {
            id
            name
          }
        }
        teacher {
          id
          landscapePhoto
        }
        student {
          id
          userdetailObj {
            photo
            userObj {
              firstName
              lastName
            }
          }
        }
      }

      ... on GroupSessionInstanceType {
        id
        isLeadingTheSession
        instanceDisplayEndDateTime
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
        studentfeedbackbyteacherSet {
          id
          title
          notes
        }
        teacher {
          id
          landscapePhoto
          userdetailObj {
            userObj {
              firstName
              lastName
              id
            }
          }
        }
        groupSession {
          id
          groupSessionFor
          photo
          name
          displayEndTime
          preparationMaterial
          classType {
            name
          }
          description
          corporateCompany {
            name
          }
          classObj {
            name
            description
          }
        }
        joiningLink
        groupsessionpeoplejoiningSet {
          user {
            userdetail {
              photo
            }
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

//QUERY_TEACHERSESSIONDETAILWEEK
export const QUERY_TEACHERSESSIONDETAILWEEK = gql`
  query UserSessionsThisWeek($roleName: String!, $tz: String!) {
    userSessionsThisWeek(roleName: $roleName, tz: $tz) {
      ... on ClassSessionType {
        id
        day
        startDateTime
        endDateTime
        joiningLink
        studentfeedbackbyteacherSet {
          id
          title
          notes
        }
        classType {
          name
        }
        classObj {
          id
          name
          description
          service {
            id
            name
          }
        }
        teacher {
          id
          landscapePhoto
        }
        student {
          id
          userdetailObj {
            photo
            userObj {
              id
              firstName
              lastName
            }
          }
        }
      }

      ... on GroupSessionInstanceType {
        id
        isLeadingTheSession
        instanceDisplayEndDateTime
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
        studentfeedbackbyteacherSet {
          id
          title
          notes
        }
        teacher {
          id
          landscapePhoto
          userdetailObj {
            userObj {
              id
              firstName
              lastName
            }
          }
        }
        groupSession {
          id
          groupSessionFor
          photo
          name
          displayEndTime
          classType {
            name
          }
          description
          corporateCompany {
            name
          }
          classObj {
            name
            description
          }
          preparationMaterial
        }
        groupsessionpeoplejoiningSet {
          user {
            userdetail {
              photo
            }
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;
//QUERY_CREATEACCESSTOKEN
export const QUERY_CREATEACCESSTOKEN = gql`
  mutation CreateAccessToken($input: AccessTokenInput!) {
    createAccessToken(input: $input) {
      agoraDetail {
        channelName
        resourceId
        sid
        uid
      }
      rtcTokenWithUid
      ok
    }
  }
`;

//UPDATE_CLASSSESSION
export const UPDATE_CLASSSESSION = gql`
  mutation updateClassSession($id: ID!, $input: ClassSessionUpdateInput!) {
    updateClassSession(id: $id, input: $input) {
      ok
      classSession {
        id
        sessionJoiningPlatform
        classObj {
          id
          name
        }
      }
    }
  }
`;
//QUERY_FEEDBACKBYSTUDENTID
export const QUERY_FEEDBACKBYSTUDENTID = gql`
  query feedbackByStudentId($id: ID!) {
    feedbackByStudentId(id: $id) {
      id
      notes
      title
      updatedAt
      teacher {
        userdetailObj {
          photo
          userObj {
            firstName
            lastName
          }
        }
      }
      session {
        classObj {
          name
        }
        classType {
          name
        }
      }
    }
  }
`;

//CREATE_SESSION
export const CREATE_SESSION = gql`
  mutation CreateClassSession($input: ClassSessionCreateInput!) {
    createClassSession(input: $input) {
      classSession {
        id
        classObj {
          id
          name
        }
        classType {
          id
          name
        }
        teacher {
          userdetailObj {
            userObj {
              firstName
              lastName
            }
          }
        }
        student {
          userdetailObj {
            userObj {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

//QUERY_SESSIONDETAILWEEK
export const QUERY_SESSIONDETAILWEEK = gql`
  query UserSessionsThisWeek($roleName: String!, $tz: String!) {
    userSessionsThisWeek(roleName: $roleName, tz: $tz) {
      ... on ClassSessionType {
        id
        day
        startDateTime
        endDateTime
        joiningLink
        classType {
          name
        }
        classObj {
          id
          name
          description
          service {
            id
            name
          }
        }
        student {
          id
          userdetailObj {
            photo
            userObj {
              firstName
              lastName
            }
          }
        }
        teacher {
          id
          landscapePhoto
          userdetailObj {
            photo
            userObj {
              id
              firstName
              lastName
            }
          }
        }
      }

      ... on GroupSessionInstanceType {
        id
        instanceDisplayEndDateTime
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
        teacher {
          id
          landscapePhoto
          userdetailObj {
            photo
            userObj {
              firstName
              lastName
            }
          }
        }
        groupSession {
          id
          groupSessionFor
          photo
          name
          displayEndTime
          classType {
            name
          }
          description
          corporateCompany {
            name
          }
          classObj {
            name
            description
          }
          preparationMaterial
        }
        groupsessionpeoplejoiningSet {
          user {
            userdetail {
              photo
            }
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;
//QUERY_SESSIONDETAILTODAY
export const QUERY_SESSIONDETAILTODAY = gql`
  query UserSessionsToday($roleName: String!, $tz: String!) {
    userSessionsToday(roleName: $roleName, tz: $tz) {
      ... on ClassSessionType {
        id
        day
        startDateTime
        endDateTime
        joiningLink
        classType {
          name
        }
        classObj {
          id
          photo
          name
          description
          service {
            id
            name
          }
        }
        student {
          id
          userdetailObj {
            photo
            userObj {
              id
              firstName
              lastName
            }
          }
        }
        teacher {
          id
          landscapePhoto
          userdetailObj {
            photo
            userObj {
              id
              firstName
              lastName
            }
          }
        }
      }

      ... on GroupSessionInstanceType {
        id
        instanceDisplayEndDateTime
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
        teacher {
          id
          landscapePhoto
          userdetailObj {
            photo
            userObj {
              id
              firstName
              lastName
            }
          }
        }

        groupSession {
          groupSessionFor
          photo
          preparationMaterial
          day
          id
          name
          displayEndTime
          classType {
            name
          }
          description
          corporateCompany {
            name
          }
          classObj {
            name
            description
          }
        }
        joiningLink
        groupsessionpeoplejoiningSet {
          user {
            userdetail {
              photo
            }
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;

//TEACHERS_FEEDBACK_BY_STUDENT
export const TEACHERS_FEEDBACK_BY_STUDENT = gql`
  mutation CreateUpdateSessionFeedback(
    $input: CreateUpdateSessionFeedbackInput!
  ) {
    createUpdateSessionFeedback(input: $input) {
      ok
      sessionFeedback {
        id
        privateSession {
          id
        }
        groupSessionInstance {
          id
        }
        user {
          username
        }
        notes
        teacherCharacteristics {
          id
        }
      }
    }
  }
`;
//STUDENTS_FEEDBACK_BY_TEACHER
export const STUDENTS_FEEDBACK_BY_TEACHER = gql`
  mutation CreateUpdateTeacherSessionNotes(
    $input: CreateUpdateTeacherSessionNotesInput!
  ) {
    createUpdateTeacherSessionNotes(input: $input) {
      ok
      sessionNotes {
        id
        privateSession {
          id
        }
        groupSessionInstance {
          id
        }
        title
        notes
      }
    }
  }
`;

export const USER_JOINED_GROUP_SESSION = gql`
  mutation UserJoinedGroupSession($input: UserJoinedGroupSessionInput!) {
    userJoinedGroupSession(input: $input) {
      ok
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($appInfo: AppInfo!, $input: SignInInput!) {
    signIn(appInfo: $appInfo, input: $input) {
      ok
      authToken
      roles
      learner {
        id
        switchToRole
        ...LearnerParts
        onboarding {
          ...LearnerOnboardingParts
        }
      }
      companyAdmin {
        id
        firstName
        lastName
        fullName
        companyName
        photoUrl
        switchToRole
      }
      user {
        id
        firstName
        lastName
        username
        email
        userdetail {
          photo

          role {
            id
            name
          }
          studentdetail {
            id
            availableCredits
            isSubscribed
            subscriptionExipiryDate
            location {
              id
              name
            }
            company {
              id
              name
            }
            plans {
              id
              name
              displayPhrase
            }
            pillar {
              name
              displayPhrase
            }
            onboarding {
              id
            }
          }
          teacherdetail {
            id
          }
        }
      }
    }
  }
  ${LEARNER_PARTS}
  ${LEARNER_ONBOARDING_PARTS}
`;

export const CREATE_ONBOARDING = gql`
  mutation LearnerOnboarding(
    $appInfo: AppInfo!
    $input: LearnerOnboardingInput!
  ) {
    learnerOnboarding(appInfo: $appInfo, input: $input) {
      ok
      learner {
        ...LearnerParts
      }
      welcomeScreen {
        titleHtml
        subtitleHtml
        buttonText
      }
    }
  }
  ${LEARNER_PARTS}
`;

export const SELF_SERVE_CORPORATE_SIGN_IN = gql`
  mutation SelfServeSignIn($email: String!, $password: String!) {
    signIn: selfServeCorporateSignIn(
      input: { email: $email, password: $password }
    ) {
      ok
      authToken
      paymentLink
      isFirstSignIn
      user {
        id
        firstName
        lastName
        username
        email
        userdetail {
          photo
          role {
            id
            name
          }
          studentdetail {
            id
            company {
              id
              name
            }
            corporatecompanyadminSet {
              location {
                id
                location
              }
            }
          }
        }
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePasswordWithLink($input: ChangePasswordInputWithLink!) {
    changePasswordWithLink(input: $input) {
      user {
        id
        username
        email
      }
      ok
      sentMail
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPasswordWithLink($input: ResetPasswordInput!) {
    resetPasswordWithLink(input: $input) {
      ok
      message
    }
  }
`;

export const REPORT_ARTICLE_OPEN = gql`
  mutation ReportArticleOpen(
    $articleId: ID!
    $at: String!
    $platform: String!
  ) {
    reportArticleOpen(articleId: $articleId, at: $at, platform: $platform) {
      ok
      groupUuid
    }
  }
`;

export const REPORT_ARTICLE_SCROLL_START = gql`
  mutation ReportArticleScrollStart(
    $articleId: ID!
    $at: String!
    $platform: String!
    $groupUuid: ID!
  ) {
    reportArticleScrollStart(
      articleId: $articleId
      at: $at
      platform: $platform
      groupUuid: $groupUuid
    ) {
      ok
    }
  }
`;

export const REPORT_ARTICLE_SCROLL_PROGRESS = gql`
  mutation ReportArticleScrollProgress(
    $articleId: ID!
    $at: String!
    $platform: String!
    $groupUuid: ID!
    $percentage: Int!
  ) {
    reportArticleScrollProgress(
      articleId: $articleId
      at: $at
      platform: $platform
      groupUuid: $groupUuid
      percentage: $percentage
    ) {
      ok
    }
  }
`;

export const REPORT_ARTICLE_SCROLL_END = gql`
  mutation ReportArticleScrollEnd(
    $articleId: ID!
    $at: String!
    $platform: String!
    $groupUuid: ID!
  ) {
    reportArticleScrollEnd(
      articleId: $articleId
      at: $at
      platform: $platform
      groupUuid: $groupUuid
    ) {
      ok
    }
  }
`;

export const REPORT_RECORDING_OPEN = gql`
  mutation ReportRecordingOpen(
    $recordingId: ID!
    $at: String!
    $platform: String!
  ) {
    reportRecordingOpen(
      recordingId: $recordingId
      at: $at
      platform: $platform
    ) {
      ok
      groupUuid
    }
  }
`;

export const REPORT_RECORDING_VIDEO_START = gql`
  mutation ReportRecordingVideoStart(
    $recordingId: ID!
    $at: String!
    $platform: String!
    $groupUuid: ID!
  ) {
    reportRecordingVideoStart(
      recordingId: $recordingId
      at: $at
      platform: $platform
      groupUuid: $groupUuid
    ) {
      ok
    }
  }
`;

export const REPORT_RECORDING_VIDEO_PROGRESS = gql`
  mutation ReportRecordingVideoProgress(
    $recordingId: ID!
    $at: String!
    $platform: String!
    $groupUuid: ID!
    $percentage: Int!
    $duration: Int!
    $currentTime: Int!
  ) {
    reportRecordingVideoProgress(
      recordingId: $recordingId
      at: $at
      platform: $platform
      groupUuid: $groupUuid
      percentage: $percentage
      duration: $duration
      currentTime: $currentTime
    ) {
      ok
    }
  }
`;

export const REPORT_RECORDING_VIDEO_END = gql`
  mutation ReportRecordingVideoEnd(
    $recordingId: ID!
    $at: String!
    $platform: String!
    $groupUuid: ID!
  ) {
    reportRecordingVideoEnd(
      recordingId: $recordingId
      at: $at
      platform: $platform
      groupUuid: $groupUuid
    ) {
      ok
    }
  }
`;

export const QUERY_CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      user {
        id
        username
        email
      }
      ok
      sentMail
    }
  }
`;

export const QUERY_UPDATE_CORPORATE_ADMIN = gql`
  mutation UpdateStudentdetail($id: ID!, $input: StudentDetailUpdateInput!) {
    updateStudentdetail(id: $id, input: $input) {
      studentDetail {
        id
        userdetailObj {
          userObj {
            id
            firstName
            lastName
            email
            username
          }
        }
      }
      ok
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut($appInfo: AppInfo!) {
    signOut(appInfo: $appInfo) {
      ok
    }
  }
`;

export const LEARNER_FAVOURITE = gql`
  mutation LearnerFavourite($id: ID!, $typename: String!, $appInfo: AppInfo!) {
    learnerFavourite(id: $id, typename: $typename, appInfo: $appInfo) {
      ok
      item {
        __typename
        ... on LearnerArticle {
          ...LearnerArticleParts
        }
        ... on LearnerRecording {
          ...LearnerRecordingParts
        }
        ... on LearnerPractitioner {
          ...LearnerPractitionerParts
        }
      }
    }
  }
  ${LEARNER_ARTICLE_PARTS}
  ${LEARNER_RECORDING_PARTS}
  ${LEARNER_PRACTITIONER_PARTS}
`;

export const LEARNER_UN_FAVOURITE = gql`
  mutation LearnerUnFavourite(
    $id: ID!
    $typename: String!
    $appInfo: AppInfo!
  ) {
    learnerUnFavourite(id: $id, typename: $typename, appInfo: $appInfo) {
      ok
      item {
        __typename
        ... on LearnerArticle {
          ...LearnerArticleParts
        }
        ... on LearnerRecording {
          ...LearnerRecordingParts
        }
        ... on LearnerPractitioner {
          ...LearnerPractitionerParts
        }
      }
    }
  }
  ${LEARNER_ARTICLE_PARTS}
  ${LEARNER_RECORDING_PARTS}
  ${LEARNER_PRACTITIONER_PARTS}
`;

export const LEARNER_REGISTER_FOR_GROUP_SESSION = gql`
  mutation LearnerRegisterForGroupSession($id: ID!, $appInfo: AppInfo!) {
    learnerRegisterForGroupSession(id: $id, appInfo: $appInfo) {
      ok
      learnerGroupSession {
        ...LearnerGroupSessionParts
      }
    }
  }
  ${LEARNER_GROUP_SESSION_PARTS}
`;

export const LEARNER_UNREGISTER_FOR_GROUP_SESSION = gql`
  mutation LearnerUnRegisterForGroupSession($id: ID!, $appInfo: AppInfo!) {
    learnerUnRegisterForGroupSession(id: $id, appInfo: $appInfo) {
      ok
      learnerGroupSession {
        ...LearnerGroupSessionParts
      }
    }
  }
  ${LEARNER_GROUP_SESSION_PARTS}
`;

export const LEARNER_JOIN_GROUP_SESSION = gql`
  mutation LearnerJoinGroupSession($appInfo: AppInfo!, $id: ID!) {
    learnerJoinGroupSession(appInfo: $appInfo, id: $id) {
      ok
      learnerBeforeJoiningGroupSessionFeedbackForm {
        biometricsBubble {
          title
          contentHtml
        }
      }
      learnerBeforeGroupSessionFeedbackForm {
        biometricsBubble {
          title
          contentHtml
        }
        messages {
          title
          senderAvatarUrl
          senderName
          textHtml
          input {
            __typename
            ... on RangeInput {
              id
              label
              required
              min
              minLabel
              max
              maxLabel
              step
            }
            ... on TextInput {
              id
              label
              required
              minLength
              maxLength
              placeholder
            }
            ... on SelectInput {
              id
              label
              required
              options {
                label
                value
              }
            }
          }
          buttonText
        }
      }
      zoomMtgNumber
      zoomMtgPassWord
      zoomMtgSignature
    }
  }
`;

export const LEARNER_SUBMIT_BEFORE_GROUP_SESSION_FEEDBACK = gql`
  mutation LearnerSubmitBeforeGroupSessionFeedback(
    $appInfo: AppInfo!
    $groupSessionId: ID!
    $type: String!
    $input: [LearnerGroupSessionFeedbackInput]!
  ) {
    learnerSubmitBeforeGroupSessionFeedback(
      appInfo: $appInfo
      groupSessionId: $groupSessionId
      type: $type
      input: $input
    ) {
      ok
    }
  }
`;

export const LEARNER_SUBMIT_AFTER_GROUP_SESSION_FEEDBACK = gql`
  mutation LearnerSubmitAfterGroupSessionFeedback(
    $appInfo: AppInfo!
    $groupSessionId: ID!
    $type: String!
    $input: [LearnerGroupSessionFeedbackInput]!
  ) {
    learnerSubmitAfterGroupSessionFeedback(
      appInfo: $appInfo
      groupSessionId: $groupSessionId
      type: $type
      input: $input
    ) {
      ok
    }
  }
`;

export const LEARNER_UPDATE_HOURS_PER_WEEK = gql`
  mutation LearnerUpdateHoursPerWeek($appInfo: AppInfo!, $value: Int!) {
    learnerUpdateHoursPerWeek(appInfo: $appInfo, value: $value) {
      ok
      learner {
        id
        firstName
        lastName
        fullName
        photoUrl
        screens {
          profile {
            ...LearnerProfileParts
          }
        }
      }
    }
  }
  ${LEARNER_PROFILE_PARTS}
`;

export const LEARNER_UPDATE_PROFILE_SETTINGS = gql`
  mutation LearnerUpdateProfileSettings(
    $input: LearnerUpdateProfileSettingsInput!
    $appInfo: AppInfo!
  ) {
    learnerUpdateProfileSettings(appInfo: $appInfo, input: $input) {
      __typename
      ok
      learner {
        __typename
        id
        firstName
        lastName
        fullName
        photoUrl
        screens {
          __typename
          profile {
            __typename
            settings {
              __typename
              title
              profile {
                __typename
                ...LearnerProfileSettingsParts
              }
            }
          }
        }
      }
    }
  }
  ${LEARNER_PROFILE_SETTINGS_PARTS}
`;

export const LEARNER_UPDATE_NOTIFICATION_SETTINGS_TOGGLE = gql`
  mutation LearnerUpdateNotificationSettingsToggle(
    $id: ID!
    $checked: Boolean!
    $appInfo: AppInfo!
  ) {
    learnerUpdateNotificationSettingsToggle(
      id: $id
      checked: $checked
      appInfo: $appInfo
    ) {
      learner {
        id
        screens {
          profile {
            settings {
              notifications {
                toggles {
                  ...BooleanInputParts
                }
              }
            }
          }
        }
      }
    }
  }
  ${BOOLEAN_INPUT_PARTS}
`;

export const LEARNER_UPDATE_CALENDAR_SETTINGS_TOGGLE = gql`
  mutation LearnerUpdateCalendarSettingsToggle(
    $id: ID!
    $checked: Boolean!
    $appInfo: AppInfo!
  ) {
    learnerUpdateCalendarSettingsToggle(
      id: $id
      checked: $checked
      appInfo: $appInfo
    ) {
      __typename
      ok
      learner {
        __typename
        id
        screens {
          __typename
          profile {
            __typename
            settings {
              __typename
              calendar {
                __typename
                toggles {
                  __typename
                  ...BooleanInputParts
                }
              }
            }
          }
        }
      }
    }
  }
  ${BOOLEAN_INPUT_PARTS}
`;

export const LEARNER_EXTERNAL_ASSESSMENT_COMPLETE = gql`
  mutation LearnerExternalAssessmentComplete($appInfo: AppInfo!) {
    learnerExternalAssessmentComplete(appInfo: $appInfo) {
      ok
      learner {
        screens {
          index {
            score {
              value
              valueFloat
              labelHtml
              icon
            }
            coach {
              name
              avatarUrl
              messageTextHtml
              externalAssessmentButton {
                text
                url
              }
            }
            breakdown {
              energy {
                ...LearnerIndexBreakdownPillarParts
              }
              resilience {
                ...LearnerIndexBreakdownPillarParts
              }
              activity {
                ...LearnerIndexBreakdownPillarParts
              }
            }
            progress {
              title
              labels
              minValue
              maxValue
              energyData {
                label
                values
              }
              resilienceData {
                label
                values
              }
              activityData {
                label
                values
              }
            }
          }
        }
      }
    }
  }
  ${LEARNER_INDEX_BREAK_DOWN_PILLAR_PARTS}
`;

export const LEARNER_BIOMETRICS_DISCONNECT_PROVIDER = gql`
  mutation LearnerBiometricsDisconnectProvider($id: ID!, $appInfo: AppInfo!) {
    learnerBiometricsDisconnectProvider(id: $id, appInfo: $appInfo) {
      ok
      learner {
        __typename
        id
        biometrics {
          hasHealthData
        }
        screens {
          profile {
            settings {
              biometrics {
                providers {
                  title
                  providers {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const LEARNER_BIOMETRICS_DELETE_HEALTH_DATA = gql`
  mutation LearnerBiometricsDeleteHealthData($appInfo: AppInfo!) {
    learnerBiometricsDeleteHealthData(appInfo: $appInfo) {
      ok
      learner {
        __typename
        id
        biometrics {
          hasHealthData
        }
        screens {
          profile {
            settings {
              biometrics {
                providers {
                  title
                  providers {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const LEARNER_BIOMETRICS_MODAL_DONT_ASK_AGAIN = gql`
  mutation LearnerBiometricsModalDontAskAgain($appInfo: AppInfo!) {
    learnerBiometricsModalDontAskAgain(appInfo: $appInfo) {
      learner {
        id
        biometrics {
          modal {
            title
            contentHtml
            tellMeMoreButtonText
            remindMeLaterButtonText
          }
        }
      }
    }
  }
`;

export const LEARNER_BIOMETRICS_MODAL_TELL_ME_MORE = gql`
  mutation LearnerBiometricsModalTellMeMore($appInfo: AppInfo!) {
    learnerBiometricsModalTellMeMore(appInfo: $appInfo) {
      learner {
        id
        biometrics {
          modal {
            title
            contentHtml
            tellMeMoreButtonText
            remindMeLaterButtonText
          }
        }
      }
    }
  }
`;

export const LEARNER_BIOMETRICS_MODAL_REMIND_ME_LATER = gql`
  mutation LearnerBiometricsModalRemindMeLater($appInfo: AppInfo!) {
    learnerBiometricsModalRemindMeLater(appInfo: $appInfo) {
      learner {
        id
        biometrics {
          modal {
            title
            contentHtml
            tellMeMoreButtonText
            remindMeLaterButtonText
          }
        }
      }
    }
  }
`;

export const TRIGGER_LEARNER_VERIFICATION_EMAIL = gql`
  mutation TriggerLearnerVerificationEmail(
    $appInfo: AppInfo!
    $companyToken: String!
    $email: String!
  ) {
    triggerLearnerVerificationEmail(
      appInfo: $appInfo
      companyToken: $companyToken
      email: $email
    ) {
      response {
        success
        email
        title
        subTitle
        pageState
      }
    }
  }
`;

export const REQUEST_SIGN_IN_WITH_MAGIC_LINK = gql`
  mutation RequestSignInWithMagicLink($email: String!, $appInfo: AppInfo!) {
    requestSignInWithMagicLink(email: $email, appInfo: $appInfo) {
      ok
      message
    }
  }
`;
export const LEARNER_REQUEST_SIGN_UP_WITH_PASSWORD = gql`
  mutation LearnerRequestSignUpWithPassword(
    $appInfo: AppInfo!
    $email: String!
    $password: String!
  ) {
    learnerRequestSignUpWithPassword(
      appInfo: $appInfo
      email: $email
      password: $password
    ) {
      ok
      message
    }
  }
`;
export const LEARNER_REQUEST_SIGN_UP_WITH_MAGIC_LINK = gql`
  mutation LearnerRequestSignUpWithMagicLink(
    $appInfo: AppInfo!
    $email: String!
  ) {
    learnerRequestSignUpWithMagicLink(appInfo: $appInfo, email: $email) {
      ok
      message
    }
  }
`;
