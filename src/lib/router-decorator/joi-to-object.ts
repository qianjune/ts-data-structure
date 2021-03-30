// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import convert from "joi-to-json";
import { ParameterType } from ".";
const nameHandler = (l: string) => {
  switch (l) {
    case "body":
      return "body";
      break;
    case "params":
      return "path";
      break;
    case "query":
      return "query";
      break;
    default:
      break;
  }
};
export const joiToObject = (
  parameters: {
    schema: any;
    type: ParameterType.BODY | ParameterType.PARAMS | ParameterType.QUERY;
  },
  path: string
): any => {
  if (!parameters) return [];
  const { schema, type } = parameters;
  // console.log(key, "key...");

  let result = convert(schema);
  if (type === ParameterType.QUERY) {
    const keys = Object.keys(result.properties) || [];
    result = keys.map((key, index) => {
      return {
        name: key,
        in: "query",
        // description: "The user name for login",
        required: result.required?.includes(key),
        type: result.properties[key].type,
      };
    });
  } else if (type === ParameterType.BODY) {
    result = [
      {
        in: type,
        name: nameHandler(type),
        // params: 'abc'
        schema: result,
      },
    ];
  } else if (type === ParameterType.PARAMS) {
    if (path.indexOf("/:") > -1) {
      const matchData = path.match(/\/:([^\/]+)/);
      // console.log(matchData, type, "key...");
      result = [
        {
          in: type,
          name: matchData[1],
          // params: 'abc'
          schema: result,
        },
      ];
    }
  }
  return result;
};
