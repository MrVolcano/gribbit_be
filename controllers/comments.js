const { deleteComment } = require("../models/comments");
const { checkRecordExists } = require("./helpers");

function handleDeleteComment(request, response, next) {
  const commentID = Number(request.params.commentID);

  console.log("comment ID: ", commentID);

  // check comment exists
  checkRecordExists(commentID, "comment_id", "comments").then(() => {
    console.log(`comment ${commentID} exists1`);

    // pass to model
    deleteComment(commentID)
      .then((result) => {
        console.log(result);
        response.status(204).end();
        console.log("record deleted");
      })
      .catch(next);
  });
}

module.exports = { handleDeleteComment };
