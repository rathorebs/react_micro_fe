import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import { useAuth } from "providers/auth";
import { logAnalyticsEvent } from "utility/FirebaseAnalytics";
import {
  LEARNER_REGISTER_FOR_GROUP_SESSION,
  LEARNER_UNREGISTER_FOR_GROUP_SESSION,
  LEARNER_JOIN_GROUP_SESSION,
} from "utility/graphQl/mutation";

import appInfo from "utility/app-info";
import { LearnerSessionCardWebPartsFragment } from "../api/types";

const GROUP_SESSION_TYPENAME = "LearnerGroupSession";

interface Props {
  session: LearnerSessionCardWebPartsFragment;
}

export const useGroupSessionActions = ({ session }: Props) => {
  const navigate = useNavigate();
  const { learner } = useAuth();

  const [isJoining, setIsJoining] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isUnRegistering, setIsUnRegistering] = useState(false);

  const [register] = useMutation(LEARNER_REGISTER_FOR_GROUP_SESSION, {
    variables: {
      id: session?.id,
      appInfo,
    },
  });

  const [unRegister] = useMutation(LEARNER_UNREGISTER_FOR_GROUP_SESSION, {
    variables: {
      id: session?.id,
      appInfo,
    },
  });

  const [join] = useMutation(LEARNER_JOIN_GROUP_SESSION, {
    variables: {
      id: session?.id,
      appInfo,
    },
  });

  const handleClickRegisterForGroupSession = (listName, listPosition) => {
    if (session?.__typename !== GROUP_SESSION_TYPENAME) {
      throw new Error(
        `Invalid session type "${session?.__typename}". Expected "${GROUP_SESSION_TYPENAME}"`
      );
    }

    logAnalyticsEvent("group_session_register_click", {
      user_id: learner.id,
      user_id_wone: learner.id,
      user_company_name: learner.companyName,
      group_session_instance_id: session?.id,
      group_session_name: session?.title,
      list_name: listName,
      list_position: listPosition,
      page_title: document.title,
      page_path: window.location.pathname,
    });

    setIsRegistering(true);
    register()
      .catch((error) => {
        toast.error(
          `Could not book ${
            session?.title ?? "this session"
          }, please try again. If the problem persists, contact support@walkingonearth.com`
        );
        console.error(error);
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  const handleClickUnRegisterForGroupSession = (listName, listPosition) => {
    if (session?.__typename !== GROUP_SESSION_TYPENAME) {
      throw new Error(
        `Invalid session type "${session?.__typename}". Expected "${GROUP_SESSION_TYPENAME}"`
      );
    }

    logAnalyticsEvent("group_session_unregister_click", {
      user_id: learner.id,
      user_id_wone: learner.id,
      user_company_name: learner.companyName,
      group_session_instance_id: session?.id,
      group_session_name: session?.title,
      list_name: listName,
      list_position: listPosition,
      page_title: document.title,
      page_path: window.location.pathname,
    });

    setIsUnRegistering(true);
    unRegister()
      .catch((error) => {
        toast.error(
          `Could not cancel booking for ${
            session?.title ?? "this session"
          }, please try again. If the problem persists, contact support@walkingonearth.com`
        );
        console.error(error);
      })
      .finally(() => {
        setIsUnRegistering(false);
      });
  };

  const handleClickJoinGroupSession = (listName, listPosition) => {
    if (session?.__typename !== GROUP_SESSION_TYPENAME) {
      throw new Error(
        `Invalid session type "${session?.__typename}". Expected "${GROUP_SESSION_TYPENAME}"`
      );
    }

    logAnalyticsEvent("group_session_join_click", {
      user_id: learner.id,
      user_id_wone: learner.id,
      user_company_name: learner.companyName,
      group_session_instance_id: session?.id,
      group_session_name: session?.title,
      list_name: listName,
      list_position: listPosition,
      page_title: document.title,
      page_path: window.location.pathname,
    });

    setIsJoining(true);
    join()
      .then((response) => {
        const {
          zoomMtgNumber,
          zoomMtgPassWord,
          zoomMtgSignature,
          learnerBeforeGroupSessionFeedbackForm,
        } = response.data.learnerJoinGroupSession;

        const learnerEmail = localStorage.getItem("userEmailId");

        localStorage.removeItem("isBeforeSessionFeedbackSubmitted");
        localStorage.setItem(
          "teacherfirstName",
          session?.practitioner.firstName
        );

        localStorage.removeItem("typeformFeedbackInputJSON");
        localStorage.setItem(
          "typeformFeedbackInputJSON",
          JSON.stringify({
            app_environment: process.env.REACT_APP_ENV,
            group_session_id: session?.id,
            group_session_name: session?.title,
            group_session_start_date_time: session?.date,
            group_session_end_date_time: session?.time,
            practitioner_name: session?.practitioner.fullName,
            learner_name: learner.fullName,
          })
        );
        navigate(`/user/sessions/group/${session?.id}/meeting`, {
          state: {
            title: `Meeting - ${session?.title} - Sessions`,
            sessionName: session?.title,
            sessionType: "GROUP",
            userId: learner.id,
            sessionId: session?.id,
            activeSessionName: "group",
            teacherId: session?.practitioner.id,
            activeStudentName: learner.fullName,
            activeTeacherName: session?.practitioner.fullName,
            activeUserEmail: learnerEmail,
            listName,
            listPosition,
            zoomMtgSignature,
            zoomMtgPassWord,
            zoomMtgNumber,
            learnerBeforeGroupSessionFeedbackForm:
              learnerBeforeGroupSessionFeedbackForm,
          },
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          `Could not join ${
            session?.title ?? "this session"
          }, please try again. If the problem persists, contact support@walkingonearth.com`
        );
      })
      .finally(() => {
        setIsJoining(false);
      });
  };

  const actions = {
    REGISTER: {
      loading: isRegistering,
      action: handleClickRegisterForGroupSession,
    },
    UNREGISTER: {
      loading: isUnRegistering,
      action: handleClickUnRegisterForGroupSession,
    },
    JOIN: {
      loading: isJoining,
      action: handleClickJoinGroupSession,
    },
  };

  return actions;
};
