const express = require("express");
const userModel = require("./model/UserModel");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.listen(8080, () => {
  console.log("Server is listening at port 8080");
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// data schema
app.post("/createUser", async (req, res) => {
  const data = req.body;
  try {
    const u = new userModel({
      firstname: data.firstname,
      lastname: data.lastname,
      age: data.age,
      dateofjoin: data.dateofjoin,
      title: data.title,
      department: data.department,
      type: data.type,
      currentstatus: data.currentstatus,
    });
    const response = await u.save();
    console.log(response);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const users = await userModel.find({});
    console.log(users);
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

app.get("/filterUsers", async (req, res) => {
  try {
    const { userType } = req.query;
    const users = await userModel.find({ type: userType });
    console.log(users);
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

app.get("/getUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "fetching user error", err });
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ message: "User updated successfully", updatedUser });
  } catch (err) {
    res.status(500).send({ error: "updating user error", err });
  }
});

// app.delete("/deleteUser/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deletedUser = await userModel.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     res.send({ message: "User deleted successfully", deletedUser });
//   } catch (err) {
//     res.status(500).send({ error: "deleting user error", err });
//   }
// });

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (user.currentstatus === 1) {
      return res
        .status(400)
        .send({ message: `YOU CAN’T DELETE EMPLOYEE – STATUS ACTIVE` });
    }

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).send({ error: "Deleting user error", err });
  }
});

app.get("/getUsersRetiringSoon", async (req, res) => {
  try {
    const { userType } = req.query;
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    let usersRetiringSoon;

    userType
      ? (usersRetiringSoon = await userModel.find({
          age: { $gte: 64.5, $lt: 65 },
          type: userType,
          // dateOfJoin: { $lt: sixMonthsFromNow },
        }))
      : (usersRetiringSoon = await userModel.find({
          age: { $gte: 64.5, $lt: 65 },
        }));

    console.log(usersRetiringSoon);
    res.send(usersRetiringSoon);
  } catch (err) {
    res.send(err);
  }
});
