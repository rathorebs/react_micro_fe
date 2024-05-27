import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Navigate, useNavigate } from "react-router-dom";
import { VERIFY_COMPANY_TOKEN } from "utility/graphQl/query";
import { TRIGGER_LEARNER_VERIFICATION_EMAIL } from "utility/graphQl/mutation";
import { Email } from "apps/user/common/components/fields";
import { Button } from "apps/user/common/components/button";
import useQueryParams from "components/commons/hooks/useQueryParams";
import Logo from "Assets/images/logo.svg";
import styles from "./../sign-in.module.scss";
import appInfo from "utility/app-info";
import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";
import { PageLoading } from "apps/user/learner/components/page-container";

const SignUpViaCompanyMagicLink: React.FC = () => {
  const params = useQueryParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [subTitle, setSubTitle] = useState(null);
  const [resendEmail, setResendEmail] = useState("");
  const [
    verfiyCompanyToken,
    { loading: verifyTokenLoading, data: verifiTokenData },
  ] = useLazyQuery(VERIFY_COMPANY_TOKEN, {
    fetchPolicy: "no-cache",
    onError(error) {
      console.error("Error while fetching create company page", error);
      navigate("/signup/company/invalid-link");
    },
    onCompleted(res) {
      if (res.verifyCompanyToken.pageState === "invalid-token") {
        navigate("/signup/company/invalid-link");
      } else {
        setTitle(res.verifyCompanyToken.title);
        setSubTitle(res.verifyCompanyToken.subTitle);
        setResendEmail("");
      }
    },
  });

  const [learnerVerificationEmail, { loading, error }] = useMutation(
    TRIGGER_LEARNER_VERIFICATION_EMAIL,
    {
      fetchPolicy: "no-cache",
    }
  );
  const { onChangeColors } = usePatternBackground();

  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  useEffect(() => {
    verfiyCompanyToken({
      variables: {
        companyToken: token,
        appInfo: appInfo,
      },
    });
  }, [token, verfiyCompanyToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    learnerVerificationEmail({
      variables: {
        appInfo: appInfo,
        companyToken: token,
        email: resendEmail ? resendEmail : event?.target?.email?.value,
      },
    })
      .then((res) => {
        if (
          res.data.triggerLearnerVerificationEmail.response.pageState ===
          "invalid-token"
        ) {
          navigate("/signup/company/invalid-link");
        }
        if (
          res.data.triggerLearnerVerificationEmail.response.pageState ===
          "email-sent"
        ) {
          if (resendEmail) {
            alert("Confirmation email sent");
          }
          setResendEmail(
            res.data.triggerLearnerVerificationEmail.response.email
          );
          setTitle(res.data.triggerLearnerVerificationEmail.response.title);
          setSubTitle(
            res.data.triggerLearnerVerificationEmail.response.subTitle
          );
        }
        if (
          res.data.triggerLearnerVerificationEmail.response.pageState ===
            "invalid-email" ||
          res.data.triggerLearnerVerificationEmail.response.pageState ===
            "valid-token"
        ) {
          setResendEmail("");
          setTitle(res.data.triggerLearnerVerificationEmail.response.title);
          setSubTitle(
            res.data.triggerLearnerVerificationEmail.response.subTitle
          );
        }
      })
      .catch((error) => {
        console.log("Create company error:", error);
      });
  };

  const handleGoBack = () => {
    verfiyCompanyToken({
      variables: {
        companyToken: token,
        appInfo: appInfo,
      },
    });
  };

  if (!token) {
    return <Navigate to={"/signin"} />;
  }

  if (verifyTokenLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <PageLoading />
      </div>
    );
  }

  if (verifiTokenData) {
    return (
      <div className={styles["reset-pass-container"]}>
        <Container>
          <Row>
            <Col>
              <form
                onSubmit={handleSubmit}
                className={styles["form-container"]}
              >
                <div className={styles["sign-in-inputs"]}>
                  <img src={Logo} alt="WONE Logo" className={styles["logo"]} />
                  <div className={styles["input-box-containers"]}>
                    <h3 dangerouslySetInnerHTML={{ __html: title }} />
                    <p
                      className={styles["magic-link-heading"]}
                      dangerouslySetInnerHTML={{ __html: subTitle }}
                    />
                    {!resendEmail && (
                      <Email
                        inputProps={{
                          required: true,
                        }}
                      />
                    )}
                    {error && (
                      <p className={styles["error-message"]}>{error.message}</p>
                    )}
                  </div>
                </div>
                <div className={styles["sign-in-buttons"]}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                    loading={loading}
                    disabled={loading}
                  >
                    {resendEmail ? "Resend Email" : "Submit"}
                  </Button>
                  {resendEmail && (
                    <Button
                      variant="secondary"
                      className="w-100"
                      type="button"
                      onClick={handleGoBack}
                    >
                      Go back
                    </Button>
                  )}
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};
export default SignUpViaCompanyMagicLink;
