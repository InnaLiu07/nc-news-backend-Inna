const { deleteCommentById } = require("../models/deleteCommentById");

const deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  if (isNaN(Number(comment_id))) {
    return res.status(400).send({ msg: "Invalid comment_id format" });
  }

  deleteCommentById(comment_id)
    .then((wasDeleted) => {
      if (!wasDeleted) {
        return res.status(404).send({ msg: "Comment not found" });
      }
      res.status(204).send();
    })
    .catch((err) => {
      console.error("DELETE error:", err);
      next(err);
    });
};

module.exports = {
  deleteComment,
};
