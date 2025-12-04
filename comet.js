// Insert your CometChat credentials
const appID = "YOUR-APP-ID";
const region = "YOUR-REGION";
const authKey = "YOUR-AUTH-KEY";

CometChat.init(appID, { region }).then(() => {
  console.log("CometChat Ready");
});

function loginUser(uid) {
  CometChat.login(uid, authKey).then(
    () => { window.location.href = "chat.html"; },
    err => alert(err.message)
  );
}

let activeFriend = null;

function openChat() {
  activeFriend = document.getElementById("friendID").value;

  CometChat.addMessageListener(
    "listener1",
    new CometChat.MessageListener({
      onTextMessageReceived: msg => displayMsg(msg)
    })
  );
}

function sendMsg() {
  if (!activeFriend) return;

  const text = document.getElementById("msgInput").value;
  const message = new CometChat.TextMessage(activeFriend, text, CometChat.RECEIVER_TYPE.USER);

  CometChat.sendMessage(message).then(displayMsg);
  document.getElementById("msgInput").value = "";
}

function displayMsg(msg) {
  const box = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "msg";
  div.textContent = msg.sender.uid + ": " + msg.text;
  box.appendChild(div);
}
