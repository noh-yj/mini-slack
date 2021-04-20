import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import styled from "styled-components";
import { SmileOutlined } from "@ant-design/icons";

function Test() {
  const [isOn, setBtn] = useState(false);

  let emoji_list = [];

  const toggleBtn = () => {
    if (isOn) {
      setBtn(false);
      return;
    }
    setBtn(true);
  };

  const onClick = (emoji, event) => {
    if (emoji_list.length > 0) {
      emoji_list.pop();
    }

    emoji_list.push({ emoji: emoji.native, user_name: "henry" });
    console.log(emoji_list);
  };

  return (
    <TestFrame>
      <ToggleBtn onClick={toggleBtn}>
        {isOn ? (
          <SmileOutlined style={{ fontSize: "24px", color: "#08c" }} />
        ) : (
          <SmileOutlined style={{ fontSize: "24px", color: "gray" }} />
        )}
      </ToggleBtn>
      {/* <Picker onSelect={this.addEmoji} /> */}
      {isOn && (
        <div>
          <Picker
            className="pickerBtn"
            title="Pick your emoji…"
            emoji="point_up"
            enableFrequentEmojiSort={true}
            onClick={onClick}
            native={true}
          />
        </div>
      )}
    </TestFrame>
  );
}

const TestFrame = styled.section`
  width: 100%;
  text-align: center;
`;

const ToggleBtn = styled.button`
  width: 50px;
  height: 50px;
  background: none;
  outline: none;
  border: none;
`;

export default Test;
