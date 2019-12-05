import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import { AuthContext } from "./context/AuthContext";
import { withRouter } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ImageIcon from "@material-ui/icons/Image";
import SubjectIcon from "@material-ui/icons/Subject";

const Header = ({ history, id }) => {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`
    };
  }

  useEffect(() => {
    firebase
      .getData("users")
      .doc(id)
      .get()
      .then(doc => {
        const info = doc.data();
        const { name, avatar, bio } = info;
        setUserInfo({ name, avatar, bio });
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    history.location.pathname === `/users/${id}/gallery` && setValue(0);
    history.location.pathname === `/users/${id}/tweets` && setValue(1);
  }, [history.location.pathname]);

  return (
    <>
      <header>
        <div className="user-avatar">
          <img
            src={
              userInfo.avatar
                ? userInfo.avatar
                : "https://i.pinimg.com/564x/38/55/96/385596c2d02cf1221d1532b877212413.jpg"
            }
            alt="avatar"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </div>
        <div className="break"></div>
        <div className="user-info">
          {<h1>{userInfo.name}</h1>}
          <div className="break"></div>
          {<p style={{ margin: "5px" }}>{userInfo.bio}</p>}
        </div>
        <div className="break"></div>
      </header>
      <nav>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab
            label="Gallery"
            icon={<ImageIcon />}
            onClick={() => history.replace(`/users/${id}/gallery`)}
            {...a11yProps(0)}
          />
          <Tab
            label="Tweets"
            icon={<SubjectIcon />}
            onClick={() => history.replace(`/users/${id}/tweets`)}
            {...a11yProps(1)}
          />
        </Tabs>
      </nav>
    </>
  );
};

export default withRouter(Header);
