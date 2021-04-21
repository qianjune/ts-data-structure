const bodyDemo = {
  parameters: {
    in: "body",
    name: "body",
    description: "Pet object that needs to be added to the store",
    required: true,
    schema: {
      type: "object",
      required: ["name", "photoUrls"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        category: {
          $ref: "#/definitions/Category",
        },
        name: {
          type: "string",
          example: "doggie",
        },
        photoUrls: {
          type: "array",
          xml: {
            name: "photoUrl",
            wrapped: true,
          },
          items: {
            type: "string",
          },
        },
        tags: {
          type: "array",
          xml: {
            name: "tag",
            wrapped: true,
          },
          items: {
            $ref: "#/definitions/Tag",
          },
        },
        status: {
          type: "string",
          description: "pet status in the store",
          enum: ["available", "pending", "sold"],
        },
      },
      xml: {
        name: "Pet",
      },
    },
  },
};