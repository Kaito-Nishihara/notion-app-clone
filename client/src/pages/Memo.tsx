import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StarBorderOutlined, DeleteOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import Memo from "../models/Memo";
import { useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import { useDispatch } from "react-redux";
import Emojipicker from "../components/common/Emojipicker";

const MemoPage = () => {
  const { memoId } = useParams<string>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memos = useSelector((state: any) => state.memo.value);
  useEffect(() => {
    const getMemo = async () => {
      try {
        if (typeof memoId !== "undefined") {
          const res = await memoApi.getOne(memoId);
          const memo = res.data as Memo;
          setTitle(memo.title);
          setDescription(memo.description);
          setIcon(memo.icon);
          console.log(res);
        }
      } catch (error) {
        alert(error);
      }
    };
    getMemo();
  }, [memoId]);

  let timer: string | number | NodeJS.Timeout | undefined;
  const timeout = 600;

  const updateTitle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);
    timer = setTimeout(async () => {
      try {
        if (typeof memoId !== "undefined") {
          await memoApi.update(memoId, { title: newTitle });
        }
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    timer = setTimeout(async () => {
      try {
        if (typeof memoId !== "undefined") {
          await memoApi.update(memoId, { description: newDescription });
        }
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const deleteMemo = async () => {
    try {
      if (typeof memoId !== "undefined") {
        const deleteMemo = await memoApi.delete(memoId);
        console.log(deleteMemo);

        const newMemos = memos.filter((e: any) => e._id !== memoId);
        if (newMemos.length === 0) {
          navigate("/memo");
        } else {
          navigate(`/memo/${newMemos[5]._id}`);
        }
        dispatch(setMemo(newMemos));
      }
    } catch (err) {
      alert(err);
    }
  };

  const onIconChange = async (newIcon: any) => {
    let temp = [...memos];
    const index = temp.findIndex((e) => e._id === memoId);
    temp[index] = { ...temp[index], icon: newIcon };
    setIcon(newIcon);
    dispatch(setMemo(newIcon));
    try {
      if (typeof memoId !== "undefined") {
        await memoApi.update(memoId, { icon: newIcon });
      }
    } catch (err) {}
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlined />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <Emojipicker icon={icon} onChange={onIconChange} />
          <TextField
            onChange={updateTitle}
            value={title}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-intput": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": {
                fontSize: "2rem",
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            onChange={updateDescription}
            value={description}
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-intput": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": {
                fontSize: "1rem",
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default MemoPage;
