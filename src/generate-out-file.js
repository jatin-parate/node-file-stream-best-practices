const fs = require("fs");
const path = require("path");
const util = require("util");

const fn = async () => {
  const file = fs.createWriteStream(path.resolve("out.txt"));
  const write = util.promisify(file.write.bind(file));

  for (let i = 0; i < 1000; i += 1) {
    await write(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quisquam dolores eius libero sequi modi deserunt, fugiat beatae commodi atque, unde quo molestiae nesciunt non? Odit ea fugit nobis quaerat cupiditate quod blanditiis sequi obcaecati maiores. Dolorum fugit nostrum quod inventore accusantium reprehenderit ratione voluptates molestiae, veniam illum ipsum ducimus!\n"
    );
  }

  file.end();
};

fn();
