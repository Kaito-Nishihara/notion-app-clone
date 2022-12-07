import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { auth } from "../models/Auth";

const Register = () => {
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");
    const data = new FormData(e.target);
    const username = data.get("username")?.toString().trim();
    const password = data.get("password")?.toString().trim();
    const comfirmPassword = data.get("comfirmPassword")?.toString().trim();
    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください。");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください。");
    }
    if (comfirmPassword === "") {
      error = true;
      setConfirmPasswordErrText("確認用パスワードを入力してください。");
    }
    if (password !== comfirmPassword) {
      error = true;
      setConfirmPasswordErrText("パスワードと確認用パスワードが異なります。");
    }
    if (error) return;

    setLoading(true);

    try {
      const res = await authApi.register({
        username,
        password,
        comfirmPassword,
      });
      setLoading(false);
      const auth = res as unknown as auth;
      localStorage.setItem("token", auth.token);
      navigation("/");
    } catch (err: any) {
      const errors = err.data.errors;
      console.log(errors);
      setLoading(false);
      errors.forEach((e: any) => {
        if (e.param === "username") {
          setUsernameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
        if (e.param === "confirmPassword") {
          setConfirmPasswordErrText(e.msg);
        }
      });
    }
  };
  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          name="username"
          label="お名前"
          margin="normal"
          required
          error={usernameErrText !== ""}
          helperText={usernameErrText}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="パスワード"
          type="password"
          margin="normal"
          required
          error={passwordErrText !== ""}
          helperText={passwordErrText}
        />
        <TextField
          fullWidth
          id="comfirmPassword"
          name="comfirmPassword"
          label="確認用パスワード"
          type="comfirmPassword"
          margin="normal"
          required
          error={confirmPasswordErrText !== ""}
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っているますか？ログイン
      </Button>
    </>
  );
};

export default Register;
