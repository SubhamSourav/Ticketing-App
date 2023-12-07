import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://ec2-52-7-235-243.compute-1.amazonaws.com:27017");
mongoose.Promise = global.Promise;

const ticketSchema = new Schema(
  {
    title: String,
    description: String,
    category: String,
    priority: String,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);

export default Ticket;
