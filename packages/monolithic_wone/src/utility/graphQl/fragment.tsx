import { gql } from "@apollo/client";

export const LEARNER_SESSION_CARD_PARTS = gql`
  fragment LearnerSessionCardParts on LearnerGroupSession {
    __typename
    id
    title
    subtitle
    pillarLabel
    service
    duration
    date
    time
    timeZone
    imageUrl
    biometrics {
      label
      heartrateGraph {
        startValueLabel
        endValueLabel
        diffMessage
        diffValueLabel
        minValue
        maxValue
        stepValue
        values
        minTimeValue
        maxTimeValue
        stepTimeValue
        timeValues
      }
    }
    buttons {
      join {
        style
        action
        text
      }
      register {
        style
        action
        text
      }
      unRegister {
        style
        action
        text
      }
      trackBiometrics {
        style
        action
        text
      }
    }
    practitioner {
      id
      firstName
      fullName
    }
  }
`;

export const LEARNER_GROUP_SESSIONS_LIST_PARTS = gql`
  fragment LearnerGroupSessionsListParts on LearnerGroupSessionsList {
    id
    label
    items {
      __typename
      ... on LearnerGroupSession {
        ...LearnerSessionCardParts
      }
    }
  }
  ${LEARNER_SESSION_CARD_PARTS}
`;

export const LEARNER_RECORDING_CARD_PARTS = gql`
  fragment LearnerRecordingCardParts on LearnerRecording {
    id
    title
    subtitle
    pillarLabel
    service
    videoDurationText
    sessionDuration
    imageUrl
  }
`;

export const LEARNER_RECORDINGS_LIST_PARTS = gql`
  fragment LearnerRecordingsListParts on LearnerRecordingsList {
    id
    label
    items {
      __typename
      ... on LearnerRecording {
        ...LearnerRecordingCardParts
      }
    }
  }
  ${LEARNER_RECORDING_CARD_PARTS}
`;

export const LEARNER_PRACTITIONER_PARTS = gql`
  fragment LearnerPractitionerParts on LearnerPractitioner {
    id
    landscapeImageUrl
    fullName
    about
    accreditation {
      title
      items
      textHtml
    }
    intro {
      title
      textHtml
      videoUrl
      videoThumbnailUrl
    }
    contentLists {
      __typename
      ... on LearnerGroupSessionsList {
        ...LearnerGroupSessionsListParts
      }
      ... on LearnerRecordingsList {
        ...LearnerRecordingsListParts
      }
    }
    isFavourite
  }
  ${LEARNER_GROUP_SESSIONS_LIST_PARTS}
  ${LEARNER_RECORDINGS_LIST_PARTS}
`;

export const LEARNER_ONBOARDING_PARTS = gql`
  fragment LearnerOnboardingParts on LearnerOnboardingForm {
    __typename
    intro {
      __typename
      titleHtml
      subtitleHtml
      buttonText
      skipButtonText
      logoutButtonText
      imageUrl
    }
    inputs {
      __typename
      ... on SingleInputScreen {
        id
        titleHtml
        subtitleHtml
        input {
          __typename
          ... on SelectInput {
            __typename
            id
            label
            required
            options {
              __typename
              label
              value
              selected
            }
          }
          ... on MultiSelectInput {
            id
            required
            options {
              __typename
              label
              value
              selected
            }
          }
          ... on DateInput {
            id
            label
            required
          }
          ... on BooleanInput {
            id
            label
            required
            reverseLogic
            checked
          }
        }
        buttonText
        skipButtonText
      }
      ... on MultipleInputsScreen {
        id
        buttonText
        titleHtml
        subtitleHtml
        inputs {
          __typename
          ... on SelectInput {
            __typename
            id
            label
            required
            options {
              __typename
              label
              value
              selected
            }
          }
          ... on MultiSelectInput {
            id
            required
            options {
              __typename
              label
              value
            }
          }
          ... on TextInput {
            id
            label
            placeholder
            required
            minLength
            maxLength
            value
          }
          ... on DateInput {
            id
            label
            required
            value
          }
          ... on BooleanInput {
            id
            label
            required
            reverseLogic
          }
          ... on ImageInput {
            id
            label
            required
            value
          }
        }
      }
    }
    animation {
      __typename
      percentageStart
      percentageEnd
      transitionDurationSec
      textHtml
    }
  }
`;

export const LEARNER_PARTS = gql`
  fragment LearnerParts on Learner {
    id
    firstName
    lastName
    fullName
    photoUrl
    companyName
    switchToRole
    screens {
      index {
        exercise {
          title
          subTitle
          videoUrl
          videoThumbnailUrl
          buttonText
        }
      }
      you {
        welcome {
          titleHtml
          subtitleHtml
        }
        indexScore {
          value
          valueFloat
          labelHtml
          pattern
          icon
        }
      }
    }
  }
`;

export const LEARNER_ARTICLE_CARD_PARTS = gql`
  fragment LearnerArticleCardParts on LearnerArticle {
    id
    title
    subtitle
    imageUrl
    pillarLabel
    readTime
  }
`;

export const LEARNER_ARTICLE_PARTS = gql`
  fragment LearnerArticleParts on LearnerArticle {
    id
    title
    subtitle
    pillarLabel
    imageUrl
    contentHtml
    isFavourite
  }
`;

export const LEARNER_PRACTITIONER_CARD_PARTS = gql`
  fragment LearnerPractitionerCardParts on LearnerPractitioner {
    id
    firstName
    fullName
    photoUrl
    services
  }
`;

export const LEARNER_RECORDING_PARTS = gql`
  fragment LearnerRecordingParts on LearnerRecording {
    id
    title
    subtitle
    pillarLabel
    service
    videoUrl
    videoThumbnailUrl
    videoDurationText
    imageUrl
    about
    equipment {
      id
      label
      icon
    }
    practitioner {
      ...LearnerPractitionerCardParts
    }
    isFavourite
  }
  ${LEARNER_PRACTITIONER_CARD_PARTS}
`;

export const LEARNER_GROUP_SESSION_PARTS = gql`
  fragment LearnerGroupSessionParts on LearnerGroupSession {
    id
    title
    subtitle
    pillarLabel
    service
    duration
    filterTags
    date
    time
    timeZone
    about
    equipment {
      id
      label
      icon
    }
    imageUrl
    practitioner {
      ...LearnerPractitionerCardParts
    }
    buttons {
      join {
        style
        action
        text
      }
      register {
        style
        action
        text
      }
      unRegister {
        style
        action
        text
      }
      trackBiometrics {
        style
        action
        text
      }
    }
    biometrics {
      label
      heartrateGraph {
        startValueLabel
        endValueLabel
        diffMessage
        diffValueLabel
        minValue
        maxValue
        stepValue
        values
        minTimeValue
        maxTimeValue
        stepTimeValue
        timeValues
      }
    }
  }
  ${LEARNER_PRACTITIONER_CARD_PARTS}
`;

export const LEARNER_INDEX_BREAK_DOWN_PILLAR_PARTS = gql`
  fragment LearnerIndexBreakdownPillarParts on LearnerIndexBreakdownPillar {
    pillarLabel
    title
    subtitle
    score {
      value
      valueFloat
      labelHtml
      icon
    }
    descriptionHtml
    contentLists {
      __typename
      ... on LearnerIndexBreakdownPillarContentList {
        id
        label
        items(first: 3) {
          __typename
          ... on LearnerGroupSession {
            ...LearnerSessionCardParts
          }
          ... on LearnerRecording {
            ...LearnerRecordingCardParts
          }
          ... on LearnerArticle {
            ...LearnerArticleCardParts
          }
        }
      }
    }
  }
  ${LEARNER_SESSION_CARD_PARTS}
  ${LEARNER_RECORDING_CARD_PARTS}
  ${LEARNER_ARTICLE_CARD_PARTS}
`;

export const RANGE_INPUT_PARTS = gql`
  fragment RangeInputParts on RangeInput {
    __typename
    id
    label
    required
    min
    minLabel
    max
    maxLabel
    step
  }
`;

export const LEARNER_PROFILE_PARTS = gql`
  fragment LearnerProfileParts on LearnerProfileScreen {
    journey {
      title
      memberSince
      timeInvested {
        value
        label
        metric
      }
      sessionsAttended {
        value
        label
      }
    }
    goals {
      title
      hoursPerWeek {
        value
        minValue
        progressValue
        maxValue
        input {
          ... on RangeInput {
            ...RangeInputParts
          }
        }
      }
    }
    favourites {
      title
      recordings {
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
    contentLists {
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
  ${RANGE_INPUT_PARTS}
  ${LEARNER_SESSION_CARD_PARTS}
`;

export const LEARNER_CONTENT_LIST_PARTS = gql`
  fragment LearnerContentListParts on LearnerContentListInterface {
    id
    label
    filters {
      __typename
      id
      label
      options {
        value
        label
        imageUrl
        selected
      }
    }
  }
`;

export const SELECT_INPUT_PARTS = gql`
  fragment SelectInputParts on SelectInput {
    id
    label
    required
    options {
      label
      value
      imageUrl
      selected
    }
  }
`;

export const MULTI_SELECT_INPUT_PARTS = gql`
  fragment MultiSelectInputParts on MultiSelectInput {
    id
    label
    required
    options {
      label
      value
      imageUrl
      selected
    }
  }
`;

export const BOOLEAN_INPUT_PARTS = gql`
  fragment BooleanInputParts on BooleanInput {
    id
    label
    required
    reverseLogic
    checked
  }
`;

export const DATE_INPUT_PARTS = gql`
  fragment DateInputParts on DateInput {
    id
    label
    required
    minDate
    maxDate
    value
  }
`;
export const IMAGE_INPUT_PARTS = gql`
  fragment ImageInputParts on ImageInput {
    id
    label
    required
    value
  }
`;

export const TEXT_INPUT_PARTS = gql`
  fragment TextInputParts on TextInput {
    id
    label
    required
    minLength
    maxLength
    placeholder
    value
  }
`;

export const INPUT_PARTS = gql`
  fragment InputParts on Input {
    ... on SelectInput {
      ...SelectInputParts
    }
    ... on MultiSelectInput {
      ...MultiSelectInputParts
    }
    ... on BooleanInput {
      ...BooleanInputParts
    }
    ... on DateInput {
      ...DateInputParts
    }
    ... on ImageInput {
      ...ImageInputParts
    }
    ... on TextInput {
      ...TextInputParts
    }
    ... on RangeInput {
      ...RangeInputParts
    }
  }
  ${SELECT_INPUT_PARTS}
  ${MULTI_SELECT_INPUT_PARTS}
  ${BOOLEAN_INPUT_PARTS}
  ${DATE_INPUT_PARTS}
  ${IMAGE_INPUT_PARTS}
  ${TEXT_INPUT_PARTS}
  ${RANGE_INPUT_PARTS}
`;

export const LEARNER_PROFILE_SETTINGS_PARTS = gql`
  fragment LearnerProfileSettingsParts on LearnerProfileSettings {
    title
    fields {
      photoUrl {
        ... on ImageInput {
          ...ImageInputParts
        }
      }
      firstName {
        ... on TextInput {
          ...TextInputParts
        }
      }
      lastName {
        ... on TextInput {
          ...TextInputParts
        }
      }
      injuries {
        ... on TextInput {
          ...TextInputParts
        }
      }
      birthday {
        ... on DateInput {
          ...DateInputParts
        }
      }
      gender {
        ... on SelectInput {
          ...SelectInputParts
        }
      }
    }
  }
  ${IMAGE_INPUT_PARTS}
  ${TEXT_INPUT_PARTS}
  ${DATE_INPUT_PARTS}
  ${SELECT_INPUT_PARTS}
`;
export const LEARNER_SESSION_CARD_WEB_PARTS = gql`
  fragment LearnerSessionCardWebParts on LearnerGroupSession {
    __typename
    id
    title
    subtitle
    pillarLabel
    service
    duration
    filterTags
    date
    time
    timeZone
    imageUrl
    buttons {
      join {
        style
        action
        text
      }
      register {
        style
        action
        text
      }
      unRegister {
        style
        action
        text
      }
      trackBiometrics {
        style
        action
        text
      }
    }
    practitioner {
      id
      firstName
      fullName
    }
    biometrics {
      heartrateGraph {
        startValueLabel
        endValueLabel
        diffMessage
        diffValueLabel
        minValue
        maxValue
        stepValue
        values
        minTimeValue
        maxTimeValue
        stepTimeValue
        timeValues
      }
    }
  }
`;
