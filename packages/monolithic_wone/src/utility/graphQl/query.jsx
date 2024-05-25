import { gql } from "@apollo/client";
import {
  BOOLEAN_INPUT_PARTS,
  LEARNER_ONBOARDING_PARTS,
  LEARNER_PARTS,
  LEARNER_ARTICLE_PARTS,
  LEARNER_ARTICLE_CARD_PARTS,
  LEARNER_RECORDING_PARTS,
  LEARNER_RECORDING_CARD_PARTS,
  LEARNER_SESSION_CARD_PARTS,
  LEARNER_GROUP_SESSION_PARTS,
  LEARNER_PRACTITIONER_PARTS,
  LEARNER_PRACTITIONER_CARD_PARTS,
  LEARNER_CONTENT_LIST_PARTS,
  LEARNER_INDEX_BREAK_DOWN_PILLAR_PARTS,
  LEARNER_PROFILE_SETTINGS_PARTS,
} from "./fragment";

// User detail fragments
export const USER_PARTS = gql`
  fragment UserParts on UserType {
    id
    firstName
    lastName
    username
    email
    isFirstSignIn
    biometrics {
      vitalUserId
      stepCount
      lastNightsSleep
      lastMeasuredHeartrate
    }
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
          paymentLink
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
`;

//QUERY_USER
export const QUERY_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      ...UserParts
    }
  }
  ${USER_PARTS}
`;

//QUERY_LEARNER
export const QUERY_LEARNER = gql`
  query Learner($appInfo: AppInfo!) {
    learner(appInfo: $appInfo) {
      ...LearnerParts
      onboarding {
        ...LearnerOnboardingParts
      }
      biometrics {
        vitalUserId
        providers {
          id
          name
        }
        hasHealthData
        modal {
          title
          contentHtml
          tellMeMoreButtonText
          remindMeLaterButtonText
        }
      }
    }
  }
  ${LEARNER_PARTS}
  ${LEARNER_ONBOARDING_PARTS}
`;

//DELETE BIOMETRICS USER
export const VITAL_DELETE_USER = gql`
  mutation VitalDeleteUser {
    vitalDeleteUser {
      ok
      user {
        ...UserParts
      }
    }
  }
  ${USER_PARTS}
`;

//CREATE BIOMETRICS USER
export const VITAL_CREATE_USER = gql`
  mutation VitalCreateUser {
    vitalCreateUser {
      ok
      user {
        id
        email
        ...UserParts
      }
    }
  }
  ${USER_PARTS}
`;

//JOIN_OUR_COMMUNITY
export const UPCOMING_GROUP_SESSION_LIST = gql`
  query UpcomingGroupSessionList {
    upcomingGroupSessionList {
      upcomingGroupSessions {
        id
        isLeadingTheSession
        instanceDisplayEndDateTime
        joiningLink
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
        groupsessionpeoplejoiningSet {
          user {
            id
          }
        }
        groupSession {
          id
          photo
          description
          groupSessionFor
          name
          day
          classType {
            name
          }
          classObj {
            description
          }
          preparationMaterial
          corporateCompany {
            name
          }
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
    }
  }
`;
//JOIN_OUR_COMMUNITY
export const JOIN_OUR_COMMUNITY = gql`
  query JoinOurCommunity($roleName: String!) {
    joinOurCommunity(roleName: $roleName) {
      companySessionToday {
        id
        instanceDisplayEndDateTime
        joiningLink
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
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
          classType {
            name
          }
          classObj {
            description
          }
          preparationMaterial
          corporateCompany {
            name
          }
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
      companySessionThisWeek {
        id
        instanceDisplayEndDateTime
        joiningLink
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
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
          classType {
            name
          }
          classObj {
            description
          }
          preparationMaterial
          corporateCompany {
            name
          }
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
      communitySessionToday {
        id
        instanceDisplayEndDateTime
        joiningLink
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
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
          }
          corporateCompany {
            id
          }
          classType {
            name
          }
          preparationMaterial
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
        joiningLink
        instanceStartDateTime
        instanceEndDateTime
        sessionEndDateTime
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
          }
          corporateCompany {
            id
          }
          classType {
            name
          }
          preparationMaterial
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
    }
  }
`;
//RECORDINGS
export const RECORDINGS = gql`
  query RecordingsAndArticles {
    recordingsAndArticles {
      recordings {
        id
        recordingUrl
        recordingUrlThumbnail
        recordingDurationText
        teacher {
          id
          userdetailObj {
            userObj {
              firstName
              lastName
            }
          }
        }
        groupSession {
          name
          description
          preparationMaterial
        }
      }
    }
  }
`;
//ARTICLES
export const ARTICLES = gql`
  query RecordingsAndArticles {
    recordingsAndArticles {
      articles {
        id
        photo
        title
        author
      }
    }
  }
`;

//RECORDINGS DETAILS
export const RECORDINGS_DETAILS = gql`
  query GroupSessionInstance($id: ID!) {
    groupSessionInstance(id: $id) {
      id
      recordingUrl
      recordingUrlThumbnail
      recordingDurationText
      teacher {
        userdetailObj {
          userObj {
            firstName
            lastName
          }
        }
      }
      groupSession {
        id
        name
        description
        preparationMaterial
        groupSessionFor
      }
    }
  }
`;
//ARTICLE DETAILS
export const ARTICLE_DETAILS = gql`
  query Article($id: ID!) {
    article(id: $id) {
      id
      title
      author
      photo
      content
    }
  }
`;

//USER FAVORITES ARTICLE
export const USER_FAVORITES_ARTICLE = gql`
  query UserFavorites {
    userFavourites {
      id
      totalArticles
      articles {
        id
        photo
        title
        author
      }
    }
  }
`;

//USER FAVORITES ARTICLES
export const USER_FAVORITES_ARTICLES = gql`
  query UserFavorites {
    userFavourites {
      id
      totalArticles
      articles {
        id
        photo
        title
        author
      }
    }
  }
`;

// USER FAVORITES RECORDINGS

export const USER_FAVORITES_RECORDINGS = gql`
  query UserFavorites {
    userFavourites {
      id
      totalRecordings
      recordings {
        id
        recordingUrl
        recordingUrlThumbnail
        recordingDurationText
        teacher {
          id
          userdetailObj {
            userObj {
              firstName
              lastName
            }
          }
        }
        groupSession {
          name
          description
          preparationMaterial
        }
      }
    }
  }
`;
// STUDENT PROFILE PAGE

export const STUDENT_PROFILE_PAGE = gql`
  query StudentProfilePage {
    studentProfilePage {
      studentData {
        assessmentTaken
        userdetailObj {
          photo
        }
      }
      historyTotalCount
      externalAssessmentUrl
      achievements {
        totalWellbeingHours
      }
      externalAssessmentWebAppDisplayText
      externalAssessmentDisplayButtonText
      externalAssessmentWaitingVideoTitle
      externalAssessmentWaitingVideoClip
      retakeAssessmentDisplayButtonText
      retakeAssessmentReminderDisplayButtonText
      retakeAssessmentReminder
      isWaitingForAssessmentResults
      externalAssessment {
        assessmentPercentage
        id
        nutritionScorePercentage
        nutritionDescription
        energyScorePercentage
        energyDescription
        resilienceScorePercentage
        resilienceDescription
        createdAt
      }
      pillarRecommendations {
        energy {
          articles(limit: 2, order: "random") {
            id
            title
            author
            photo
          }
          sessions {
            id
            instanceStartDateTime
            instanceDisplayEndDateTime
            instanceEndDateTime
            sessionEndDateTime
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
          recordings(limit: 2, order: "random") {
            id
            recordingUrl
            recordingUrlThumbnail
            recordingDurationText
            groupSession {
              name
            }
          }
        }
        resilience {
          articles(limit: 2, order: "random") {
            id
            title
            author
            photo
          }
          sessions {
            id
            instanceStartDateTime
            instanceDisplayEndDateTime
            instanceEndDateTime
            sessionEndDateTime
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
          recordings(limit: 2, order: "random") {
            id
            recordingUrl
            recordingUrlThumbnail
            recordingDurationText
            groupSession {
              name
            }
          }
        }
        activity {
          articles(limit: 2, order: "random") {
            id
            title
            author
            photo
          }
          sessions {
            id
            instanceStartDateTime
            instanceDisplayEndDateTime
            instanceEndDateTime
            sessionEndDateTime
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
          recordings(limit: 2, order: "random") {
            id
            recordingUrl
            recordingUrlThumbnail
            recordingDurationText
            groupSession {
              name
            }
          }
        }
      }
    }
  }
`;

export const PILLAR_LIST = gql`
  query PillarList {
    pillarList {
      ordering
      name
      description
    }
  }
`;

export const LEARNER_SCREEN_RECORDINGS = gql`
  query LearnerScreenRecordings(
    $appInfo: AppInfo!
    $searchQuery: String
    $filters: LearnerContentListFilters
  ) {
    learner(appInfo: $appInfo) {
      id
      screens {
        recordings {
          title
          landingContentLists {
            __typename
            ... on LearnerFeaturedRecordingList {
              id
              label
              items(first: 3) {
                ...LearnerRecordingCardParts
              }
            }
            ... on LearnerRecordingsList {
              id
              label
              items(first: 6) {
                ...LearnerRecordingCardParts
              }
            }
          }
          filteredContentList(filters: $filters) {
            __typename
            ... on LearnerRecordingsList {
              id
              durations
              services
              filterTags
              filters {
                id
                label
                options {
                  value
                  label
                  imageUrl
                  selected
                }
              }
              items(searchQuery: $searchQuery) {
                ...LearnerRecordingCardParts
              }
            }
          }
        }
      }
    }
  }
  ${LEARNER_RECORDING_CARD_PARTS}
`;

export const LEARNER_SCREEN_ARTICLES = gql`
  query LearnerScreenArticles(
    $appInfo: AppInfo!
    $searchQuery: String
    $filters: LearnerContentListFilters
  ) {
    learner(appInfo: $appInfo) {
      id
      screens {
        articles {
          title
          landingContentLists {
            __typename
            ... on LearnerFeaturedArticleList {
              id
              label
              items(first: 3) {
                ...LearnerArticleCardParts
              }
            }
            ... on LearnerArticlesList {
              id
              label
              items(first: 6) {
                ...LearnerArticleCardParts
              }
            }
          }
          filteredContentList(filters: $filters) {
            __typename
            ... on LearnerArticlesList {
              id
              filterTags
              pillarLabels
              durations
              filters {
                id
                label
                options {
                  value
                  label
                  imageUrl
                  selected
                }
              }
              items(searchQuery: $searchQuery) {
                ...LearnerArticleCardParts
              }
            }
          }
        }
      }
    }
  }
  ${LEARNER_ARTICLE_CARD_PARTS}
`;

export const LEARNER_ARTICLE = gql`
  query LearnerArticle($id: ID!, $appInfo: AppInfo!) {
    learnerArticle(id: $id, appInfo: $appInfo) {
      __typename
      ... on LearnerArticle {
        ...LearnerArticleParts
      }
    }
  }
  ${LEARNER_ARTICLE_PARTS}
`;

export const LEARNER_RECORDING = gql`
  query LearnerRecording($id: ID!, $appInfo: AppInfo!) {
    learnerRecording(id: $id, appInfo: $appInfo) {
      __typename
      ... on LearnerRecording {
        ...LearnerRecordingParts
      }
    }
  }
  ${LEARNER_RECORDING_PARTS}
`;

export const LEARNER_SCREEN_SESSIONS_WEB = gql`
  query LearnerScreenSessionsWeb(
    $appInfo: AppInfo!
    $filters: LearnerContentListFilters!
  ) {
    learnerScreenSessions(appInfo: $appInfo) {
      __typename
      title
      contentList(filters: $filters) {
        __typename
        ... on LearnerGroupSessionsList {
          id
          services
          durations
          items {
            __typename
            ... on LearnerGroupSession {
              ...LearnerSessionCardParts
            }
          }
        }
      }
    }
  }
  ${LEARNER_SESSION_CARD_PARTS}
`;

export const LEARNER_SCREEN_SCHEDULE = gql`
  query LearnerScreenSchedule($appInfo: AppInfo!) {
    learner(appInfo: $appInfo) {
      id
      screens {
        schedule {
          title
          contentLists {
            __typename
            ... on LearnerSessionsList {
              id
              label
              services
              durations
              items {
                ...LearnerSessionCardParts
              }
            }
          }
        }
      }
    }
  }
  ${LEARNER_SESSION_CARD_PARTS}
`;

export const LEARNER_SESSION = gql`
  query LearnerSession($id: ID!, $appInfo: AppInfo!) {
    learnerSession(id: $id, appInfo: $appInfo) {
      __typename
      ... on LearnerGroupSession {
        ...LearnerGroupSessionParts
      }
    }
  }
  ${LEARNER_GROUP_SESSION_PARTS}
`;

export const LEARNER_PRACTITIONER = gql`
  query LearnerPractitioner($id: ID!, $appInfo: AppInfo!) {
    learnerPractitioner(id: $id, appInfo: $appInfo) {
      __typename
      ... on LearnerPractitioner {
        ...LearnerPractitionerParts
      }
    }
  }
  ${LEARNER_PRACTITIONER_PARTS}
`;

export const LEARNER_SCREEN_INDEX = gql`
  query LearnerScreenIndex($appInfo: AppInfo!) {
    learner(appInfo: $appInfo) {
      id
      screens {
        index {
          score {
            value
            valueFloat
            labelHtml
            icon
            externalAssessmentButton {
              text
              url
            }
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
          biometrics {
            sessionsHistory {
              state
              callToActionTitle
              callToActionContentHtml
              callToActionButtonText
              contentList {
                __typename
                ... on LearnerGroupSessionsList {
                  id
                  label
                  items {
                    ...LearnerSessionCardParts
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${LEARNER_INDEX_BREAK_DOWN_PILLAR_PARTS}
  ${LEARNER_SESSION_CARD_PARTS}
`;

// QUERY_PROFILE
export const LEARNER_SCREEN_PROFILE = gql`
  query LearnerScreenProfile($appInfo: AppInfo!) {
    learner(appInfo: $appInfo) {
      __typename
      id
      fullName
      photoUrl
      biometrics {
        vitalUserId
        providers {
          id
          name
        }
        hasHealthData
        modal {
          title
          contentHtml
          tellMeMoreButtonText
          remindMeLaterButtonText
        }
      }
      screens {
        __typename
        profile {
          __typename
          journey {
            __typename
            title
            memberSince
            discover {
              titleHtml
              subtitleHtml
              buttonText
            }
            timeInvested {
              __typename
              value
              label
              metric
            }
            sessionsAttended {
              __typename
              value
              label
            }
          }

          favourites {
            __typename
            title
            recordings {
              __typename
              count
              label
              contentList {
                __typename
                ... on LearnerRecordingsList {
                  id
                }
              }
            }
            articles {
              __typename
              count
              label
              contentList {
                __typename
                ... on LearnerArticlesList {
                  id
                }
              }
            }
          }
          settings {
            title
            profile {
              ...LearnerProfileSettingsParts
            }
            notifications {
              title
              toggles {
                ...BooleanInputParts
              }
            }
            calendar {
              title
              toggles {
                ...BooleanInputParts
              }
            }
            ourMission {
              title
              heading
              imageUrl
              contentHtml
            }
            membership {
              title
              type
              advantages {
                heading
                items {
                  name
                  description
                }
              }
            }
            biometrics {
              providers {
                title
                providers {
                  id
                  name
                }
              }
              howItWorks {
                title
                headingTitle
                headingContentHtml
                callToAction {
                  title
                  buttonText
                }
                sections {
                  title
                  items {
                    title
                    contentHtml
                  }
                }
              }
            }
          }
          contentLists {
            __typename
            ... on LearnerGroupSessionsList {
              id
              label
              items {
                __typename
                ...LearnerSessionCardParts
              }
            }
          }
        }
      }
    }
  }

  ${BOOLEAN_INPUT_PARTS}
  ${LEARNER_SESSION_CARD_PARTS}
  ${LEARNER_PROFILE_SETTINGS_PARTS}
`;

export const LEARNER_CONTENT_LIST = gql`
  query LearnerContentList(
    $id: ID!
    $searchQuery: String!
    $filters: LearnerContentListFilters!
    $appInfo: AppInfo!
  ) {
    learnerContentList(
      id: $id
      searchQuery: $searchQuery
      filters: $filters
      appInfo: $appInfo
    ) {
      __typename
      ...LearnerContentListParts
      ... on LearnerSessionsList {
        items(searchQuery: $searchQuery) {
          __typename
          ... on LearnerSessionInterface {
            ...LearnerSessionCardParts
          }
        }
      }
      ... on LearnerGroupSessionsList {
        label
        id
        filters {
          id
          label
          options {
            value
            label
            imageUrl
            selected
          }
        }
        items(searchQuery: $searchQuery) {
          __typename

          ...LearnerSessionCardParts
        }
      }
      ... on LearnerFeaturedSessionList {
        items(searchQuery: $searchQuery) {
          __typename
          ... on LearnerSessionInterface {
            ...LearnerSessionCardParts
          }
        }
      }
      ... on LearnerRecordingsList {
        label
        id
        filters {
          id
          label
          options {
            value
            label
            imageUrl
            selected
          }
        }
        items(searchQuery: $searchQuery) {
          __typename
          ... on LearnerRecording {
            ...LearnerRecordingCardParts
          }
        }
      }
      ... on LearnerFeaturedRecordingList {
        label
        id
        filters {
          id
          label
          options {
            value
            label
            imageUrl
            selected
          }
        }
        items(searchQuery: $searchQuery) {
          __typename
          ... on LearnerRecording {
            ...LearnerRecordingCardParts
          }
        }
      }
      ... on LearnerArticlesList {
        label
        id
        filters {
          id
          label
          options {
            value
            label
            imageUrl
            selected
          }
        }
        items(searchQuery: $searchQuery) {
          __typename
          ... on LearnerArticle {
            ...LearnerArticleCardParts
          }
        }
      }
      ... on LearnerFeaturedArticleList {
        label
        id
        filters {
          id
          label
          options {
            value
            label
            imageUrl
            selected
          }
        }
        items(searchQuery: $searchQuery) {
          __typename
          ... on LearnerArticle {
            ...LearnerArticleCardParts
          }
        }
      }
      ... on LearnerPractitionersList {
        items(searchQuery: $searchQuery) {
          __typename
          ... on LearnerPractitioner {
            ...LearnerPractitionerCardParts
          }
        }
      }
    }
  }
  ${LEARNER_CONTENT_LIST_PARTS}
  ${LEARNER_SESSION_CARD_PARTS}
  ${LEARNER_RECORDING_CARD_PARTS}
  ${LEARNER_ARTICLE_CARD_PARTS}
  ${LEARNER_PRACTITIONER_CARD_PARTS}
`;

export const VERIFY_COMPANY_TOKEN = gql`
  query VerifyCompanyToken($appInfo: AppInfo!, $companyToken: String!) {
    verifyCompanyToken(appInfo: $appInfo, companyToken: $companyToken) {
      success
      pageState
      title
      subTitle
      companyLogo
    }
  }
`;

export const LEARNER_AFTER_GROUP_SESSION_FEEDBACK_FORM = gql`
  query LearnerAfterGroupSessionFeedbackForm(
    $groupSessionId: ID!
    $appInfo: AppInfo!
  ) {
    learnerAfterGroupSessionFeedbackForm(
      groupSessionId: $groupSessionId
      appInfo: $appInfo
    ) {
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
            mid
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
        skipButtonText
      }
    }
  }
`;
export const LEARNER_BEFORE_GROUP_SESSION_FEEDBACK_FORM = gql`
  query LearnerBeforeGroupSessionFeedbackForm(
    $groupSessionId: ID!
    $appInfo: AppInfo!
  ) {
    learnerBeforeGroupSessionFeedbackForm(
      groupSessionId: $groupSessionId
      appInfo: $appInfo
    ) {
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
            mid
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
        skipButtonText
      }
    }
  }
`;
export const LEARNER_GET_SIGN_UP_OPTIONS = gql`
  query LearnerGetSignUpOptions($appInfo: AppInfo!, $email: String!) {
    learnerGetSignUpOptions(appInfo: $appInfo, email: $email) {
      error {
        title
        message
        buttonText
        buttonAction
      }
      options {
        id
        name
        url
      }
    }
  }
`;
export const QUERY_COMPANY_ADMIN = gql`
  query companyAdmin($appInfo: AppInfo!) {
    companyAdmin(appInfo: $appInfo) {
      id
      firstName
      lastName
      fullName
      companyName
      photoUrl
      companyType
      switchToRole
      companyDetailScreen {
        companyInfo {
          title
          subTitle
          photoUrl
          companyName
          billingEmail
          address
        }
        sso {
          title
          items {
            name
            isEnabled
          }
        }
        hris {
          title
          logo
          name
        }
        companyAdmins {
          title
          labels
          members {
            firstName
            lastName
            email
            timezone
          }
        }
      }
    }
  }
`;
