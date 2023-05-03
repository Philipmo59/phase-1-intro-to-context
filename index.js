function createEmployeeRecord(employeeInformation){
    let employeeObject = {
        firstName: employeeInformation[0],
        familyName: employeeInformation[1],
        title: employeeInformation[2],
        payPerHour: employeeInformation[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeObject
}
function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord)
}
function createTimeInEvent(employeeRecord,dateStamp){
    let updatedDateStamp = dateStamp.split(" ");
    let employeeTimeIn = {
        type: "TimeIn",
        hour: parseInt(updatedDateStamp[1]),
        date: updatedDateStamp[0],
    }
    employeeRecord.timeInEvents.push(employeeTimeIn)
    return employeeRecord
}
function createTimeOutEvent(employeeRecord,dateStamp){
    let updatedDateStamp = dateStamp.split(" ");
    let employeeTimeOut = {
        type: "TimeOut",
        hour: parseInt(updatedDateStamp[1]),
        date: updatedDateStamp[0],
    }
    employeeRecord.timeOutEvents.push(employeeTimeOut)
    return employeeRecord
}    

function hoursWorkedOnDate(employeeRecord,dateOfForm){
    if(dateOfForm == employeeRecord.timeOutEvents[0].date && dateOfForm == employeeRecord.timeInEvents[0].date){
        let totalTimeWorked = (employeeRecord.timeOutEvents[0].hour - employeeRecord.timeInEvents[0].hour)/100
        return totalTimeWorked
    }
}

function wagesEarnedOnDate(employeeRecord,dateOfForm){
    let hoursWorked = hoursWorkedOnDate(employeeRecord,dateOfForm)
    let payPerHour = employeeRecord.payPerHour
    return hoursWorked * payPerHour
}

function allWagesFor(employeeRecord){
    let totalPay = 0
    for(let timeOut of employeeRecord.timeOutEvents){
        for(let timeIn of employeeRecord.timeInEvents){
            if(timeOut.date == timeIn.date){
                totalPay += (timeOut.hour - timeIn.hour) * employeeRecord.payPerHour / 100
            }

        }
    }
    return totalPay
}``
function calculatePayroll(arrayOfEmployeeeRecords){
    let totalPay = 0
    for(let employee of arrayOfEmployeeeRecords){
        console.log(allWagesFor(employee))
        totalPay += allWagesFor(employee)
    }
    console.log(totalPay)
    return totalPay
}




      let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
      let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

      let sTimeData = [
        ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
        ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
      ]

      let rTimeData = [
        ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
        ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
      ]

      sTimeData.forEach(function (d) {
        let [dIn, dOut] = d
        sRecord = createTimeInEvent(sRecord, dIn)
        sRecord = createTimeOutEvent(sRecord, dOut)
      })

      rTimeData.forEach(function (d, i) {
        let [dIn, dOut] = d
        rRecord = createTimeInEvent(rRecord, dIn)
        rRecord = createTimeOutEvent(rRecord, dOut)
      })

      let employees = [sRecord, rRecord]
      let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
      calculatePayroll(employees)