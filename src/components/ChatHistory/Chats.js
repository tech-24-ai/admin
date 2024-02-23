import React, { Component } from 'react';
import { UserHelper } from "_helpers";
import Button from "@material-ui/core/Button";
class ChatHistory extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputValue: ''
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
    this.props.handleInputChange(event);
  }


  render() {
    const { chats, formFields, message } = this.props;
 
    return (
      <div style={root}>
        {chats?.map((chat_data, index) => (
          <>
            {chat_data.message_by == "Visitor" ? (
              <>
                <div style={visitorText} key={index}>
                  <p style={{ background: "#f1f3f4", padding: "14px", borderRadius: 8, }}>
                    {chat_data.message}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div style={{
                  consultantText, display: "flex",
                  margin: "0px 10px",
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "end",
                  justifyContent: "flex-end"
                }}>
                  <p style={{
                    background: "#edccd2",
                    padding: "14px",
                    borderRadius: 8,
                    textAlign: "end"
                  }}
                    key={index}
                  >
                    {chat_data.message}
                  </p>
                </div>
              </>
            )}
          </>
        ))}
        {UserHelper.isConsultant() ?
          (
        <form>
          <input name={"message"}
           style={input} type="text" value={message} onChange={(e) => this.handleChange(e)} />
              <Button 
                style={{marginBottom: 6}}
                variant="contained"
                color="primary"
                onClick={(e) => this.props.handleSubmit(e)} type="button">
                Send
              </Button>
        </form>
        ) 
          : ""}
      </div>

    );
  }
}

export default ChatHistory;


const root = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
};

const visitorText = {
  display: "flex",
  // margin: 10,
  width: "100%",
  flexDirection: "row",

  // backgroundColor: "#f1f3f4",
}
const consultantText = {
  display: "flex",
  // margin: 10,
  width: "100%",
  flexDirection: "column",
  // backgroundColor: "#edccd2"
}

const input = {
  flex: 1,
  width: "86%",
  borderRadius: 5,
  margin: 2,
  padding: 6
};

// const messagesDiv = {
//   backgroundColor: "#FBEEE6",
//   padding: 5,
//   display: "flex",
//   flexDirection: "column",
//   flex: 1,
//   maxHeight: 460,
//   overflowY: "scroll",
// };
