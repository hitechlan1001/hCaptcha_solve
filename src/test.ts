import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const siteKey = process.env.SITE_KEY!;
  const apiKey = process.env.API_KEY!;
  const websiteURL = "https://atomicmail.io/app/auth/sign-up";
  console.log(siteKey)

  // Step 1: Solve reCAPTCHA via 2Captcha
  const createTaskRes = await axios.post("https://api.2captcha.com/createTask", {
    clientKey: apiKey,
    task: {
      type: "RecaptchaV2TaskProxyless",
      websiteURL,
      websiteKey: siteKey,
      isInvisible: false,
    },
  });

  if (createTaskRes.data.errorId !== 0) {
    console.error("❌ Task creation failed:", createTaskRes.data);
    return;
  }

  const taskId = createTaskRes.data.taskId;
  console.log("🛠️ Task created. ID:", taskId);

  let token = "";
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 5000)); // wait 5 sec

    const resultRes = await axios.post("https://api.2captcha.com/getTaskResult", {
      clientKey: apiKey,
      taskId,
    });

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
    console.log("❌ Failed to solve CAPTCHA");
    return;
  }

  console.log("✅ CAPTCHA Solved:", token);

  // Step 2: Create AtomicMail account
  const payload = {
    name: "Auto User",
    password: "55d3ca23807f589ab95c6301b8c67b1916c7c8fa8ad17708fb6f84c4574ce9c2",
    username: "autouser" + Math.floor(Math.random() * 100000),
    encryptedSeedPhrase:
      "3421cde1e9fe56e1673fd51d72dea54c:5faf8563a4e4cf954e7f3140ba08b8ae99184395ccbca45a1fda1a4f50a39c9b73792d945e04040e5a68231c4498ac4874b7d9cb142f74e82a4b44a2327cc14ccb910a9c304f006174f1d3fbf6ae0a39",
    publicKey: "0x0262d44f5b30afd0c7dc66a06a0b7d23d3bb15dd9f68a487e4cbb65da7a5744c03",
    captcha: token,
  };

  try {
    const registerRes = await axios.post("https://api.atomicmail.io/v1/auth/sign-up", payload, {
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
    });

    console.log("🎉 Account Created:", registerRes.data);
  } catch (err: any) {
    console.error("❌ Account creation failed:", err.response?.data || err.message);
  }
})();
