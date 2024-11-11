import fs from "fs";
import path from "path";

async function globalTeardown() {
  fs.unlink(path.join(__dirname, "state.json"), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

export default globalTeardown;
