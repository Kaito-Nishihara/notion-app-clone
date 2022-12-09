import { Box, Typography } from "@mui/material";
import Picker from "@emoji-mart/react";
import React, { useState, useEffect } from "react";

const Emojipicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isShowPicker, setIsShowPicker] = useState(false);
  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]);

  const showPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e) => {
    const emojiCode = e.unified.split("-");
    let codesArray = [];
    emojiCode.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setIsShowPicker(false);
    props.onChange(emoji);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box sx={{ display: isShowPicker ? "block" : "none" }}>
        <Picker onSelect={selectEmoji} />
      </Box>
    </Box>
  );
};

export default Emojipicker;
