import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };

  const onRegisterHandler = e => {
    e.preventDefault();
    props.history.push("/register");
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    const params = {
      email: Email,
      password: Password
    };

    dispatch(loginUser(params)).then(res => {
      if (res.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="text" value={Email} onChange={onEmailHandler}></input>
        <label>Password</label>
        <input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        ></input>
        <br />
        <div
          style={{
            margin: "0 auto"
          }}
        >
          <button>Login</button>
          <button style={{ marginLeft: "10px" }} onClick={onRegisterHandler}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
