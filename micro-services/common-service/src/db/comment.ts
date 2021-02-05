import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";

class CommentModel extends Model {
  // custom property here
}

CommentModel.init(
  {
    id: {
      type: TYPES.INTEGER,
      comment: "评论id",
      primaryKey: true,
      autoIncrement: true,
    },
    underWhich: {
      type: TYPES.INTEGER,
      comment: "挂在某个商品下（或其他）",
      allowNull: false,
    },
    userId: {
      type: TYPES.INTEGER,
      comment: "评论的用户id",
      allowNull: false,
    },
    parentId: {
      type: TYPES.INTEGER,
      comment: "回复父评论的id",
      allowNull: false,
      defaultValue: 0,
    },
    content: {
      type: TYPES.TEXT,
      comment: "评论的内容",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comment",
  }
);

CommentModel.sync({ alter: true });

export default CommentModel;
