import { useState } from "react";
import { useMutation } from "@apollo/client";
import moment from "moment";
import { Modal, ModalBody } from "reactstrap";
import { toast } from "react-toastify";

import styles from "./Modal.module.scss";
import constant from "../../../../Constant";
import { SELF_SERVE_ADD_SEATS } from "../../GraphQl";
import TextField from "../../../../components/commons/fields/text";
import { PrimaryButton, SecondaryButton } from "../../../../components/buttons";

const AddSeats = ({
  isOpen,
  toggle,
  noOfSeats,
  nextPayment,
  seatPricePerMonth,
  seatPricePerMonthMoney,
  currency,
  onRefetchCompanyDetails,
}) => {
  const [numOfSeats, setNumOfSeats] = useState(null);
  const [AddSeats, { loading, error, reset }] =
    useMutation(SELF_SERVE_ADD_SEATS);

  const handleNumOfSeatsChange = (event) => {
    setNumOfSeats(event.target.value);
  };

  const handleClosed = () => {
    setNumOfSeats(null);
    reset();
  };

  const AddSeatsBtnDisabled = !numOfSeats || loading;

  const handleAddSeats = (event) => {
    event.preventDefault();

    AddSeats({ variables: { noOfSeatsToAdd: numOfSeats } }).then((result) => {
      const {
        data: {
          selfServeAddSeats: { seatsAdded },
        },
      } = result;

      toast.success(
        `Successfully added ${seatsAdded ?? ""} seat${
          seatsAdded > 1 ? "s" : ""
        }.`
      );
      onRefetchCompanyDetails();
      toggle();
    });
  };

  let nextPaymentElement = null;
  if (nextPayment) {
    const nextPaymentDateTime = moment(nextPayment.datetime);
    nextPaymentElement = (
      <p className={styles.p}>{`Next payment is on ${nextPaymentDateTime.format(
        "MMM Do, YYYY"
      )}`}</p>
    );
  }

  const additionalCostPerMonth = (
    numOfSeats ? numOfSeats * seatPricePerMonthMoney : 0
  ).toLocaleString("en-US", {
    style: "currency",
    currency: currency,
  });

  const apiErrorElement = error && (
    <p className={styles.error}>{error.message}</p>
  );

  const limitErrorElement = noOfSeats ===
    constant.SELF_SERVE_MAX_NUMBER_OF_SEATS && (
    <p className={styles.error}>
      To add more than 100 seats please{" "}
      <a
        className={styles.a}
        target="_blank"
        rel="noopener noreferrer"
        href={constant.SELF_SERVE_CONTACT_SALES_URL}
      >
        contact sales.
      </a>
    </p>
  );

  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClosed={handleClosed}
      toggle={toggle}
    >
      <ModalBody className={styles.body}>
        <form onSubmit={handleAddSeats}>
          <h1 className={styles.h1}>Add seats</h1>
          <h2 className={styles.h2}>
            You may also add seats automatically by inviting new members
          </h2>
          <div className={styles.input}>
            <div className={styles.label}>
              <h3 className={styles.h3}>Number of seats you want to add</h3>
              <p className={styles.p}>
                Seats are {seatPricePerMonth} / month on your current plan
              </p>
            </div>

            <TextField
              className={styles.field}
              inputProps={{
                type: "number",
                min: 1,
                max: constant.SELF_SERVE_MAX_NUMBER_OF_SEATS - noOfSeats,
                step: 1,
                defaultValue: numOfSeats,
                disabled: noOfSeats === constant.SELF_SERVE_MAX_NUMBER_OF_SEATS,
              }}
              onChange={handleNumOfSeatsChange}
            />
          </div>

          <div className={styles.input}>
            <div className={styles.label}>
              <h3 className={styles.h3}>Additional cost per month</h3>
              {nextPaymentElement}
            </div>
            <p className={`${styles.field} ${styles.bold}`}>
              {additionalCostPerMonth}
            </p>
          </div>

          {apiErrorElement}
          {limitErrorElement}
          <PrimaryButton
            type="submit"
            className={styles.btnPrimary}
            disabled={AddSeatsBtnDisabled}
          >
            {loading ? (
              <div
                className={`spinner-border spinner-border-sm ${styles.spinner}`}
              />
            ) : (
              `Add ${numOfSeats ?? ""} seat${numOfSeats > 1 ? "s" : ""}`
            )}
          </PrimaryButton>
          <SecondaryButton
            type="button"
            className={styles.btnSecondary}
            onClick={toggle}
          >
            Cancel
          </SecondaryButton>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddSeats;
