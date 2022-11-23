import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Box component={"form"}>
        <TextField
          fullWidth
          name="username"
          label="お名前"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="パスワード"
          type="password"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="comfirmPassword"
          name="comfirmPassword"
          label="確認用パスワード"
          type="comfirmPassword"
          margin="normal"
          required
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
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
