const { deleteComment } = require("../models/comments");
const { checkRecordExists } = require("./helpers");

function handleDeleteComment(request, response, next) {
  const commentID = Number(request.params.commentID);


  // check comment exists
  checkRecordExists(commentID, "comment_id", "comments")
    .then((commentExists) => {
      if (commentExists) {
        // pass to model
        deleteComment(commentID).then((result) => {
          response.status(204).end();
        });
      } else {
        const error = new Error("Not found");
        error.status = 404;
        error.detail = "Comment not found";
        throw error;
      }
    })
    .catch(next);
}

module.exports = { handleDeleteComment };
