const fs = require("fs");
const path = require("path");
const pupeeteer = require("puppeteer");

module.exports.generateCertificateController = async (req, res) => {
  try {
    const htmlTemplate = fs.readFileSync(
      path.resolve(__dirname, "../certificate.html"),
      "utf-8"
    );

    const {
      registerId,
      email,
      phone,
      addressLine1,
      addressLine2,
      addressLine3,
      name,
      dob,
      gender,
      bloodGroup,
      currentDateTime
    } = req.body;

    const html = htmlTemplate
      .replace("{{title}}", "Certificate")
      .replace("{{registerId}}", registerId)
      .replace("{{email}}", email)
      .replace("{{phone}}", phone)
      .replace("{{addressLine1}}", addressLine1)
      .replace("{{addressLine2}}", addressLine2)
      .replace("{{addressLine3}}", addressLine3)
      .replace("{{name}}", name)
      .replace("{{dob}}", dob)
      .replace("{{gender}}", gender)
      .replace("{{bloodGroup}}", bloodGroup)
      .replace("{{currentDateTime}}", currentDateTime);

    //? Directory for saving pdfs
    const pdfDirectory = path.join(__dirname, "../pdfs");

    //? For resolving the error of directory not present, create a new one
    if (!fs.existsSync(pdfDirectory)) {
      fs.mkdirSync(pdfDirectory, { recursive: true });
    }

    const browser = await pupeeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfPath = path.join(pdfDirectory, `certificate-${Date.now()}.pdf`);
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      width: "297mm",
      height: "170mm",
    });

    await browser.close();

    res.status(200).json({
      success: true,
      message: "PDF Generated Successfully",
      filePath: pdfPath,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
