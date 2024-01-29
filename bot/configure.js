import axios from "axios";
import { createInterface } from "readline";
import process from "process";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

function exitError(error) {
  console.error(`Error! ${error}`);
  process.exit(1);
}

// ansi shadow font
const banner = `
████████╗██╗ ██████╗████████╗ ██████╗ ███╗   ██╗     ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ 
╚══██╔══╝██║██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║    ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ 
   ██║   ██║██║        ██║   ██║   ██║██╔██╗ ██║    ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
   ██║   ██║██║        ██║   ██║   ██║██║╚██╗██║    ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
   ██║   ██║╚██████╗   ██║   ╚██████╔╝██║ ╚████║    ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
   ╚═╝   ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝ 
`;

console.log(banner);

let botUsername;

(async () => {
  const accessToken = await question("Enter your bot access token: ");
  if (!accessToken?.length > 0) exitError("Token is required");

  const appUrl = await question("Enter your app url: ");
  if (!appUrl?.length > 0) exitError("App url is required");

  const getBot = await axios
    .get(`https://api.telegram.org/bot${accessToken}/getMe`)
    .catch(exitError);

  botUsername = getBot.data.result.username;
  console.log(`\n\nSetting bot ${botUsername} webapp url to ${appUrl}`);

  const resp = await axios
    .post(`https://api.telegram.org/bot${accessToken}/setChatMenuButton`, {
      menu_button: {
        type: "web_app",
        text: "Launch Webapp",
        web_app: {
          url: appUrl,
        },
      },
    })
    .catch(exitError);

  if (resp.status === 200) {
    console.log(
      `\nYou're all set! Visit https://t.me/${botUsername} to interact with your bot`,
    );
    process.exit();
  } else {
    exitError(`\nSomething went wrong! ${resp.error}`);
  }
})();
