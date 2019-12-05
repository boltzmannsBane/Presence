import React, { useContext } from "react";
import firebase from "../firebase";
import { AuthContext } from "./context/AuthContext";
import { withRouter } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import Divider from "@material-ui/core/Divider";
import { SubmitButton } from "./SubmitButton";

const Settings = ({
  history,
  match: {
    params: { id }
  }
}) => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const { authStatus } = useContext(AuthContext);

  const { name, avatar, bio } = userInfo;

  return authStatus && userInfo && authStatus.uid === id ? (
    <div style={{ minHeight: "80vh" }}>
      <h2 style={{ marginLeft: "30px" }}>Display Info</h2>

      <Formik
        initialValues={{ name: name, avatar: avatar, bio: bio }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, "Too short")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          avatar: Yup.string().url("Invalid URL"),
          bio: Yup.string().max(250, "250 symbols or shorter")
        })}
        onSubmit={values => {
          firebase.updateDisplayInfo(
            id,
            values.name,
            values.avatar,
            values.bio
          );
          setUserInfo(values);
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
            name="avatar"
            type="text"
            label="avatar URL"
            component={TextField}
            style={{ marginTop: "10px", width: "50%" }}
          />

          <br />

          <Field
            name="bio"
            type="text"
            label="bio"
            component={TextField}
            multiline
            rows={4}
            rowsMax={10}
            variant="outlined"
            style={{ marginTop: "30px", width: "50%" }}
          />

          <br />

          <SubmitButton />
        </Form>
      </Formik>

      <br />

      <Divider />

      <h2 style={{ marginLeft: "30px" }}>Credentials</h2>

      <Formik
        initialValues={{
          email: authStatus.email,
          password: "",
          confirmPassword: ""
        }}
        validationSchema={Yup.object({
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
          firebase.updateProfile(values.email, values.password);
          history.replace(`/users/${id}/gallery`);
        }}
      >
        <Form style={{ marginLeft: "30px" }}>
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
            label="new password"
            component={TextField}
            style={{ marginTop: "10px", width: "50%" }}
          />

          <br />

          <Field
            name="confirmPassword"
            type="password"
            label="confirm new password"
            component={TextField}
            style={{ marginTop: "10px", width: "50%" }}
          />

          <br />

          <SubmitButton />
        </Form>
      </Formik>
    </div>
  ) : (
    <h1>Lack of Permissions</h1>
  );
};

export default withRouter(Settings);
