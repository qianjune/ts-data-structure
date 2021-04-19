// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

export enum CommentedItemType {
  PRODUCT = "product",
  NOTE = "note",
}
@Table({
  sequelize,
  tableName: "comment",
})
class CommentModel extends Model {
  @Column({
    type: TYPES.INTEGER,
    comment: "评论id",
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    comment: "评论的事物的类型",
    allowNull: false,
  })
  type: string;
  @Column({
    type: TYPES.INTEGER,
    comment: "挂在某个商品下（或其他）",
    allowNull: false,
  })
  underWhich: number;
  @Column({
    type: TYPES.INTEGER,
    comment: "评论的用户id",
    allowNull: false,
  })
  userId: number;
  @Column({
    type: TYPES.INTEGER,
    comment: "回复父评论的id",
    allowNull: false,
    defaultValue: 0,
  })
  parentId: number;
  @Column({
    type: TYPES.TEXT,
    comment: "评论的内容",
    allowNull: false,
  })
  content: string;
}
init(CommentModel);
CommentModel.sync({ alter: true });

export default CommentModel;
