const fs = require("fs");
const path = require("path");

const IGNORE = ["node_modules", ".git", ".next", ".turbo"];
const MAX_DEPTH = 3;

function printTree(dir, depth = 0, prefix = "") {
  if (depth > MAX_DEPTH) return;

  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach((file, idx) => {
    const isLast = idx === files.length - 1;
    const pointer = isLast ? "└── " : "├── ";

    if (!IGNORE.includes(file.name)) {
      console.log(prefix + pointer + file.name);
      if (file.isDirectory()) {
        const newPrefix = prefix + (isLast ? "    " : "│   ");
        printTree(path.join(dir, file.name), depth + 1, newPrefix);
      }
    }
  });
}

printTree(".", 0, "");
