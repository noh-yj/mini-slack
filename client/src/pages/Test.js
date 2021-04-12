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
    //let index = emoji_list.findIndex((e) => e["emoji"] === emoji.native);

    if (emoji_list.length > 0) {
      emoji_list.pop();
    }

    emoji_list.push({ emoji: emoji.native, user_name: "henry" });
    console.log(emoji_list);
  };

  return (
    <TestFrame>
      <h2>유진님, 버튼 눌러보세요!</h2>
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
      {/* <Picker style={{ position: "absolute", bottom: "20px", right: "20px" }} /> */}
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
