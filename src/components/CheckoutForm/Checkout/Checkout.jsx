import React, { useState, useEffect } from "react";
import { commerce } from "../../../lib/commerce";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";

const steps = ["Shipping address", "Payment details"];
const Checkout = ({ cart, onCaptureCheckout, order, error, CSSBaseline }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        console.log(token);
        setCheckoutToken(token);
      } catch (error) {
        navigate("/");
      }
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <CssBaseline />
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        next={next}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        prevStep={prevStep}
        onCaptureCheckout={onCaptureCheckout}
        shippingData={shippingData}
      />
    );
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
