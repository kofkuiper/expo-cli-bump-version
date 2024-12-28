const { versioner } = require("./dist/index");

export default {
  commands: [
    {
      name: "bump-version",
      func: () => {
        versioner();
      },
    },
  ],
};
