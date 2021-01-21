import joi from "@hapi/joi";

export const levelBody = joi.object({
  name: joi.string().required(),
  levelUpAmount: joi.number(),
  img: joi.string(),
  id: joi.number(),
});
