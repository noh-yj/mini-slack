import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Test() {
  return (
    <div>
      test
      {/* <Picker onSelect={this.addEmoji} /> */}
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        enableFrequentEmojiSort={true}
        perLine={5}
        set={"facebook"}
      />
      {/* <Picker style={{ position: "absolute", bottom: "20px", right: "20px" }} /> */}
    </div>
  );
}

export default Test;
