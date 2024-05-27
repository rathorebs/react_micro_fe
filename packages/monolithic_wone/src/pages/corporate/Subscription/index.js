import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import moment from "moment";
import { toast } from "react-toastify";

import constant from "../../../Constant";

import {
  GET_CORPORATE_COMPANY_BY_ID,
  GET_SUBSCRIPTION_CENTER_URL,
} from "../GraphQl";

import AddSeats from "./components/AddSeats";
import RemoveSeats from "./components/RemoveSeats";

import "./styles.css";
import { SecondaryButton } from "../../../components/buttons";

const SubscriptionCentreButton = () => {
  const [subscriptionCenterUrlLoading, setSubscriptionCenterUrlLoading] =
    useState(false);
  const [getSubscriptionCenterUrl] = useLazyQuery(GET_SUBSCRIPTION_CENTER_URL, {
    fetchPolicy: "no-cache",
  });

  const handleClickSubscriptionCenter = () => {
    setSubscriptionCenterUrlLoading(true);
    getSubscriptionCenterUrl()
      .then((result) => {
        const href = result?.data?.getSubscriptionCenterUrl?.url;

        if (href) {
          window.location.href = href;
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setSubscriptionCenterUrlLoading(false);
      });
  };

  return (
    <SecondaryButton
      className="subscription-centre"
      disabled={subscriptionCenterUrlLoading}
      onClick={handleClickSubscriptionCenter}
    >
      {subscriptionCenterUrlLoading ? (
        <div className={`spinner-border spinner-border-sm`} />
      ) : (
        <span>Subscription Centre</span>
      )}
    </SecondaryButton>
  );
};

const Subscription = () => {
  const [showAddSeats, setShowAddSeats] = useState(false);
  const [showRemoveSeats, setShowRemoveSeats] = useState(false);

  const handleOpenAddSeats = () => {
    setShowAddSeats(true);
  };

  const handleCloseAddSeats = () => {
    setShowAddSeats(false);
  };

  const handleOpenRemoveSeats = () => {
    setShowRemoveSeats(true);
  };

  const handleCloseRemoveSeats = () => {
    setShowRemoveSeats(false);
  };

  const handleChangePlan = () => {
    Object.assign(document.createElement("a"), {
      target: "_blank",
      rel: "noopener noreferrer",
      href: constant.SELF_SERVE_CONTACT_SALES_URL,
    }).click();
  };

  const companyId = localStorage.getItem("companyID");

  const { data, loading, error, refetch } = useQuery(
    GET_CORPORATE_COMPANY_BY_ID,
    {
      fetchPolicy: "no-cache",
      variables: { id: companyId },
      onError(error) {
        console.log("loadComapnyDetails error", error);
      },
    }
  );

  if (loading)
    return (
      <div className="subscription-container corporate-container">
        <h1>Loading..</h1>
      </div>
    );

  if (error)
    return (
      <div className="subscription-container corporate-container">
        <h1>Something went wrong! Please try again.</h1>
      </div>
    );

  if (data?.corporateCompany) {
    const {
      subscriptionProduct,
      noOfSeats,
      seatsUsed,
      seatsLeft,
      nextPayment,
    } = data?.corporateCompany;

    const subscriptionPrice = subscriptionProduct.cost.toLocaleString("en-US", {
      style: "currency",
      currency: subscriptionProduct.currency,
    });

    let nextPaymentElement = "No next payment";

    if (nextPayment) {
      const nextPaymentPrice = nextPayment.amount.toLocaleString("en-US", {
        style: "currency",
        currency: nextPayment.currency,
      });

      const nextPaymentDateTime = moment(nextPayment.datetime);
      const nextPaymentIn = nextPaymentDateTime.startOf("day").fromNow();
      const nextPaymentDateTimeFormatted =
        nextPaymentDateTime.format("MMM Do, YYYY");
      nextPaymentElement = (
        <>
          <strong className="bold">{nextPaymentPrice}</strong> ·{" "}
          {nextPaymentDateTimeFormatted} ({nextPaymentIn})
        </>
      );
    }

    return (
      <div className="subscription-container corporate-container">
        {/* <h1>{localStorage.getItem("companyLocation")}</h1> */}
        <h1>Your plan</h1>
        <div className="subscription-wrapper">
          <div className="subscription-wrapper-top">
            <div className="subscribed-employees">
              <div className="subscription-plan-info">
                <p className="subscription-title">Plan</p>
                <p className="subscription-data">{subscriptionProduct.name}</p>
              </div>
              <SecondaryButton onClick={handleChangePlan}>
                Change plan
              </SecondaryButton>
            </div>
            <div className="subscribed-employees">
              <div className="subscription-plan-info">
                <p className="subscription-title">Seats</p>
                <p className="subscription-data">
                  <strong className="bold">{noOfSeats} seats</strong> ·{" "}
                  {seatsUsed} used · {seatsLeft} available
                </p>
              </div>
              <div className="add-remove-btn-container">
                <SecondaryButton
                  onClick={handleOpenAddSeats}
                  className="add-seat-btn"
                >
                  Add
                </SecondaryButton>
                <SecondaryButton
                  onClick={handleOpenRemoveSeats}
                  className="remove-seat-btn"
                >
                  Remove
                </SecondaryButton>
              </div>
            </div>
            <div className="subscribed-subscriptions">
              <p className="subscription-title">Price per seat</p>
              <p className="subscription-data">{subscriptionPrice} / month</p>
            </div>
            <div className="subscribed-sessions">
              <p className="subscription-title">Next payment</p>
              <p className="subscription-data">{nextPaymentElement}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="subscription-title">
            <p>Subscription Management Centre</p>
          </div>
          <div className="subscription-management-container">
            <ul className="subscription-options">
              <li>Update payment details</li>
              <li>View past invoices</li>
              <li>Cancel your subscription</li>
            </ul>
            <div className="subscription-centre-container">
              <SubscriptionCentreButton />
            </div>
          </div>
        </div>
        <AddSeats
          isOpen={showAddSeats}
          toggle={handleCloseAddSeats}
          nextPayment={nextPayment}
          noOfSeats={noOfSeats}
          seatPricePerMonth={subscriptionPrice}
          seatPricePerMonthMoney={subscriptionProduct.cost}
          currency={subscriptionProduct.currency}
          onRefetchCompanyDetails={refetch}
        />
        <RemoveSeats
          isOpen={showRemoveSeats}
          toggle={handleCloseRemoveSeats}
          nextPayment={nextPayment}
          seatsLeft={seatsLeft}
          seatPricePerMonth={subscriptionPrice}
          onRefetchCompanyDetails={refetch}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Subscription;
