const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// router.post("/add", async (req, res) => {
//   try {
//     const name = req.body.name;
//     const age = Number(req.body.age);
//     const gender = req.body.gender;

//     const newStudent = new Student({
//       name,
//       age,
//       gender,
//     });
//     await newStudent.save();
//     res.json({ message: "Student added successfully" });
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/add",async(req,res)=>{

    console.log(req.body);
  
    const {name,age,gender}=req.body;
    const testsome=10;
    const new_student={name,age,gender};
    await new Student(new_student).save().then(()=>{
      res.status(200).send({message:"New Student added successfully",testsome});
    }).catch((err)=>{
        console.error(err);
    });

})

// router.get("/", async (req, res) => {
//   try {
//     const students = await Student.find();
//     console.log("00000"+students);
//     res.status(200).json(students);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get("/", async (req, res) => {
  
      await Student.find().then((students)=>{
      res.status(200).json(students);
      }).catch((err)=>{
      console.log(err);
      res.status(500).send({message:"Somthing went wrong !"});

    });  
});

router.put("/update/:id", async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  const { name, age, gender } = req.body;
  const updateStudent = { name, age, gender };


  await Student.findByIdAndUpdate(userId, updateStudent, { new: true })
    .then((result) => {
     
      res.status(200).send({ status: "User Updated", user: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });

});

router.delete("/delete/:id", async (req, res) => {
  let userId = req.params.id;
  await Student.findByIdAndDelete(userId).then(() => { 
      res.json({ status: "Delete Successfull" }) 
      
  });
});

router.get("/get/:id", async (req, res) => { 
  let userId = req.params.id;

  await Student.findById(userId)
    .then((student_det) => {
      res.status(200).send({ status: "User Details", student_det: student_det }); 
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
      .send({ status: "User Not Found" });    
    }); 
});

module.exports = router;  
