
function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
}

function clearMain(newDiv,className) {

    document.getElementById("Main").innerHTML = "";

    createDiv("", "PadderTop", "", "Main");
    createDiv("", "PadderTop", "", "Main");
    createDiv("", "PadderTop", "", "Main");
    createDiv("", "PadderTop", "", "Main");

    createDiv(newDiv, className, "", "Main");
}

function MakeDate(div,date){
    createDiv("DateBit", "Center", "", div);
    var dateInput = createInput("date", "","date","", "DateBit");
  
    var sendDate = "";
    

    if(date=="" || date==null){
        // console.log(date);
        // var d = new Date();
        // var dd = d.getDate();
        // var mm = d.getMonth() +1;
       
        // if(mm.toString().length==1){
        //     mm="0"+mm;
           
        // }
       
       // var yyyy = d.getFullYear();
      
        document.getElementById("date").valueAsDate = new Date()
        //document.getElementById("date").value = yyyy+"-"+mm+"-"+dd;
        //sendDate= yyyy+"-"+mm+"-"+dd
        
        //.valueAsDate = new Date()
        sendDate = document.getElementById("date").value;
    }
    else{
        document.getElementById("date").value = date;
    }
   //console.log(sendDate);
    return sendDate;
}

function createDiv(id, className, html, attach) {
    var div = document.createElement('div');
    div.id = id;
    div.className = className;
    div.innerHTML = html;
    document.getElementById(attach).appendChild(div);
    return div;
}

function createInput(id, className, type, html, attach) {
    var div = document.createElement('input');
    div.id = id;
    div.type = type;
    div.className = className;
    div.innerHTML = html;
    document.getElementById(attach).appendChild(div);
    return div;
}

function createBut(id, className, html, attach) {
    var div = document.createElement('button');
    div.id = id;
    div.type = "button";
    div.className = className;
    div.innerHTML = html;

    document.getElementById(attach).appendChild(div);
    return div;

}

function addLine (x1, y1, x2, y2,box) {
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');

    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "4");
    
    document.getElementById(box).appendChild(line);
}

async function deleteTours(id,date) {

    var got = "";

    // console.log(Id);
   
    await $.ajax({
        type: "Post",
        url: "/deleteTours",
        data: { 
            "Id" : id,
            "Date" : date
         },
        dataType: "json",
        success: function (data) {
            if (data.data == "Error") {
                console.log("Error in " + something + " return data");
            }
            else {
                got = data.data;
                //return data;
               
            }

        },
        error: function (data) {
            console.log("Error in " + something + " Ajax error");
            console.log(data);
            //return "Error in " + something + " Ajax error";
        }
    });
   
    return got;
}

async function get(something,Id) {

    var got = "";

    // console.log(Id);
   
    await $.ajax({
        type: "Post",
        url: "/get" + something,
        data: { "Id" : Id },
        dataType: "json",
        success: function (data) {
            if (data.data == "Error") {
                console.log("Error in " + something + " return data");
            }
            else {
                got = data.data;
                //return data;
               
            }

        },
        error: function (data) {
            console.log("Error in " + something + " Ajax error");
            console.log(data);
            //return "Error in " + something + " Ajax error";
        }
    });
   
    return got;
}

async function getDaily(date) {

    var got = "";

    

    await $.ajax({
        type: "Post",
        url: "/getDaily",
        data: {
            "date": date, 
        },
        dataType: "json",
        success: function (data) {
            if (data == "Error") {
                console.log("Error in Get Daily return data");
            }
            else {
                got = data.data;
                //return data;

            }

        },
        error: function (data) {
            console.log("Error in Daily Ajax error");
            console.log(data);
            //return "Error in " + something + " Ajax error";
        }
    });

    return got;
}

async function getStats(inOut,startDate, endDate,User) {

    var got = "";

    

    await $.ajax({
        type: "Post",
        url: "/get"+inOut,
        data: {
            "startDate": startDate,
            "endDate": endDate,
            "User":User
        },
        dataType: "json",
        success: function (data) {
            if (data == "Error") {
                console.log("Error in Get "+inOut+" return data");
            }
            else {
                got = data.data;
                //return data;

            }

        },
        error: function (data) {
            console.log("Error in "+inOut+" Ajax error");
            console.log(data);
            //return "Error in " + something + " Ajax error";
        }
    });

    return got;
}

async function store(something, obj) {

    var got = "";

    // console.log(Id);
   
    await $.ajax({
        type: "Post",
        url: "/store" + something,
        data: { "Obj" : obj },
        dataType: "json",
        success: function (data) {
            if (data.data == "Error") {
                console.log("Error in " + something + " return data");
            }
            else {
                got = data.data;
                //return data;
               
            }

        },
        error: function (data) {
            console.log("Error in " + something + " Ajax error");
            console.log(data);
            //return "Error in " + something + " Ajax error";
        }
    });
   
    return got;
}

async function remove(something, obj) {

    var got = "";

    // console.log(Id);
   
    await $.ajax({
        type: "Post",
        url: "/remove" + something,
        data: { "Obj" : obj },
        dataType: "json",
        success: function (data) {
            if (data.data == "Error") {
                console.log("Error in " + something + " return data");
            }
            else {
                got = data.data;
                //return data;
               
            }

        },
        error: function (data) {
            console.log("Error in " + something + " Ajax error");
            console.log(data);
            //return "Error in " + something + " Ajax error";
        }
    });
   
    return got;
}


async function edit(something, Id, obj) {

    var got = "";

     
    await $.ajax({
        type: "Post",
        url: "/edit" + something,
        data: { "Id" : Id,
                "Obj" : obj 
        },
        dataType: "json",
        success: function (data) {
            if (data.data == "Error") {
                got = data.data;
                console.log("Error in " + something + " return data");
            }
            else {
                got = data.data;
                //return data;
               
            }

        },
        error: function (data) {
            console.log("Error in " + something + " Ajax error");
            console.log(data);
            //return "Error in " + something + " Ajax error";
        }
    });
   
    return got;
}






