import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

transporter.verify((error) => {
    if (error) {
        console.error("SMTP configuration error:", error.message)
    } else {
        console.log("SMTP transporter ready")
    }
})

export { transporter }