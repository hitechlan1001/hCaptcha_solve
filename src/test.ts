import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const siteKey = "5f9e718a-9fee-4a3c-bae4-f12a3a9eb446"; // atomicmail.io hCaptcha key
  const apiKey = process.env.API_KEY!;
  const websiteURL = "https://atomicmail.io/app/auth/sign-up";

  // Step 1: Solve hCaptcha invisible
  const createTaskRes = await axios.post(
    "https://api.2captcha.com/createTask",
    {
      clientKey: apiKey,
      task: {
        type: "HCaptchaTaskProxyless",
        websiteURL,
        websiteKey: siteKey,
        isInvisible: true,
      },
    }
  );

  if (createTaskRes.data.errorId !== 0) {
    console.error("❌ Task creation failed:", createTaskRes.data);
    return;
  }

  const taskId = createTaskRes.data.taskId;
  console.log("🛠️ hCaptcha task created. ID:", taskId);

  let token = "";
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 5000)); // wait 5 sec

    const resultRes = await axios.post(
      "https://api.2captcha.com/getTaskResult",
      {
        clientKey: apiKey,
        taskId,
      }
    );
    // console.log(resultRes);
    if (resultRes.data.status === "processing") {
      console.log("⏳ Still solving...");
      continue;
    }

    if (resultRes.data.status === "ready") {
      token = resultRes.data.solution.gRecaptchaResponse;
      break;
    }
  }

  if (!token) {
    console.log("❌ Failed to solve hCaptcha");
    return;
  }

  console.log("✅ captcha Solved:", token);

  // Step 2: Create AtomicMail account
  const payload = {
    name: "Auto User",
    password:
      "7eeaa8170c957f07b95305f78785a59cf241ce7b8bde34f1fe25d5f876b8151a",
    username: "autouser" + Math.floor(Math.random() * 100000),
    encryptedSeedPhrase:
      "6f908735465b6700a67d88448731cfa7:267edba97140707e449647a8bd51b72cfe07ca29c56c26216f5d63ade1d66076f4219c4b2d1f7e8d1e76568c91f08606d2099686c591762f8516036f57b8219f73245f6a4f4fa792e055891f7734d7bea5816882deba1bba2ad9ef4c007707c6",
    publicKey:
      "0x0262d44f5b30afd0c7dc66a06a0b7d23d3bb15dd9f68a487e4cbb65da7a5744c03",
    captcha: token,
  };

  try {
    const registerRes = await axios.post(
      "https://api.atomicmail.io/v1/auth/sign-up",
      payload,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          authorization: "Bearer null",
          "content-type": "application/json",
          origin: "https://atomicmail.io",
          referer: "https://atomicmail.io/",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        },
      }
    );

    console.log(
      "🎉 Account Created:",
      registerRes.data,
      "Password : nTt6PmLHJTuf@Fm",
      "Password Phrase : marriage distance receive couch arch bullet roast loan unknown north shallow bann"
    );
  } catch (err: any) {
    console.error(
      "❌ Account creation failed:",
      err.response?.data || err.message
    );
  }
})();
