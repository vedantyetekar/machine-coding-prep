const createReplyBox = () => {
  const div = document.createElement("div");
  div.setAttribute("class", "reply-container");
  div.innerHTML += `<input id="comment" placeholder="type your message" />
          <span class="send-btn">send</span>
        `;
  return div;
};

const createComment = (text, card) => {
  const commentCard = document.createElement("div");
  commentCard.setAttribute("class", "comment-card");
  commentCard.style.marginLeft =
    4 + Number(card.substr(0, card.length - 2)) + "em";
  commentCard.innerHTML += ` <div class="comment-card">
        <div class="comment-text">
${text}
        </div>
        <span class="reply-btn">reply</span>
      </div>`;
  return commentCard;
};

const commentsContainer = document.addEventListener("click", (e) => {
  const replyButtonClicked = e.target.classList.contains("reply-btn");
  const sendButtonClicked = e.target.classList.contains("send-btn");

  if (replyButtonClicked) {
    let closestCard = e.target.closest(".comment-card");
    closestCard.append(createReplyBox());
  }

  if (sendButtonClicked) {
    const text = e.target.closest(".reply-container").children[0].value;
    if (text) {
      document
        .querySelector(".comments-container")
        .appendChild(
          createComment(
            text,
            e.target.closest(".comments-container").children[
              e.target.closest(".comments-container").children.length - 1
            ].style["marginLeft"]
          )
        );
      const closestInputBox = e.target.closest(".reply-container");
      closestInputBox.remove();
    }
  }
});
