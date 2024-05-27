import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { useAuth } from "providers/auth";
import { VITAL_DELETE_USER } from "utility/graphQl/query";
import "./biometrics.styles.scss";
const Biometrics = () => {
  let { user, handleUser } = useAuth();
  const [revokeVitalUser] = useMutation(VITAL_DELETE_USER);

  const removeBiometrics = () => {
    revokeVitalUser()
      .then((res) => {
        handleUser(res.data.vitalDeleteUser.user);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          "Could not remove biometrics at the moment. Please try again later and if the problem persists, contact support@walkingonearth.com"
        );
      });
  };

  if (user && !user.biometrics) {
    return <Navigate to={{ pathname: "/user/sessions" }} />;
  }

  return (
    <div className="corporate-container">
      <div className="remove-biometric-container">
        <Button onClick={removeBiometrics} className="PrimaryButton">
          Remove Biometrics{" "}
        </Button>
      </div>
    </div>
  );
};
export default Biometrics;
