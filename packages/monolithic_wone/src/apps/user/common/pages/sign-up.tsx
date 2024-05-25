import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { Email, Password } from "apps/user/common/components/fields";
import { Button } from "apps/user/common/components/button";
import SignInButton from "../components/signinbutton";
import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LEARNER_GET_SIGN_UP_OPTIONS } from "utility/graphQl/query";
import {
  LEARNER_REQUEST_SIGN_UP_WITH_PASSWORD,
  LEARNER_REQUEST_SIGN_UP_WITH_MAGIC_LINK,
} from "utility/graphQl/mutation";
import appInfo from "utility/app-info";
import { PageLoading } from "apps/user/learner/components/page-container";
import Logo from "Assets/images/logo.svg";
import MagicLinkIcon from "Assets/holidays-calendar.svg";
import MicrosoftIcon from "Assets/microsofticon.svg";
import GoogleIcon from "Assets/googleicon.svg";
import styles from "./sign-up.module.scss";

const SignUp = () => {
  const [notEligable, setNotEligable] = useState(false);
  const [email, setEmail] = useState("");
  const [magicLink, setMagicLink] = useState(false);
  const [signUpWithPassword, setSignUpWithPassword] = useState(false);
  const [sucessSignUpWithPassword, setSucessSignUpWithPassword] =
    useState(false);
  const [failureSignUpWithPassword, setFailureSignUpWithPassword] =
    useState(false);
  const navigate = useNavigate();
  const [
    learnerRequestSignUpWithPasswordData,
    setLearnerRequestSignUpWithPasswordData,
  ] = useState("");
  const [enableCreateAccount, setEnableCreateAccount] = useState(false);

  const { onChangeColors } = usePatternBackground();

  const [learnerGetSignUpOptions, { loading, data }] = useLazyQuery(
    LEARNER_GET_SIGN_UP_OPTIONS,
    {
      fetchPolicy: "no-cache",
      onError(error) {
        console.error(
          "Error while fetching learner get sign up options from page",
          error
        );
        setNotEligable(true);
        setEnableCreateAccount(false);
      },
      onCompleted(res) {
        setSignUpWithPassword(
          res.learnerGetSignUpOptions?.options?.some(
            (item) => item.id === "password"
          )
        );
        if (res.learnerGetSignUpOptions?.error) {
          setNotEligable(true);
          setEnableCreateAccount(false);
        } else if (res.learnerGetSignUpOptions?.options) {
          setNotEligable(false);
          setEnableCreateAccount(true);
        }
      },
    }
  );

  const [learnerRequestSignUpWithPassword, { loading: mutationLoading }] =
    useMutation(LEARNER_REQUEST_SIGN_UP_WITH_PASSWORD);
  const [
    learnerRequestSignUpWithMagicLink,
    { loading: mutationMagicLinkLoading, data: mutationMagicLinkData },
  ] = useMutation(LEARNER_REQUEST_SIGN_UP_WITH_MAGIC_LINK);
  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  let signUpButtonText = "Sign Up";
  if (notEligable && data?.learnerGetSignUpOptions?.error) {
    signUpButtonText = data?.learnerGetSignUpOptions?.error?.buttonText;
  }

  let signUpTitle = "Create an account";
  if (notEligable && data?.learnerGetSignUpOptions?.error) {
    signUpTitle = data?.learnerGetSignUpOptions?.error?.title;
  } else if (sucessSignUpWithPassword || magicLink) {
    signUpTitle = "Success";
  }
  const handleSignUp = (event) => {
    event.preventDefault();

    if (
      (data?.learnerGetSignUpOptions?.error?.buttonAction === "back" &&
        signUpButtonText !== "Sign Up") ||
      magicLink
    ) {
      setNotEligable(false);
      setMagicLink(false);
    } else if (
      data?.learnerGetSignUpOptions?.error?.buttonAction === "sign-in"
    ) {
      navigate("/signin");
    } else if (signUpWithPassword) {
      learnerRequestSignUpWithPassword({
        variables: {
          appInfo: appInfo,
          email: event.target.email.value.toLowerCase(),
          password: event.target.password.value.trim(),
        },
      })
        .then((response) => {
          setLearnerRequestSignUpWithPasswordData(
            response?.data?.learnerRequestSignUpWithPassword?.message
          );
          if (response?.data?.learnerRequestSignUpWithPassword?.ok) {
            setSucessSignUpWithPassword(true);
            setEnableCreateAccount(false);
          } else {
            setFailureSignUpWithPassword(true);
            setEnableCreateAccount(true);
          }
        })
        .catch((error) => {
          console.error("Learner request signup with password error:", error);
        });
    } else {
      setNotEligable(true);
      setEmail(event?.target?.email?.value?.toLowerCase());
      learnerGetSignUpOptions({
        variables: {
          appInfo: appInfo,
          email: event?.target?.email?.value?.toLowerCase(),
        },
      });
    }
  };
  const handleMagicLink = () => {
    learnerRequestSignUpWithMagicLink({
      variables: {
        appInfo: appInfo,
        email: email,
      },
    })
      .then((response) => {
        if (response?.data?.learnerRequestSignUpWithMagicLink?.message) {
          setMagicLink(true);
        }
      })
      .catch((error) => {
        console.error("Learner request sign up with magic link error", error);
      });
  };

  if (mutationMagicLinkLoading) {
    return (
      <div className={styles["custom-loader-style"]}>
        <PageLoading />
      </div>
    );
  }

  return (
    <div className={styles["sign-up-container"]}>
      <Container>
        <Row>
          <Col md={{ offset: 3, size: 6 }} sm="12">
            <form onSubmit={handleSignUp} className={styles["form-container"]}>
              <div className={styles["sign-up-inputs"]}>
                <img src={Logo} alt="WONE Logo" className={styles["logo"]} />
                <div className={styles["input-box-containers"]}>
                  <h3>{signUpTitle}</h3>
                  {magicLink && mutationMagicLinkData && (
                    <>
                      <p>
                        {" "}
                        <p>You’ve created your account.</p>
                      </p>
                      <p>
                        {
                          mutationMagicLinkData
                            ?.learnerRequestSignUpWithMagicLink?.message
                        }
                      </p>
                    </>
                  )}
                  {notEligable && data?.learnerGetSignUpOptions?.error ? (
                    <div className={styles["no-eligable"]}>
                      {
                        <p
                          className={styles["lbl-no-opacity"]}
                          dangerouslySetInnerHTML={{
                            __html:
                              data?.learnerGetSignUpOptions?.error?.message,
                          }}
                        />
                      }
                    </div>
                  ) : (
                    <>
                      {sucessSignUpWithPassword ? (
                        <p>You’ve created your account.</p>
                      ) : (
                        !magicLink && (
                          <p className={styles["lbl-opacity"]}>
                            Already have an account?
                            <Link
                              rel="noreferrer"
                              to="/signin"
                              className="text-decoration-underline"
                            >
                              {" Sign in"}
                            </Link>
                          </p>
                        )
                      )}
                      {!enableCreateAccount && !sucessSignUpWithPassword && (
                        <>
                          <p>Enter your work email address to continue</p>
                          <Email
                            inputProps={{
                              required: true,
                            }}
                          />
                        </>
                      )}

                      {!magicLink &&
                        enableCreateAccount &&
                        data?.learnerGetSignUpOptions?.options &&
                        !sucessSignUpWithPassword && (
                          <div>
                            {data.learnerGetSignUpOptions?.options?.find(
                              (item) => item.id === "password"
                            ) &&
                              data.learnerGetSignUpOptions?.options.length !==
                                1 && (
                                <p>
                                  Your company supports multiple sign-up options
                                  to create your account. Choose the option that
                                  best suits you from the following available
                                  sign-up methods.
                                </p>
                              )}
                            {data?.learnerGetSignUpOptions?.options?.map(
                              (item, index) => {
                                return (
                                  <div className="my-4" key={index}>
                                    {item.id === "google-oauth2" && (
                                      <a href={item?.url}>
                                        <SignInButton
                                          title={`${item.name}`}
                                          image={GoogleIcon}
                                        />
                                      </a>
                                    )}
                                  </div>
                                );
                              }
                            )}
                            {data?.learnerGetSignUpOptions?.options?.map(
                              (item, index) => {
                                return (
                                  <div className="my-4" key={index}>
                                    {item.id === "azuread-oauth2" && (
                                      <a href={item?.url}>
                                        <SignInButton
                                          title={`${item.name}`}
                                          image={MicrosoftIcon}
                                        />
                                      </a>
                                    )}
                                  </div>
                                );
                              }
                            )}
                            {data?.learnerGetSignUpOptions?.options?.map(
                              (item, index) => {
                                return (
                                  <div className="my-4" key={index}>
                                    {item.id === "magic-link" && (
                                      <Link
                                        to={item?.url === null && `#`}
                                        onClick={handleMagicLink}
                                      >
                                        <SignInButton
                                          title={`${item.name}`}
                                          image={MagicLinkIcon}
                                        />
                                      </Link>
                                    )}
                                  </div>
                                );
                              }
                            )}
                            {data?.learnerGetSignUpOptions?.options?.map(
                              (item, index) => {
                                return (
                                  <div className="my-4" key={index}>
                                    {item.id === "password" && (
                                      <>
                                        <p className={styles["lbl-opacity"]}>
                                          {data.learnerGetSignUpOptions?.options?.find(
                                            (item) => item.id === "password"
                                          ) &&
                                          data.learnerGetSignUpOptions?.options
                                            .length === 1
                                            ? "Create your account with email and password"
                                            : "OR create your account with email and password"}
                                        </p>
                                        <Email
                                          inputProps={{
                                            required: true,
                                          }}
                                        />
                                        <Password
                                          inputProps={{
                                            required: true,
                                          }}
                                        />
                                        {failureSignUpWithPassword && (
                                          <p
                                            className={
                                              styles["lbl-error-message"]
                                            }
                                          >
                                            {
                                              learnerRequestSignUpWithPasswordData
                                            }
                                          </p>
                                        )}
                                      </>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      {sucessSignUpWithPassword && (
                        <>{learnerRequestSignUpWithPasswordData}</>
                      )}
                    </>
                  )}
                </div>
              </div>

              {!sucessSignUpWithPassword && (
                <div className={styles["sign-up-buttons"]}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                    loading={loading || mutationLoading}
                    disabled={loading || mutationLoading}
                  >
                    {signUpButtonText === null || magicLink
                      ? "BACK"
                      : signUpButtonText}
                  </Button>
                </div>
              )}
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
