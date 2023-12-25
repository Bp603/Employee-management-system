// conect to database By URL
const url =
  "mongodb+srv://bipinpatel2914:zQzjUzXKtQmgFPGs@cluster0.sipsx1g.mongodb.net/EMS?retryWrites=true&w=majority";

const mongoose = require("mongoose");
const { Decimal128 } = mongoose.Schema.Types;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongodb Successfully");
  })
  .catch((error) => {
    console.log(`Not Connected to Mongodb due to this error below \n ${error}`);
  });

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Decimal128, required: true },
  dateofjoin: { type: String, required: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  type: { type: String, required: true },
  currentstatus: { type: Number, required: true },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
