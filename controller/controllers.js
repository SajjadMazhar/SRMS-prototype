const Result = require("../src/model/student");

const getGrades = (result) =>{
    let allMarks = [result["physics"], result["math"], result["chemistry"]];
    let passStatus = "PASS";
    let totalMarksObtained = 0
    let allGrades = []
    for(mark of allMarks){
        totalMarksObtained+=mark;

        if(mark >= 91 && mark <= 100){
            allGrades.push("A+");
        }else if(mark >= 81 && mark <= 90){
            allGrades.push("A");
        }else if(mark >= 71 && mark <= 80){
            allGrades.push("B+");
        }
        else if(mark >= 61 && mark <= 70){
            allGrades.push("B");
        }
        else if(mark >= 51 && mark <= 60){
            allGrades.push("C+");
        }
        else if(mark >= 41 && mark <= 50){
            allGrades.push("C");
        }
        else if(mark >= 33 && mark <= 40){
            allGrades.push("D");
        }else{
            allGrades.push("F");
            passStatus = "FAIL";
        }
    }
    allGrades.push(totalMarksObtained);
    allGrades.push(passStatus);

    return allGrades;
}

exports.getResult = async (req, res)=>{
    try{
        let rollNumber = req.params.roll;
        let data = await Result.find({roll:rollNumber}).select("name roll dob gender result");
        let result = data[0].result;
        let grades = getGrades(result);

        res.render("index", {
            name:data[0].name, roll:data[0].roll, dob:data[0].dob, gender:data[0].gender,
            pObtained:result.physics, mObtained:result.math, cObtained:result.chemistry, total:grades[3], status:grades[4], pGrade:grades[0], mGrade:grades[1], cGrade:grades[2],});

    }catch(err){
        console.log("error occured: ", err);
        res.status(404).json({status:"fail to load"});
    }
}

exports.testResult = (req, res)=>{
    res.render("index")
}

