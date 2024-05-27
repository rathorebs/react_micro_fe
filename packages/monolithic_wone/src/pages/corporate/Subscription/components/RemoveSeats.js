import { useState } from "react";
import { useMutation } from "@apollo/client";
import moment from "moment";
import { Modal, ModalBody } from "reactstrap";
import { toast } from "react-toastify";

import styles from "./Modal.module.scss";
import { SELF_SERVE_REMOVE_SEATS } from "../../GraphQl";
import TextField from "../../../../components/commons/fields/text";
import { PrimaryButton, SecondaryButton } from "../../../../components/buttons";

const RemoveSeats = ({
  isOpen,
  toggle,
  seatsLeft,
  nextPayment,
  seatPricePerMonth,
  onRefetchCompanyDetails,
}) => {
  const [numOfSeats, setNumOfSeats] = useState(null);
  const [removeSeats, { loading, error, reset }] = useMutation(
    SELF_SERVE_REMOVE_SEATS
  );

  const handleNumOfSeatsChange = (event) => {
    setNumOfSeats(event.target.value);
  };

  const handleClosed = () => {
    setNumOfSeats(null);
    reset();
  };

  const removeSeatsBtnDisabled = !numOfSeats || loading;

  const handleRemoveSeats = (event) => {
    event.preventDefault();

    removeSeats({ variables: { noOfSeatsToRemove: numOfSeats } }).then(
      (result) => {
        const {
          data: {
            selfServeRemoveSeats: { seatsRemoved },
          },
        } = result;

        toast.success(
          `Successfully removed ${seatsRemoved ?? ""} seat${
            seatsRemoved > 1 ? "s" : ""
          }.`
        );
        onRefetchCompanyDetails();
        toggle();
      }
    );
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

  const apiErrorElement = error && (
    <p className={styles.error}>{error.message}</p>
  );

  const limitErrorElement = !seatsLeft && (
    <p className={styles.error}>
      To remove seats from your plan first you must delete members.
    </p>
  );

  const seatsAvailableText = seatsLeft
    ? `You currently have ${seatsLeft} seat${
        seatsLeft >= 1 ? "s" : ""
      } available on your account.`
    : "You currently have 0 open seats on your account.";

  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClosed={handleClosed}
      toggle={toggle}
    >
      <ModalBody className={styles.body}>
        <form onSubmit={handleRemoveSeats}>
          <h1 className={styles.h1}>Remove seats</h1>
          <h2 className={styles.h2}>{seatsAvailableText}</h2>
          <div className={styles.input}>
            <div className={styles.label}>
              <h3 className={styles.h3}>Number of seats you want to remove</h3>
              <p className={styles.p}>
                Seats are {seatPricePerMonth} / month on your current plan
              </p>
            </div>

            <TextField
              className={styles.field}
              inputProps={{
                type: "number",
                min: 1,
                max: seatsLeft,
                step: 1,
                defaultValue: numOfSeats,
                disabled: !seatsLeft,
              }}
              onChange={handleNumOfSeatsChange}
            />
          </div>

          {nextPaymentElement}

          {apiErrorElement}

          {limitErrorElement}

          <PrimaryButton
            type="submit"
            className={styles.btnPrimary}
            color="primary"
            disabled={removeSeatsBtnDisabled}
          >
            {loading ? (
              <div
                className={`spinner-border spinner-border-sm ${styles.spinner}`}
              />
            ) : (
              `Remove ${numOfSeats ?? ""} seat${numOfSeats > 1 ? "s" : ""}`
            )}
          </PrimaryButton>
          <SecondaryButton
            type="button"
            className={styles.btnSecondary}
            color="link"
            onClick={toggle}
          >
            Cancel
          </SecondaryButton>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default RemoveSeats;
