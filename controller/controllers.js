const Result = require("../src/model/student");

const getGrades = (result) =>{
    let resultRows = "";
    let totalMarksObtained = 0
    let passStatus = "PASS";
    let allGrades = []
    for(sub in result){
        let subject = sub.toUpperCase()
        totalMarksObtained+=result[sub];
        if(result[sub] >= 91 && result[sub] <= 100){
            grade = "A+"
        }else if(result[sub] >= 81 && result[sub] <= 90){
            grade = "A";
        }else if(result[sub] >= 71 && result[sub] <= 80){
            grade = "B+"
        }
        else if(result[sub] >= 61 && result[sub] <= 70){
            grade = "B";
        }
        else if(result[sub] >= 51 && result[sub] <= 60){
            grade = "C+";
        }
        else if(result[sub] >= 41 && result[sub] <= 50){
            grade = "C";
        }
        else if(result[sub] >= 33 && result[sub] <= 40){
            grade = "D";
        }else{
            grade = "F";
            passStatus = "FAIL"
            
        }
    let resultString = `
    <tr>
        <td>${subject}</td>
        <td>100</td>
        <td>${result[sub]}</td>
        <td>${grade}</td>
    </tr>
    `;

    resultRows+=resultString;
}
    
    allGrades.push(totalMarksObtained);
    allGrades.push(resultRows);
    allGrades.push(passStatus)
    return allGrades;
}

exports.getResult = async (req, res)=>{
    try{
        let rollNumber = req.params.roll;
        let data = await Result.find({roll:rollNumber}).select("name roll dob gender result");
        let result = data[0].result;
        let grades = getGrades(result);
        let name = data[0].name.toUpperCase()
        
        res.render("index", {name, roll:data[0].roll, dob:data[0].dob, gender:data[0].gender,
                            resultRowData:grades[1], total:grades[0], status:grades[2]})
    }catch(err){
        console.log("error occured: ", err);
        res.status(404).json({status:"Result not found!"});
    }
}

exports.getYourResult = async (req, res)=>{
    try{
        let rollNumber = req.body.rollNumber;
        let data = await Result.find({roll:rollNumber}).select("name roll dob gender result");
        let result = data[0].result;
        let grades = getGrades(result);
        let name = data[0].name.toUpperCase()
        
        res.render("index", {name, roll:data[0].roll, dob:data[0].dob, gender:data[0].gender,
                            resultRowData:grades[1], total:grades[0], status:grades[2]})
    }catch(err){
        console.log("error occured: ", err);
        res.status(404).json({status:"Result not found!"});
    }

}

exports.postResult = async (req, res)=>{
    try{
        let resultData = await Result(req.body);
        res.json({status:"result uploaded"});

    }catch(err){
        console.log("error occured", err);
        res.status(400).json({status:"fail to load"});
    }
}

exports.testResult = (req, res)=>{
    res.render("login");
}
