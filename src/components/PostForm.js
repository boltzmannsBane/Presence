import React, { useContext } from "react";
import firebase from "../firebase";
import { AuthContext } from "./context/AuthContext";
import { Formik, Field, FieldArray, Form } from "formik";
import { TextField } from "formik-material-ui";
import { generate } from "shortid";
import * as Yup from "yup";
import AddBoxIcon from "@material-ui/icons/AddBox";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CreateIcon from "@material-ui/icons/Create";
import { SubmitButton } from "./SubmitButton";
import Button from "@material-ui/core/Button";

export const PostForm = ({ posts, id, elementName }) => {
  const { authStatus } = useContext(AuthContext);

  const ratio = window.innerHeight > window.innerWidth;

  const style = ratio ? { width: "70%" } : { width: "50%" };

  const validateURL = value => {
    let error;
    if (!value) {
      error = "Required";
    } else if (
      !/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
        value
      )
    ) {
      error = "Invalid URL";
    }
    return error;
  };

  const galleryValidation = Yup.object({
    text: Yup.string()
      .min(1, "Must be 15 characters or less")
      .max(500, "Must be no longer than 500 characters")
      .required("Required"),
    images: Yup.array()
      .min(1, "Gallery requires at least 1 image")
      .max(4, "4 images or less")
  });

  const tweetValidation = Yup.object({
    text: Yup.string()
      .min(1, "Must be 15 characters or less")
      .max(250, "Must be no longer than 250 characters")
      .required("Required")
  });

  return (
    authStatus &&
    authStatus.uid === id && (
      <Formik
        initialValues={{
          text: "",
          images: [],
          timestamp: new Date().toISOString(),
          id: generate()
        }}
        validationSchema={
          elementName === "tweets" ? tweetValidation : galleryValidation
        }
        enableReinitialize={true}
        onSubmit={(values, { resetForm, initialValues }) => {
          authStatus && elementName === "tweets"
            ? firebase.addTweet(id, values, posts)
            : firebase.addPhoto(id, values, posts);
          resetForm(initialValues);
        }}
      >
        {({ values }) => (
          <Form style={{ marginLeft: "30px" }}>
            <Field
              name="text"
              type="text"
              label={<CreateIcon />}
              component={TextField}
              multiline
              rows={4}
              rowsMax={10}
              margin="normal"
              variant="outlined"
              style={{ width: "80%" }}
            />
            <FieldArray
              name="images"
              render={arrayHelpers => (
                <div>
                  {values.images && values.images.length > 0 ? (
                    values.images.map((image, index) => (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "baseline" }}
                      >
                        <Field
                          label="paste image URL"
                          validate={validateURL}
                          name={`images.${index}`}
                          component={TextField}
                          variant="outlined"
                          style={{ width: "70%", marginTop: "10px" }}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove an image from the list
                        >
                          <HighlightOffIcon />
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          <AddBoxIcon color="primary" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      color='primary'
                      style={{ marginTop: "20px" }}
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add Image
                    </Button>
                  )}
                  <div>
                    <SubmitButton values={values} elementName={elementName}/>
                  </div>
                </div>
              )}
            />
            <pre style={{ marginTop: "30px", marginLeft: "0px" }}>
              <ul
                style={{
                  ...style,
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  margin: "0",
                  padding: "0"
                }}
              >
                {values.images &&
                  values.images.map(
                    image =>
                      image && (
                        <li
                          key={image}
                          style={{
                            display: "inline-block",
                            margin: "0",
                            padding: "0"
                          }}
                        >
                          <img
                            src={image}
                            alt="pic"
                            style={{
                              width: "100px",
                              height: "70px",
                              objectFit: "cover"
                            }}
                          />
                        </li>
                      )
                  )}
              </ul>
            </pre>
          </Form>
        )}
      </Formik>
    )
  );
};
