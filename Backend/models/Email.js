import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recruiterMail: { type: String, required: true },
    recruiterName: { type: String, required: true },
    positionName: { type: String, required: true },
    expectativeSalary: { type: String, required: false },
    dollarSalary: { type: Boolean, default: false },
    body: { type: String, required: true },
    sent: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Mail", EmailSchema);