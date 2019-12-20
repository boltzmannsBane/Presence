import React, { useContext, useEffect } from "react";
import firebase from "../../firebase";
import { AuthContext } from "../context/AuthContext";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { SubmitButton } from "../SubmitButton";

const Register = props => {
  const { authStatus, setAuthStatus, setUserInfo } = useContext(AuthContext);

  useEffect(() => {
    authStatus && props.history.replace(`/users/${authStatus.uid}`);
  }, [authStatus]);
  useEffect(() => {
    setUserInfo("");
  }, []);

  return (
    <>
      <h1 style={{ marginLeft: "30px" }}>Register</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Too short")
            .max(15, "15 or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required()
            .min(6, "Too short"),
          confirmPassword: Yup.string()
            .required("Required")
            .test("password-match", "Passwords must match", function(value) {
              return this.parent.password === value;
            })
        })}
        enableReinitialize={true}
        onSubmit={values => {
          firebase
            .register(values.name, values.email, values.password)
            .then(cred => {
              firebase
                .getData("users")
                .doc(cred.user.uid)
                .set({
                  name: values.name,
                  avatar: "",
                  bio: "",
                  tweets: [],
                  gallery: []
                });
              cred && setAuthStatus(cred.user);
              authStatus && props.history.replace(`/users/${cred.user.uid}/gallery`);
            });
        }}
      >
        <Form style={{ marginLeft: "30px" }}>
          <Field
            name="name"
            type="text"
            label="display name"
            component={TextField}
            style={{ marginTop: "10px", width: "50%" }}
          />
          <br />
          <Field
            name="email"
            type="text"
            label="email"
            component={TextField}
            style={{ marginTop: "10px", width: "50%" }}
          />
          <br />
          <Field
            name="password"
            type="password"
            label="password"
            component={TextField}
            style={{ marginTop: "10px", width: "50%" }}
          />
          <br />
          <Field
            name="confirmPassword"
            type="password"
            label="confirm password"
            component={TextField}
            style={{ marginTop: "10px", width: "50%" }}
          />
          <br />
          <SubmitButton />
        </Form>
      </Formik>
    </>
  );
};

export default withRouter(Register);
