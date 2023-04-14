

var User="";

var fadeTime = 100;
var slideTime= 50;

window.onload = function () {
    $.ajax({
        type: "Get",
        url: "/getSession",
        // data: { 
        //     'email': email,
        //     'password': password,
        // },
        dataType: "json",
        success: function (data) {
            if (data == "Error") {
                console.log("Error in getSession return data");
            }
            else {
              
                User =data.data;
                load();
            }

        },
        error: function (data) {
            console.log("Error in getSession Ajax error");
            console.log(data);
        }
    });
}

function Logout(){
    $.ajax({
        type: "Get",
        url: "/Logout",
        // data: { 
        //     'email': email,
        //     'password': password,
        // },
        dataType: "json",
        success: function (data) {
            if (data == "Error") {
                console.log("Error in Logout return data");
            }
            else {
                console.log("Here")
                window.location.href = "/";
            }

        },
        error: function (data) {
            console.log("Error in Logout Ajax error");
            console.log(data);
        }
    });
}


function clearCheckinTimed() {
    TourTypesPage();
}
function clearBuilderTimed() {
    //clearMain("HomePage", "FaderIn");
    BuildButtons();

}
function clearStatsTimed() {
    //clearMain("HomePage", "FaderIn");
    makeStatsPage();
}

function clearDailyTimed() {
    //clearMain("HomePage", "FaderIn");
    makeDailyPage();
}

function clearTicketsTimed(){
    makeTixPage();
}

function load() {

   
    document.getElementById("Main").style = "pointer-events:all;"
    document.getElementById("uName").innerHTML=User.Name
    document.getElementById("HomeBut").onclick = function(){
        load();
    }
    document.getElementById("uName").onclick = function(){
        EditUser();
    }
    document.getElementById("LogOut").onclick = function(){
       Logout();
    }
    clearMain("HomePage", "FaderIn");
    
    createDiv("HomeButs1", "CenterSpace", "", "HomePage");

    createDiv("", "PadderTop", "", "HomePage");
    createDiv("", "PadderTop", "", "HomePage");

    createDiv("HomeButs2", "CenterSpace", "", "HomePage");

    // var checkinBut = createDiv("checkinBut", "MainBut", "", "HomeButs1");
    // checkinBut.onclick = function () {
       
    //     setTimeout(function () {
    //         document.getElementById("HomePage").className = "sliderLeft";
    //         setTimeout(clearCheckinTimed, fadeTime);
    //     }, slideTime);
       
    // }
    // createDiv("", "Heading", "Check In", "checkinBut");
    // createDiv("centerCheckPic", "Center", "", "checkinBut");
    // createDiv("", "CheckIn", "", "centerCheckPic");

    if(User.Role=="Admin"){
        var dailyBut = createDiv("DailyBut", "MainBut", "", "HomeButs1");
        dailyBut.onclick = function () {
            setTimeout(function () {
                document.getElementById("HomePage").className = "sliderLeft";
                setTimeout(clearDailyTimed, fadeTime);
            }, slideTime);
        }
        createDiv("", "Heading", "Daily", "DailyBut");
        createDiv("centerDailyPic", "Center", "", "DailyBut");
        createDiv("", "Daily", "", "centerDailyPic");

        var makeThingsBut = createDiv("makeThingsBut", "MainBut", "", "HomeButs1");
        makeThingsBut.onclick = function () {
        setTimeout(function () {
                document.getElementById("HomePage").className = "sliderRight";
                setTimeout(clearBuilderTimed, fadeTime);
            }, slideTime);
        }
        createDiv("", "Heading", "Make Things", "makeThingsBut");
        createDiv("centerMakePic", "Center", "", "makeThingsBut");
        createDiv("", "Builder", "", "centerMakePic");
    }
  
    
    

    

    var statsBut = createDiv("statsBut", "MainBut", "", "HomeButs2");
    statsBut.onclick = function () {
        setTimeout(function () {
            document.getElementById("HomePage").className = "sliderLeft";
            setTimeout(clearStatsTimed, fadeTime);
        }, slideTime);
    }
    createDiv("", "Heading", "Stats", "statsBut");
    createDiv("centerStatsPic", "Center", "", "statsBut");
    createDiv("", "StatsIcon", "", "centerStatsPic");
    
    var ticketBut = createDiv("ticketBut", "MainBut", "", "HomeButs2");
    ticketBut.onclick = function () {
        setTimeout(function () {
            document.getElementById("HomePage").className = "sliderLeft";
            setTimeout(clearTicketsTimed, fadeTime);
        }, slideTime);
    }
    createDiv("", "Heading", "Tickets", "ticketBut");
    createDiv("centerTicketPic", "Center", "", "ticketBut");
    createDiv("", "Tickets", "", "centerTicketPic");
}

async function makeTixPage(day){

    clearMain("TixPage", "");
    
    createDiv("", "Heading", "Tickets", "TixPage");

    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    MakeDate("TixPage",day);

    var date = document.getElementById("date").value;
    var dateInput = document.getElementById("date");
    dateInput.onchange = function(){
        var da = document.getElementById("date").value;
        makeTixPage(da)
    }
    var tixSales = await get("TicketSales",date);
    
    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    createDiv("editButBit", "Center", "", "TixPage");
    var editTixBut = createBut("editTixBut", "", "Edit Ticket Price", "editButBit");
    editTixBut.onclick = function(){
        editTixPopUp();
    }

    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    createDiv("tixSalesInfo", "Center", "", "TixPage");
    createDiv("lable", "", "Ticket Sales: ", "tixSalesInfo");
    createDiv("tixSalesFigure", "", tixSales, "tixSalesInfo");

    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    createDiv("SellTixButBut", "Center", "", "TixPage");
    var sellTix = createBut("editTixBut", "BigBut", "Sell Ticket", "SellTixButBut");
    sellTix.onclick = async function(){
       var d =document.getElementById("date").value;
        var t = {
            Date:d,
            Number:1
        }

        var result = await store("TicketSales",t);
        if(result =="Success"){
            makeTixPage(d);
        }
    }

    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    createDiv("", "PadderTop", "", "TixPage");
    createDiv("", "PadderTop", "", "TixPage");

    createDiv("MistakeButBit", "Center", "", "TixPage");
    var mistakeTix = createBut("editTixBut", "", "Fix Mistaken sales", "MistakeButBit");
    mistakeTix.onclick = async function(){
       
        var num = parseInt(document.getElementById("tixSalesFigure").innerHTML);
        var d =document.getElementById("date").value;
        var t = {
            Date:d,
            Number:-1
        }

        if(num>0){
            var result = await store("TicketSales",t);
            if(result =="Success"){
                makeTixPage(d);
            }
        }
        
    }
}

async function editTixPopUp(){
    

    var tix = await get("Ticket");

    console.log(tix)
    document.getElementById("Main").style = "pointer-events:none;"

    createDiv("popup","PopUp","","Main");

    document.getElementById("popup").style = "pointer-events:all;"

    
    createDiv("", "PadderTop", "", "popup");

    createDiv("","Normal","Ticket Price","popup");

    createDiv("", "PadderTop", "", "popup");

    createDiv("centerInputDiv","Center","","popup");
    var Input = createInput("Input","","number","","centerInputDiv");
    if(tix!=null){
        Input.value=parseFloat(tix.Price);
    }

    createDiv("", "PadderTop", "", "popup");
    
    createDiv("centerButDiv","Center","","popup");
    var edit = createBut("","Center","Change","centerButDiv");
    edit.onclick = async function(){
        var t = {
            Price:Input.value,
        }
        var result = await store("Ticket",t);
       
        if(result == "Success"){
            document.getElementById("Main").style = "pointer-events:all;"
            makeTixPage();
        }
    }
    createDiv("", "PadderTop", "", "popup");
    createDiv("", "PadderTop", "", "popup");
   


}

async function EditUser(){

    clearMain("EditUserPage", "FaderIn");

    var user = await get("User",User.Id);
    console.log(user)
    createDiv("centerGuide", "Center", "", "EditUserPage");

    createDiv("Lables", "Vertical", "", "centerGuide");
    createDiv("", "PadderLeft", "", "centerGuide");
    createDiv("Inputs", "Vertical", "", "centerGuide");

    createDiv("", "TextHeight", "Full Name:", "Lables");
    var fullName = createInput("FullName", "", "text","","Inputs");
    fullName.value=user.FullName;
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "Email:", "Lables");
    var email=  createInput("Email", "", "text", "","Inputs");
    email.value=user.Email;
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "User Name:", "Lables");
    var userName = createInput("UserName", "", "text", "","Inputs");
    userName.value=user.UserName;
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "Old Password:", "Lables");
    var oldPassword = createInput("OldPassword", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "Password:", "Lables");
    var password = createInput("Password", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "Retype Password:", "Lables");
    var retypePassword = createInput("retypePassword", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");


    createDiv("", "TextHeight", "Colour:", "Lables");
    var colourInput = createInput("ColourInput", "", "color", "","Inputs");
    colourInput.value=user.Colour.substring(0,user.Colour.length - 2);
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "PadderTop", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "TextHeight", "Opacity:", "Lables");
    var opacity = createInput("OpacityInput", "", "number", "","Inputs");
    opacity.value=user.Colour.substring(user.Colour.length - 2);
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");
  
    document.getElementById("OpacityInput").value =60;
    document.getElementById("OpacityInput").setAttribute('max','99');
    document.getElementById("OpacityInput").setAttribute('min','1');

    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "TextHeight", "Colour Output:", "Lables");
    
    createDiv("ColourOutput","","","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    document.getElementById("ColourOutput").style = "width:60px; height: 25px;background-color:"+user.Colour
   

    createDiv("", "PadderTop", "", "EditUserPage");
    createDiv("", "PadderTop", "", "EditUserPage");
    
    

    document.getElementById("OpacityInput").onchange = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
      
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };
    document.getElementById("ColourInput").oninput = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
    
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };
    createDiv("", "PadderTop", "", "EditUserPage");
    createDiv("", "PadderTop", "", "EditUserPage");

    createDiv("Errors", "", "", "EditUserPage");

    createDiv("", "PadderTop", "", "EditUserPage");
    createDiv("", "PadderTop", "", "EditUserPage");
    createDiv("butBit", "Center", "", "EditUserPage");
  
    var registerBut = createBut("","","Edit Info","butBit");
    registerBut.onclick = async function(){

        // var fullName = document.getElementById("FullName").value;
        // var password = document.getElementById("Password").value;
        // var retypePassword = document.getElementById("retypePassword").value;
        // var email = document.getElementById("Email").value;
        // var opacity = document.getElementById("OpacityInput").value;
        // var userName = document.getElementById("UserName").value;
         var colour = document.getElementById("ColourInput").value +opacity.value;
    
                                              
        

        if(password.toString() == retypePassword.toString()){
          
            const guide = {
                FullName:FullName.value,
                UserName:userName.value,
                Email:email.value,
                OldPassword:oldPassword.value,
                Password:password.value,
                Colour:colour,
            }

            if(fullName==""){
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="No Full Name";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
               
            }
            else if(email==""){
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="No Email";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            else if(userName==""){
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="No User Name";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            else if(password==""){
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="No Password";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            else{
               
                var reg = await edit("Guide",User.Id,guide);
                
                if(reg=="Error"){
                    var err = document.getElementById("Errors");
                    err.className="Error";
                    err.innerHTML="";
                    err.innerHTML=reg;
                    setTimeout(function () {
                        err.className="ErrorDone";
                    }, 1000);
                }
                else{
                    var err = document.getElementById("Errors");
                    err.className="Success";
                    err.innerHTML="Edit Successfull!";
                    setTimeout(function () {
                        err.className="SuccessDone";

                        window.location.href = "/logoutFromUserEdit";
                    }, 1000);


                }
            }
        }
        else{
            var err = document.getElementById("Errors");
            err.className="Error";
            err.innerHTML="";
            err.innerHTML="Passwords do not match";
            setTimeout(function () {
                err.className="ErrorDone";
            }, 1000);
        }
    }
        

}

async function makeDailyPage(date){

    clearMain("DailyPage", "FaderIn");

   
    createDiv("", "Heading", "Daily Page", "DailyPage");

    createDiv("", "PadderTop", "", "DailyPage");
    createDiv("", "PadderTop", "", "DailyPage");

    var d = MakeDate("DailyPage",date);

    createDiv("", "PadderTop", "", "DailyPage");
    createDiv("", "PadderTop", "", "DailyPage");


    createDiv("fineTuneButDiv", "Center", "", "DailyPage");
    var fineTuneBut = createBut("fineTuneBut", "UnPressed", "Fine Tune", "fineTuneButDiv");
    fineTuneBut.onclick = function(){
        if( fineTuneBut.className == "UnPressed"){
            fineTuneBut.className = "Pressed";
        }
        else{
            fineTuneBut.className = "UnPressed";
        }
       
    }

   
    var dateShown = document.getElementById("date");
    dateShown.onchange = function(){
        makeDailyPage(dateShown.value)
    }

    var dailies = await getDaily(date);
   //console.log(dailies);
    
  

    createDiv("", "PadderTop", "", "DailyPage");
    createDiv("", "PadderTop", "", "DailyPage");

    for(let i=0;i<dailies.length;i++){
        
        createDiv("CenterTour"+i, "Center", "", "DailyPage");
       

        createDiv("CenterGuests"+i, "TourBox", "", "CenterTour"+i);
        createDiv("Guests"+i, "", "", "CenterGuests"+i);
        document.getElementById("Guests"+i).style = 'background-color: '+dailies[i].Colour+';'
        
        var guestsBut = createDiv("GuestsName"+i, "", "Guests", "Guests"+i);
        guestsBut.onclick = function(){
            addGuestToDailyPopUp(dailies[i].tourTypeId,i,dailies[i]);
        }

        for(let g = 0;g<dailies[i].Guests.length;g++){
           
           var guestBut = createDiv("GuestsName"+i+dailies[i].Guests[g].Name, "Normal", dailies[i].Guests[g].Name +" "+ dailies[i].Guests[g].Number, "CenterGuests"+i);
           guestBut.onclick = function(){

                const boldos = document.getElementsByClassName("Bold");
                
                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }
               
            

                if(document.getElementById("GuestsName"+i+dailies[i].Guests[g].Name).className!="Bold"){
                    
                    document.getElementById("GuestsName"+i+dailies[i].Guests[g].Name).className="Bold";


                    const collection = document.getElementsByClassName("Bold");
                        const otherTourBolds=[];

                        for (let q = 0; q < collection.length; q++) {
                            
                            if(collection[q].id.substring(0,21) != "BookingPlatformsName"+i && 
                            collection[q].id!="GuestsName"+i+dailies[i].Guests[g].Name &&
                            collection[q].id.substring(0,10) != "GuideName"+i){
                            
                                otherTourBolds.push(collection[q]);
                            }
                        
                        }

                        otherTourBolds.forEach(o => {
                            o.className="Normal";
                        });

                        const numInputs = document.getElementsByClassName("Number");
                        for(var n = 0;n<numInputs.length;n++){
                            
                            numInputs[n].remove();
                        }
                        putAddButton(i,dailies[i]);
                        
                }
                else{
                    document.getElementById("GuestsName"+i+dailies[i].Guests[g].Name).className="Normal";
                    const boldos = document.getElementsByClassName("Bold");
                
                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }
                }

                if(document.getElementById("fineTuneBut").className=="Pressed"){
                    fineTune("Guest",dailies[i].Guests[g].Id,dailies[i].tourTypeId)
                }
            
            }
            document.getElementById("GuestsName"+i+dailies[i].Guests[g].Name).style = 'background-color:'+dailies[i].Guests[g].Colour+';'
            
        }

        createDiv("GuestLineBox"+i,"LineBox","","CenterTour"+i);

        var day = createDiv("Daily"+i, "TourBox", "", "CenterTour"+i);
        
        day.onclick = function(){
           
            // document.getElementById("Daily"+i).onclick = function(){
            
            // }
            // var d = document.getElementById("date").value;
            // //dayClick(i,d,dailies[i]);
            
          
        }
       
                                                                        //+" "+dailies[i].Pax
        var tourTypeDiv = createDiv(dailies[i].tourType+i, "", dailies[i].tourType , "Daily"+i);
        tourTypeDiv.style = 'background-color: '+dailies[i].Colour+';'
        tourTypeDiv.onclick = function(){
            addGuideToDailyPopUp(i,dailies[i])
        }
        createDiv("GuideBit"+i, "Vertical", "", "Daily"+i);
       
        createDiv("inputBit"+i, "Vertical", "", "Daily"+i);
        document.getElementById("inputBit"+i).style = 'background-color: '+dailies[i].Colour+';'

        for(let x=0;x<dailies[i].Guides.length;x++){
            var guideBut = createDiv("GuideName"+i+dailies[i].Guides[x].Name, "Normal", dailies[i].Guides[x].Name +" "+dailies[i].Guides[x].Number, "GuideBit"+i);
            guideBut.style = 'background-color: '+dailies[i].Guides[x].Colour+';'
            guideBut.onclick = function(){

                const boldos = document.getElementsByClassName("Bold");
                
                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }
                   
                

                if(document.getElementById("GuideName"+i+dailies[i].Guides[x].Name).className!="Bold"){
                    
                    document.getElementById("GuideName"+i+dailies[i].Guides[x].Name).className="Bold";
    
    
                    const collection = document.getElementsByClassName("Bold");

                    
                        const otherTourBolds=[];
                        for (let q = 0; q < collection.length; q++) {
                          
                            if(collection[q].id != "GuideName"+i+dailies[i].Guides[x].Name && 
                            collection[q].id.substring(0,11) != "GuestsName"+i &&
                            collection[q].id.substring(0,21) != "BookingPlatformsName"+i &&
                            collection[q].id.substring(0,11) != "GuideName"+i){
                           
                                otherTourBolds.push(collection[q]);
                            }
                            // else if( collection[q].id != "GuideName"+i+dailies[i].Guides[x].Name){
                            //     otherTourBolds.push(collection[q]);
                            // }
                           
                        }
    
                        otherTourBolds.forEach(o => {
                            o.className="Normal";
                        });

                        const numInputs = document.getElementsByClassName("Number");
                        for(var n = 0;n<numInputs.length;n++){
                            
                            numInputs[n].remove();
                        }
                        putAddButton(i,dailies[i]);
                }
                else{
                    document.getElementById("GuideName"+i+dailies[i].Guides[x].Name).className="Normal";
                    const boldos = document.getElementsByClassName("Bold");
            
                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }
                }

                if(document.getElementById("fineTuneBut").className=="Pressed"){
                    fineTune("Guide",dailies[i].Guides[x].Id,dailies[i].tourTypeId)
                }
                
               }
        }

        
        createDiv("GuestLineBox"+i,"LineBox","","CenterTour"+i);

        createDiv("CenterBookingPlatforms"+i, "TourBox", "", "CenterTour"+i);
        createDiv("BookingPlatforms"+i, "", "", "CenterBookingPlatforms"+i);
        document.getElementById("BookingPlatforms"+i).style = 'background-color: '+dailies[i].Colour+';'
        
        var bookiDiv = createDiv("BookingPlatformsName"+i, "", "Platforms", "BookingPlatforms"+i);
        bookiDiv.onclick = function(){
            addBookiToDailyPopUp(dailies[i].tourTypeId,i,dailies[i]);
        }
      
        for(let b = 0;b<dailies[i].BookingPlatforms.length;b++){

            var bookBut = createDiv("BookingPlatformsName"+i+dailies[i].BookingPlatforms[b].Name, "Normal", dailies[i].BookingPlatforms[b].Name+" "+ dailies[i].BookingPlatforms[b].Number, "CenterBookingPlatforms"+i);
            bookBut.onclick = function(){

                const boldos = document.getElementsByClassName("Bold");
               
                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }
                   
                
                
                if(document.getElementById("BookingPlatformsName"+i+dailies[i].BookingPlatforms[b].Name).className!="Bold"){
                   
                    document.getElementById("BookingPlatformsName"+i+dailies[i].BookingPlatforms[b].Name).className="Bold";
                   
                    //const otherTourBolds = document.getElementsByClassName("Bold");
                    const collection = document.getElementsByClassName("Bold");
                    const otherTourBolds=[];
                    for (let q = 0; q < collection.length; q++) {
                       
                        if(collection[q].id.substring(0,11) != "GuestsName"+i && 
                        collection[q].id!="BookingPlatformsName"+i+dailies[i].BookingPlatforms[b].Name &&
                        collection[q].id.substring(0,10) != "GuideName"+i){
                            otherTourBolds.push(collection[q]);
                        }
                       
                    }

                    otherTourBolds.forEach(o => {
                        o.className="Normal";
                    });

                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }


                    putAddButton(i,dailies[i]);
                    
                }
                else{
                    document.getElementById("BookingPlatformsName"+i+dailies[i].BookingPlatforms[b].Name).className="Normal";
                    const boldos = document.getElementsByClassName("Bold");
            
                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }
                }

                if(document.getElementById("fineTuneBut").className=="Pressed"){
                    fineTune("BookingPlatform",dailies[i].BookingPlatforms[b].Id,dailies[i].tourTypeId);
                }

                
                
            }

            document.getElementById("BookingPlatformsName"+i+dailies[i].BookingPlatforms[b].Name).style = 'background-color: '+dailies[i].BookingPlatforms[b].Colour+';'
            
        
        }

        console.log(dailies[i].GuideSales)
        for(let gs = 0;gs<dailies[i].GuideSales.length;gs++){

           var gsBut = createDiv("GuideSale"+i+dailies[i].GuideSales[gs].Guide+dailies[i].GuideSales[gs].Guest, "Normal", dailies[i].GuideSales[gs].Guide +" "+ dailies[i].GuideSales[gs].Guest +" "+ dailies[i].GuideSales[gs].Number, "CenterBookingPlatforms"+i);

           gsBut.onclick = function(){

            if(document.getElementById("fineTuneBut").className=="Pressed"){
                fineTune("GuideSale",dailies[i].GuideSales[gs].Id,dailies[i].tourTypeId);
            }

            
            
        }
            document.getElementById("GuideSale"+i+dailies[i].GuideSales[gs].Guide+dailies[i].GuideSales[gs].Guest).style = 'background-color: '+dailies[i].Colour+';'
        
        }

       
        
        createDiv("", "PadderTop", "",  "Daily"+i);
        createDiv("", "PadderTop", "",  "Daily"+i);

       
       
        createDiv("", "PadderTop", "", "DailyPage");
        createDiv("", "PadderTop", "", "DailyPage");
        createDiv("", "PadderTop", "", "DailyPage");
    }
    
}

async function putAddButton(i,daily,guideSaleGuideId){
    
    const collection = document.getElementsByClassName("Bold");
   
    
    if(collection.length==3){
                        
        createInput("input"+i,"Number","number","","inputBit"+i)
        var sendBut = createBut("inputBut"+i, "Number", "Add", "inputBit"+i);
        sendBut.onclick= async function(){
            var boldies = document.getElementsByClassName("Bold");
            var bookId="";
            var guideId="";
            var guestId="";
           
            var num = document.getElementById("input"+i).value;
            for(var b =0;b<boldies.length;b++){
             
              

                if(boldies[b].id.toString().substring(boldies[b].id.length-10)==i+"GuideSale"){
                    bookId ="GuideSale";

                    guides.forEach(guide => {
                        var index = boldies[b].innerHTML.toString().lastIndexOf(" ");
                        
                        if(boldies[b].innerHTML.toString().substring(index+1) == guide.Name){
                            guideSaleGuideId = guide.Id;
                           
                        }
                    });
                }
                
                daily.BookingPlatforms.forEach(booki => {
                    var index = boldies[b].innerHTML.toString().indexOf(" ");
                    if(booki.Name==boldies[b].innerHTML.substring(0,index)){
                        bookId = booki.Id;
                    }
                });
                
                if(daily.BookingPlatforms.length==0 ||bookId==""){

                    var books = await get("BookingPlatforms",daily.tourTypeId);
                    books.forEach(book => {
                       
                        if(book.Name == boldies[b].innerHTML.toString()){
                         
                            bookId = book._id;
                          
                        }
                    });
                }
                
              
                daily.Guides.forEach(guide => {
                    var index = boldies[b].innerHTML.toString().indexOf(" ");
                    if(guide.Name==boldies[b].innerHTML.substring(0,index)){
                        guideId = guide.Id;
                        if(guideSaleGuideId==null){
                            guideSaleGuideId = guide.Id;
                        }
                    }
                    
                });

                if(daily.Guides.length==0 || guideId==""){
        
                    var guides = await get("Guides");
                   
                    guides.forEach(guide => {
                        if(guide.Name==boldies[b].innerHTML.toString()){
                            guideId = guide.Id;
                            
                        }
                    });
                }

                daily.Guests.forEach(guest => {
                    var index = boldies[b].innerHTML.toString().indexOf(" ");
                    if(guest.Name==boldies[b].innerHTML.substring(0,index)){
                        guestId = guest.Id;
                    }
                });

                // if(guideSaleGuideId==null){
                //     //var guides = await get("Guides");
                //     var index = boldies[b].innerHTML.toString().indexOf("Guide Sale");
                //     console.log(boldies[b].innerHTML.toString().substring(index))
                //     // guides.forEach(guide => {
                //     //     var index = boldies[b].innerHTML.toString().indexOf("Guide Sale");
                //     //     console.log(boldies[b].innerHTML.toString().substring(index))
                //     //     if(boldies[b].innerHTML.toString().substring(index) == guide.Name){
                //     //         guideSaleGuideId = guide.Id;
                           
                //     //     }
                //     // });
                // }

                if(daily.Guests.length==0 || guestId==""){
                    
                    var guests = await get("Guests",daily.tourTypeId);
                    guests.forEach(guest => {
                        if(guest.Name==boldies[b].innerHTML.toString()){
                            guestId = guest._id;
                        }
                    });
                }
                
                
                
                
            
            };
            var date = document.getElementById("date").value;
            var tourDate = new Date(date);

            var tours =[];
            var guideSales =[];

            if(bookId!="" && guestId!="" && guideId!=""){
                var t = Tour(daily.tourTypeId,
                    bookId,
                    guestId,
                    guideId,
                    num,
                    tourDate
                    );
                tours.push(t);
            }
            else{
                console.log("bookId = "+bookId +" guestId = "+guestId+ " guideId = "+guideId)
            }
            
               
            if(bookId=="GuideSale"){
                if(bookId!="" && guestId!="" && guideId!=""){
                    if(guideSaleGuideId!=null){
                        var guideSale = GuideSale(daily.tourTypeId,
                            guideSaleGuideId,
                            guestId,
                            num,
                            tourDate
                        );
        
                        guideSales.push(guideSale);
                    }
                }
                
               
            }
            
           
            
            if(guideSales.length>0){
                await store("GuideSales", guideSales);
            }
            
            await store("Tours", tours);
            makeDailyPage(date);
        }

        createDiv("", "PadderTop", "", "inputBit"+i);
        createDiv("", "PadderTop", "", "inputBit"+i);
    }

    
}

async function  addGuideToDailyPopUp(i,daily){
   
   
    document.getElementById("Main").style = "pointer-events:none;"

    createDiv("popup","PopUp","","Main");

    document.getElementById("popup").style = "pointer-events:all;"

    var guides = await get("Guides");
    // var count =0;
    guides.forEach(g => {

        var existingGuides = document.getElementById("GuideBit"+i).childNodes;
        var exists = false;
        
        existingGuides.forEach(child => {
           
            if(child.id == "GuideName"+i+g.Name){
                exists=true;
            }
            
        });

       
       
        if(exists == false){
           // count++;
            var guideBut = createBut(g.Name+"PopUp","PopBlock",g.Name,"popup");
            guideBut.style = 'background-color: '+g.Colour+';'
            guideBut.onclick = function(){
    
                document.getElementById("Main").style = "pointer-events:all;"
                const pops = document.getElementById("popup");
                pops.remove();

               

                const collection = document.getElementsByClassName("Bold");
                    const otherTourBolds=[];
                    for (let q = 0; q < collection.length; q++) {
                       
                        
                        if(collection[q].id.substring(0,11) != "GuestsName"+i && 
                            collection[q].id.substring(0,21) != "BookingPlatformsName"+i &&
                            collection[q].id.substring(0,10) != "GuideName"+i+g.Name){
                            otherTourBolds.push(collection[q]);
                        }
                       
                    }

                    otherTourBolds.forEach(o => {
                        o.className="Normal";
                    });

                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }
                    
                    var but = createDiv("GuideName"+i+g.Name, "Bold", g.Name, "GuideBit"+i);

                    but.style = 'background-color: '+g.Colour+';'
                    but.onclick = function(){
                        const b = document.getElementById("GuideName"+i+g.Name);
                        b.remove();
                    
                    }
                putAddButton(i,daily.tourTypeId);
            }
        }

        
       
    });

    var editTourNumbersBut = createBut("editTourNumbersBut"+i, "PopBlock", "Clear Tour", "popup");
    editTourNumbersBut.onclick = async function(){
        
        document.getElementById("Main").style = "pointer-events:all;"
        const pops = document.getElementById("popup");
        pops.remove();
        
        var date = document.getElementById("date").value;

        var result = await deleteTours(daily.tourTypeId,date);
        
        if(result=="Success"){
            document.getElementById("Main").style = "pointer-events:all;"
            makeDailyPage(date);
        }
        else{
            
        }
        //dayClick(i,date,daily);

    }

    // var noShowBut = createBut("noShowBut"+i, "PopBlock", "Fine Tune", "popup");
    // noShowBut.onclick = function(){
        
    //     document.getElementById("popup").innerHTML=""; 
    //     var count =0;
    //         guides.forEach(b => {
    //            if(document.getElementById("GuideName"+i+b.Name)!=null){
    //             count++
    //                 var gBut = createBut(b.Name+"PopUp","PopBlock",b.Name,"popup");
    //                 gBut.style = 'background-color: '+b.Colour+';'
    //                 gBut.onclick = async function(){
                        
    //                     fineTune("Guide",b.Id,daily.tourTypeId)
    //                 }
    //            }
              
    //         });

    //         if(count==0){
    //             document.getElementById("Main").style = "pointer-events:all;"
    //             const pops = document.getElementById("popup");
    //             pops.remove();
    //         }

    // }

    var cancelBut = createBut("Cancel"+i, "PopBlock", "Cancel", "popup");
    cancelBut.onclick = function(){
        document.getElementById("Main").style = "pointer-events:all;"
        const pops = document.getElementById("popup");
        pops.remove();
    }
  
}

async function  addGuestToDailyPopUp(tourtypeId,i,daily){
    
    document.getElementById("Main").style = "pointer-events:none;"

    createDiv("popup","PopUp","","Main");

    document.getElementById("popup").style = "pointer-events:all;"

    var guests = await get("Guests",tourtypeId);
    var count =0;
    guests.forEach(g => {

        var existingGuests = document.getElementById("CenterGuests"+i).childNodes;
        var exists = false;
        
        existingGuests.forEach(child => {
           
            if(child.id== "GuestsName"+i+g.Name){
                exists=true;
            }
            
        });

       
       
        if(exists == false){
            count++;
            var bookiBut = createBut(g.Name+"PopUp","PopBlock",g.Name,"popup");
            bookiBut.style = 'background-color: '+g.Colour+';'
            bookiBut.onclick = function(){
    
                document.getElementById("Main").style = "pointer-events:all;"
                const pops = document.getElementById("popup");
                pops.remove();

               

                const collection = document.getElementsByClassName("Bold");
                    const otherTourBolds=[];
                    for (let q = 0; q < collection.length; q++) {
                       
                        if(collection[q].id.substring(0,11) != "GuestsName" + i + g.Name && 
                            collection[q].id.substring(0,21) != "BookingPlatformsName"+i &&
                            collection[q].id.substring(0,10) != "GuideName"+i){
                            otherTourBolds.push(collection[q]);
                        }
                       
                    }

                    otherTourBolds.forEach(o => {
                        o.className="Normal";
                    });

                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }


                    var but = createDiv("GuestsName"+i+g.Name, "Bold", g.Name, "CenterGuests"+i);
                    but.style = 'background-color: '+g.Colour+';'
                    but.onclick = function(){
                        const b = document.getElementById("GuestsName"+i+g.Name);
                        b.remove();
                    
                    }

                putAddButton(i,daily);
            }
        }

        
       
    });

    var cancelBut = createBut("Cancel"+i, "PopBlock", "Cancel", "popup");
    cancelBut.onclick = function(){
        document.getElementById("Main").style = "pointer-events:all;"
        const pops = document.getElementById("popup");
        pops.remove();
    }

    if(count==0){
        document.getElementById("Main").style = "pointer-events:all;"
            const pops = document.getElementById("popup");
            pops.remove();
    }

   
}

async function  addBookiToDailyPopUp(tourtypeId,i,daily){
    
    document.getElementById("Main").style = "pointer-events:none;"

    createDiv("popup","PopUp","","Main");

    document.getElementById("popup").style = "pointer-events:all;"

    var bookiPlats = await get("BookingPlatforms",tourtypeId);
    var count =0;

    bookiPlats.forEach(b => {

        var existingBooki = document.getElementById("CenterBookingPlatforms"+i).childNodes;
        var exists = false;
        

        existingBooki.forEach(child => {
          
            if(child.id== "BookingPlatformsName"+i+b.Name){
                exists=true;
            }
            
        });

        if(exists==false){
            count++;
            var bookiBut = createBut(b.Name+"PopUp","PopBlock",b.Name,"popup");
            bookiBut.style = 'background-color: '+b.Colour+';'
            bookiBut.onclick = function(){
    
                document.getElementById("Main").style = "pointer-events:all;"
                const pops = document.getElementById("popup");
                pops.remove();

                const collection = document.getElementsByClassName("Bold");
                    const otherTourBolds=[];
                    for (let q = 0; q < collection.length; q++) {
                       
                        if(collection[q].id.substring(0,11) != "GuestsName"+i && 
                            collection[q].id.substring(0,21) != "BookingPlatformsName"+i+b.Name &&
                            collection[q].id.substring(0,10) != "GuideName"+i){
                            otherTourBolds.push(collection[q]);
                        }
                       
                    }

                    otherTourBolds.forEach(o => {
                        o.className="Normal";
                    });

                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }
                
                var but = createDiv("BookingPlatformsName"+i+b.Name, "Bold", b.Name, "CenterBookingPlatforms"+i);
                but.style = 'background-color: '+b.Colour+';'
                but.onclick = function(){
                    const bb = document.getElementById("BookingPlatformsName"+i+b.Name);
                    bb.remove();
                  
                }

                putAddButton(i,daily);
                
            }
        }
        
    });

    
    var GuideSaleBut = createBut("GuideSale"+i, "PopBlock", "Guide Sale", "popup");
    GuideSaleBut.onclick = async function(){

        var guides = await get("Guides");
        document.getElementById("popup").innerHTML="";
        guides.forEach(guide => {
           var guideSaleGuideId="";
                var guideBut = createBut("guideBut"+i + guide.Name, "PopBlock", guide.Name, "popup");
                guideBut.style = 'background-color: '+guide.Colour+';'
                guideBut.onclick = function(){
                    guideSaleGuideId=guide.Id;
                    document.getElementById("Main").style = "pointer-events:all;"
                    const pops = document.getElementById("popup");
                    pops.remove();

                   
                    var but = createDiv("BookingPlatformsName"+i+"GuideSale", "Bold", "Guide Sale " +guide.Name, "CenterBookingPlatforms"+i);
                    
                    but.onclick = function(){
                        const bb = document.getElementById("BookingPlatformsName"+i+"GuideSale");
                        bb.remove();
                    
                    }

                    const collection = document.getElementsByClassName("Bold");
                    const otherTourBolds=[];
                    for (let q = 0; q < collection.length; q++) {
                      
                        if(collection[q].id.substring(0,11) != "GuestsName"+i && 
                            collection[q].id.substring(0,21) != "BookingPlatformsName"+i &&
                            collection[q].id.substring(0,10) != "GuideName"+i){
                            otherTourBolds.push(collection[q]);
                        }
                       
                    }

                    otherTourBolds.forEach(o => {
                        o.className="Normal";
                    });

                    const numInputs = document.getElementsByClassName("Number");
                    for(var n = 0;n<numInputs.length;n++){
                        
                        numInputs[n].remove();
                    }

                    putAddButton(i,daily,guideSaleGuideId);

                }
        });
                
    }

    var cancelBut = createBut("Cancel"+i, "PopBlock", "Cancel", "popup");
    cancelBut.onclick = function(){
        document.getElementById("Main").style = "pointer-events:all;"
        const pops = document.getElementById("popup");
        pops.remove();
    }

    // if(count==0){
    //     // document.getElementById("Main").style = "pointer-events:all;"
    //     // const pops = document.getElementById("popup");
    //     // pops.remove();
        
    //         // daily.BookingPlatforms.forEach(b => {
    //         //     const pops = document.getElementById(b.Name+"PopUp");
    //         //     pops.remove();
    //         // });
             
    // }

    
}

async function fineTune(type,id,tourTypeId){
    
   // document.getElementById("popup").innerHTML="";
    
    
    var date = document.getElementById("date").value

    var guideId = "";
    var bookiId = "";
    var guestId = "";
    if(type=="Guide"){
        guideId=id;
        
    }
    else if(type=="BookingPlatform"){
        bookiId=id;
        
    }
    else if(type=="Guest"){
        guestId=id;
       
    }
    

    document.getElementById("Main").style = "pointer-events:none;"

    createDiv("popup","PopUp","","Main");

    document.getElementById("popup").style = "pointer-events:all;"

    createDiv("", "PadderTop", "", "popup");
    createDiv("", "PadderTop", "", "popup");

    createDiv("inputDiv","Center","","popup");
    var adjustInput = createInput("adjustInput", "", "number","", "inputDiv");
   
    createDiv("", "PadderTop", "", "popup");
    createDiv("", "PadderTop", "", "popup");

    var addBut = createBut("addBut", "PopBlock", "Adjust", "popup");
    if(type=="GuideSale"){
       
        addBut.onclick = async function(){

            
            
            var guideSale = await edit("GuideSale",id,adjustInput.value);
            if(guideSale =="Success"){
                document.getElementById("Main").style = "pointer-events:all;"
                makeDailyPage(date);
            }
            else{
    
            }
    
           
        }
    
        
    }
    else{
        addBut.onclick = async function(){

            var tours =[];
            var t = Tour(
                tourTypeId,
                bookiId,
                guestId,
                guideId,
                adjustInput.value,
                date
            );
            tours.push(t);
            
            var tour = await store("Tours",tours);
            if(tour =="Success"){
                document.getElementById("Main").style = "pointer-events:all;"
                makeDailyPage(date);
            }
            else{
    
            }
    
           
        }
    
    }
   
    var cancelBut = createBut("Cancel", "PopBlock", "Cancel", "popup");
    cancelBut.onclick = function(){
        document.getElementById("Main").style = "pointer-events:all;"
            makeDailyPage(date);
    }
   
   

}

function  dayClick(i,date,daily){

    dayDiv = document.getElementById("Daily"+i);
    dayDiv.innerHTML="";
    dayDiv.style = 'background-color: '+daily.Colour+';'
    
    // var add = createBut("AddTourDailyBut", "WideFit", "Add", "Daily"+i);
    // add.onclick = async function(){

    //     var tourType = await get("TourType",daily.tourTypeId)
    //     GuidesPage(tourType,date) 
    // }


    var remove = createBut("RemoveTourDailyBut", "WideFit", "Remove", "Daily"+i);
    remove.onclick = async function(){
        
        dayDiv.innerHTML="";

        // var max = daily.Pax;

        var guideId = "";
        var bookId = "";
        var guestId = "";
        daily.Guides.forEach(guide => {
            let max = daily.Pax;
            if(guide.Number<=max){
                max = guide.Number;
                
            }
                var guideBut = createBut(guide.Name+i,"WideFit",guide.Name,"Daily"+i);
                guideBut.onclick = function(){
                    guideId=guide.Id;
                    dayDiv.innerHTML="";
                    
                    if(daily.GuideSales.length>0){
                        
                        
                        
                        var guideSaleBut =  createBut("guideSaleBut"+i,"WideFit","Guide Sale","Daily"+i);
                        guideSaleBut.onclick = function(){

                            dayDiv.innerHTML="";
                            daily.GuideSales.forEach(guideSale => {
                                if(document.getElementById("guideSaleGuideBut"+guideSale.Guide+i)==null){
                                    var guideSaleGuideBut =  createBut("guideSaleGuideBut"+guideSale.Guide+i,"WideFit",guideSale.Guide,"Daily"+i);
                                    guideSaleGuideBut.onclick = function(){
                                        
                                        dayDiv.innerHTML="";

                                        var guideSaleMax = max;
                                        if(guideSale.Number<=guideSaleMax){
                                            guideSaleMax = guideSale.Number;
                                            
                                        }
                                        var guideSaleGuestBut =  createBut("guideSaleGuestBut"+guideSale.Guest+i,"WideFit",guideSale.Guest,"Daily"+i);
                                        guideSaleGuestBut.onclick = function(){
                                            
                                            //guestId = guest.Id;
                                            dayDiv.innerHTML="";
                                            createDiv("", "", "Remove How Many?", "Daily"+i);
                                            createDiv("", "Normal", "Maximum: "+guideSaleMax, "Daily"+i);

                                            var numInput = createInput("numInput"+i,"","number","","Daily"+i);
                                            numInput.setAttribute('max',guideSaleMax);
                                            //numInput.setAttribute('min',0);
                                            //numInput.setAttribute('width','80%');
                                            var addBut = createBut("Remove"+i,"WideFit","Remove","Daily"+i);
                                            addBut.onclick = async function(){
                                                var pax = numInput.value;
                                                if(pax<=guideSaleMax && pax!=0 && pax>0){
                                                
                                                    pax = "-"+pax;
                                                        var tours=[];

                                                        
                                                        var tour = Tour(
                                                            daily.tourTypeId,
                                                            "guideSale",
                                                            guestId,
                                                            guideId,
                                                            pax,
                                                            date,
                                                            );
                                                        tours.push(tour);

                                                        var guidesales=[];

                                                        
                                                        var guidesale = GuideSale(
                                                            daily.tourTypeId,
                                                            guideSale.GuideId,
                                                            guideSale.GuestId,
                                                            pax,
                                                            date,
                                                            );
                                                            guidesales.push(guidesale);
                                                        
                                                    await store("GuideSales", guidesales);
                                                    await store("Tours", tours);

                                                    makeDailyPage(date);

                                                }
                                            }

                                            createDiv("", "PadderTop", "",  "Daily"+i);
                                            createDiv("", "PadderTop", "",  "Daily"+i);
                                        }
                                        // daily.GuideSales.forEach(g => {
                                        //     var guideSaleMax = max;
                                        //     if(g.Number<=guideSaleMax){
                                        //         guideSaleMax = g.Number;
                                               
                                        //     }

                                        //     if(document.getElementById("guideSaleGuestBut"+g.Guest+i)==null){
                                        //         var guideSaleGuestBut =  createBut("guideSaleGuestBut"+g.Guest+i,"WideFit",g.Guest,"Daily"+i);
                                        //         guideSaleGuestBut.onclick = function(){
                                                    
                                        //             //guestId = guest.Id;
                                        //             dayDiv.innerHTML="";
                                        //             createDiv("", "", "Remove How Many?", "Daily"+i);
                                        //             createDiv("", "Normal", "Maximum: "+guideSaleMax, "Daily"+i);
    
                                        //             var numInput = createInput("numInput"+i,"","number","","Daily"+i);
                                        //             numInput.setAttribute('max',guideSaleMax);
                                        //             //numInput.setAttribute('min',0);
                                        //             //numInput.setAttribute('width','80%');
                                        //             var addBut = createBut("Remove"+i,"WideFit","Remove","Daily"+i);
                                        //             addBut.onclick = async function(){
                                        //                 var pax = numInput.value;
                                        //                 if(pax<=guideSaleMax && pax!=0 && pax>0){
                                                        
                                        //                     pax = "-"+pax;
                                        //                         var tours=[];
    
                                                                
                                        //                         var tour = Tour(
                                        //                             daily.tourTypeId,
                                        //                             "guideSale",
                                        //                             guestId,
                                        //                             guideId,
                                        //                             pax,
                                        //                             date,
                                        //                             );
                                        //                         tours.push(tour);
    
                                        //                         var guidesales=[];
    
                                                                
                                        //                         var guidesale = GuideSale(
                                        //                             daily.tourTypeId,
                                        //                             g.GuideId,
                                        //                             g.GuestId,
                                        //                             pax,
                                        //                             date,
                                        //                             );
                                        //                             guidesales.push(guidesale);
                                                                
                                        //                     await store("GuideSales", guidesales);
                                        //                     await store("Tours", tours);
    
                                        //                     makeDailyPage(date);
    
                                        //                 }
                                        //             }
    
                                        //             createDiv("", "PadderTop", "",  "Daily"+i);
                                        //             createDiv("", "PadderTop", "",  "Daily"+i);
                                        //         }
                                        //     }

                                            
                                        // });
                                    }
                                }
                               
                            });
                        }
                    }
                   
                    daily.BookingPlatforms.forEach(b => {

                        if(b.Number<=max){
                            max = b.Number
                        }

                        var bookBut = createBut(b.Name+i,"WideFit",b.Name,"Daily"+i);
                        bookBut.onclick = function(){

                            
                            bookId=b.Id;
                            dayDiv.innerHTML="";

                            daily.Guests.forEach(guest => {
                                if(guest.Number<=max){
                                    max = guest.Number
                                }
                                var guestBut = createBut(guest.Name+i,"WideFit",guest.Name,"Daily"+i);
                                guestBut.onclick = function(){
                                    guestId = guest.Id;
                                    dayDiv.innerHTML="";
                                    createDiv("", "", "Remove How Many?", "Daily"+i);
                                    createDiv("", "Normal", "Maximum: "+max, "Daily"+i);

                                    var numInput = createInput("numInput"+i,"","number","","Daily"+i);
                                    numInput.setAttribute('max',max);
                                    //numInput.setAttribute('min',0);
                                     //numInput.setAttribute('width','80%');
                                    var addBut = createBut("Remove"+i,"WideFit","Remove","Daily"+i);
                                    addBut.onclick = async function(){
                                        var pax = numInput.value;
                                        if(pax<=max && pax!=0 && pax>0){
                                           
                                            pax = "-"+pax;
                                                var tours=[];

                                                
                                                var tour = Tour(
                                                    daily.tourTypeId,
                                                    bookId,
                                                    guestId,
                                                    guideId,
                                                    pax,
                                                    date,
                                                    );
                                                tours.push(tour);
                                                
                                        
                                               await store("Tours", tours);

                                               makeDailyPage(date);

                                        }
                                    }

                                    createDiv("", "PadderTop", "",  "Daily"+i);
                                    createDiv("", "PadderTop", "",  "Daily"+i);
                                }
                               
                            });

                            createDiv("", "PadderTop", "",  "Daily"+i);
                            createDiv("", "PadderTop", "",  "Daily"+i);
                        }

                        // createDiv("", "PadderTop", "",  "Daily"+i);
                        // createDiv("", "PadderTop", "",  "Daily"+i);
                        
                    });
                }

                
           
        });
        createDiv("", "PadderTop", "",  "Daily"+i);
        createDiv("", "PadderTop", "",  "Daily"+i);

    //     var tours=[];

    //     if(number>0){
    //         var tour = Tour(
    //             tourType._id,
    //             bookingPlatform._id,
    //             guests[i]._id,
    //             guide.Id,
    //             number,
    //             date,
    //             );
    //         tours.push(tour);
    //     }
  
    //    await store("Tours", tours);
      // console.log(max);
    }


    var cancel = createBut("CancelTourDailyBut", "WideFit", "Cancel", "Daily"+i);
    cancel.onclick = function(){
        makeDailyPage(date);
    }

    createDiv("", "PadderTop", "",  "Daily"+i);
    createDiv("", "PadderTop", "",  "Daily"+i);

}

async function makeStatsPage() {

   
    clearMain("StatsPage", "FaderIn");

    createDiv("StatsSelectorButs", "Center", "", "StatsPage");

    createDiv("", "PadderTop", "", "StatsPage");
    createDiv("", "PadderTop", "", "StatsPage");

    if(User.Role=="Admin"){
        createDiv("", "Bold", "Arrange By", "StatsPage");
        createDiv("", "PadderTop", "", "StatsPage");
        createDiv("ArangeByButs", "Center", "", "StatsPage");

        createDiv("ArangeByTourBit", "Center", "", "ArangeByButs");
        createDiv("", "PadderLeft", "", "ArangeByButs");
        createDiv("ArangeByBookingPlatformBit", "Center", "", "ArangeByButs");
        createDiv("", "PadderLeft", "", "ArangeByButs");
        createDiv("ArangeByGuideBit", "Center", "", "ArangeByButs");
    }
    

    createDiv("IncomeButBit", "Center", "", "StatsSelectorButs");
    createDiv("", "PadderLeft", "", "StatsSelectorButs");
    createDiv("OutgoingButBit", "Center", "", "StatsSelectorButs");
    createDiv("", "PadderLeft", "", "StatsSelectorButs");
    createDiv("SummaryButBit", "Center", "", "StatsSelectorButs");

    createDiv("", "PadderTop", "", "StatsPage");
    createDiv("", "PadderTop", "", "StatsPage");

  

    createDiv("", "PadderTop", "", "StatsPage");
    createDiv("", "PadderTop", "", "StatsPage");

    createDiv("DateBit", "CenterEven", "", "StatsPage");
    var today = new Date();
    var monthAgo = addMonths(today, -1)
    
    var starDat = createInput("startDate", "","date","", "DateBit");
    starDat.valueAsDate =new Date(monthAgo);
    var endDat = createInput("endDate", "","date","", "DateBit");
    endDat.valueAsDate = new Date();

    if(User.Role=="Admin"){
        var incomeBut = createBut("incomeBut", "", "Income", "IncomeButBit");
        incomeBut.onclick = async function(){
           incomeBut.className ="Darker";
           OutGoingBut.className ="";
           profitBut.className ="";
    
           document.getElementById("arangeByTourBut").style="display:block";
            document.getElementById("arangeByGuideBut").style="display:block";
            document.getElementById("arangeByBookinPlatformBut").style="display:none";
    
           if(document.getElementById("arangeByTourBut").className=="Darker"){
                makeIncomeStatsPageArangedByTour();
           }
           else if(document.getElementById("arangeByTourBut").className=="" 
                    && document.getElementById("arangeByBookinPlatformBut").className==""
                    && document.getElementById("arangeByGuideBut").className==""){
                        document.getElementById("arangeByTourBut").className="Darker";
                        makeIncomeStatsPageArangedByTour();
           }
           else if(document.getElementById("arangeByGuideBut").className=="Darker"){
                makeIncomeStatsPageArangedByGuide();
           }
           else if(document.getElementById("arangeByBookinPlatformBut").className=="Darker"){
           
            makeIncomeStatsPageArangedByTour();
            document.getElementById("arangeByTourBut").className="Darker";
            document.getElementById("arangeByBookinPlatformBut").className="";
       }
           
        }
        var OutGoingBut = createBut("OutGoingBut", "", "OutGoings", "OutgoingButBit");
        OutGoingBut.onclick =async function(){
            incomeBut.className ="";
            OutGoingBut.className ="Darker";
            profitBut.className ="";
    
            document.getElementById("arangeByTourBut").style="display:block";
            document.getElementById("arangeByGuideBut").style="display:block";
            document.getElementById("arangeByBookinPlatformBut").style="display:block";
            
    
            if(document.getElementById("arangeByTourBut").className=="Darker"){
                makeOutgoingStatsPage();
            }
            else if(document.getElementById("arangeByTourBut").className=="" 
                    && document.getElementById("arangeByBookinPlatformBut").className==""
                    && document.getElementById("arangeByGuideBut").className==""){
                        document.getElementById("arangeByTourBut").className="Darker";
                        makeOutgoingStatsPage();
            }
            else if(document.getElementById("arangeByGuideBut").className=="Darker"){
                makeOutgiongsPageArrangeByGuide();
            }
            else if(document.getElementById("arangeByBookinPlatformBut").className=="Darker"){
                makeOutgoingStatsPageArangeByBookingPlatform();
            }
    
    
          
        }
    
        var profitBut = createBut("profitBut", "", "Summary", "SummaryButBit");
        profitBut.onclick =async function(){
            incomeBut.className ="";
            OutGoingBut.className ="";
            profitBut.className ="Darker";
    
            document.getElementById("arangeByTourBut").style="display:none";
            document.getElementById("arangeByGuideBut").style="display:none";
            document.getElementById("arangeByBookinPlatformBut").style="display:none";
    
            makeInOutSummary();
        }
    
        createDiv("", "PadderTop", "", "StatsPage");
        createDiv("", "PadderTop", "", "StatsPage");
    
       
        
    
        var arangeByTourBut = createBut("arangeByTourBut", "", "Tour", "ArangeByTourBit");
        arangeByTourBut.onclick = function(){
            arangeByGuideBut.className ="";
            arangeByBookinPlatformBut.className ="";
            arangeByTourBut.className ="Darker";
    
            if(incomeBut.className =="Darker"){
                makeIncomeStatsPageArangedByTour();
            }
            else if(OutGoingBut.className =="Darker"){
                makeOutgoingStatsPage()
            }
    
            
        }
        
        var arangeByGuideBut = createBut("arangeByGuideBut", "", "Guide", "ArangeByGuideBit");
        arangeByGuideBut.onclick = function(){
            arangeByTourBut.className ="";
            arangeByBookinPlatformBut.className ="";
            arangeByGuideBut.className ="Darker";
    
            if(incomeBut.className =="Darker"){
                makeIncomeStatsPageArangedByGuide();
            }
            else if(OutGoingBut.className =="Darker"){
                makeOutgiongsPageArrangeByGuide();
            }
            
        }
        var arangeByBookinPlatformBut = createBut("arangeByBookinPlatformBut", "", "BookinPlatform", "ArangeByBookingPlatformBit");
        arangeByBookinPlatformBut.onclick = function(){
            arangeByTourBut.className ="";
            arangeByGuideBut.className ="";
            arangeByBookinPlatformBut.className ="Darker";
           
            if(incomeBut.className =="Darker"){
                OutGoingBut.className ="Darker";
            }
            else if(OutGoingBut.className =="Darker"){
                makeOutgoingStatsPageArangeByBookingPlatform()
            }
           
           
            
        }
    }
    else if(User.Role=="Guide"){
        // var incomeBut = createBut("incomeBut", "", "Income", "IncomeButBit");
        // incomeBut.onclick = async function(){
        //    incomeBut.className ="Darker";
        //    OutGoingBut.className ="";
        //    profitBut.className ="";
    
        //    makeIncomeStatsPageArangedByTour();

        // }
        // var OutGoingBut = createBut("OutGoingBut", "", "OutGoings", "OutgoingButBit");
        // OutGoingBut.onclick =async function(){
        //     incomeBut.className ="";
        //     OutGoingBut.className ="Darker";
        //     profitBut.className ="";
    
        //     makeOutgoingStatsPage();
    
          
        // }
    
        // var profitBut = createBut("profitBut", "", "Summary", "SummaryButBit");
        // profitBut.onclick =async function(){
            // incomeBut.className ="";
            // OutGoingBut.className ="";
            //profitBut.className ="Darker";
    
            
    
            makeInOutSummary();
        //}
    
        //createDiv("", "PadderTop", "", "StatsPage");
      // createDiv("", "PadderTop", "", "StatsPage");
    
    }
   


    createDiv("StatsMaster", "", "", "StatsPage");
}

async function makeInOutSummary(){

    var grandTotal=0;
    var VatTotal=0;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    

    inOuts = await getStats("InOuts",startDate,endDate,User);
    
    
    document.getElementById("StatsMaster").innerHTML="";
    document.getElementById("StatsMaster").className="FaderIn";
  
    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");

    createDiv("GrandTotalDiv", "CenterEven", "", "StatsMaster");
    createDiv("GrandTotalTotal", "Heading", "", "GrandTotalDiv");
    createDiv("GrandTotalVat", "Heading", "", "GrandTotalDiv");
   

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");

    for(let i =0;i<inOuts.length;i++){

        var tourTotal=0;
        createDiv("inOutsHeads"+i, "Center", "", "StatsMaster");
        createDiv("inOuts"+i, "Center", "", "StatsMaster");

        document.getElementById("inOutsHeads"+i).style="background-color: "+inOuts[i].Colour;
       

        createDiv("inOutsNames"+i, "OneThird", "", "inOuts"+i);
        createDiv("inOutsNumbers"+i, "OneThird", "", "inOuts"+i);
        createDiv("inOutsTotals"+i, "OneThird", "", "inOuts"+i);
       
        // createDiv("IncomeTourName"+i, "FiftyPer", incomes[i].TourName, "IncomeHeads"+i);
        // // createDiv("IncomeTourName"+i, "", "-", "IncomeNumbers"+i);
        // createDiv("IncomeTotal"+i, "FiftyPer", incomes[i].TotalGuests, "IncomeHeads"+i);

        createDiv("", "PadderTop", "", "inOutsNames"+i);
        createDiv("", "PadderTop", "", "inOutsNumbers"+i);
        createDiv("", "PadderTop", "", "inOutsTotals"+i);

       

        createDiv("inOutsTourName"+i, "FiftyPer", inOuts[i].Name, "inOutsHeads"+i);
        createDiv("inOutsTourGuest"+i, "FiftyPer", "", "inOutsHeads"+i);
        createDiv("inOutsTotal"+i, "FiftyPer", "", "inOutsHeads"+i);

        createDiv("", "PadderTop", "", "inOutsNames"+i);
        createDiv("", "PadderTop", "", "inOutsNumbers"+i);
        createDiv("", "PadderTop", "", "inOutsTotals"+i);

        inOuts[i].BookingPlatforms.forEach(b => {

             createDiv("PlatName"+i, "StatBlock", b.Name, "inOutsNames"+i);
             createDiv("PlatNumber"+i, "StatBlock", "", "inOutsNumbers"+i);
             createDiv("PlatTotal"+i, "StatBlock", "£"+b.Total.toFixed(2), "inOutsTotals"+i);
           
            // numberTotal=numberTotal+parseFloat(plat.Number);
             tourTotal=tourTotal + parseFloat(b.Total);
        });

        if(inOuts[i].Free=="false"){
            inOuts[i].Guests.forEach(guest => {

                createDiv("GuestName"+i, "StatBlock", guest.Name, "inOutsNames"+i);
                createDiv("GuestNumber"+i, "StatBlock", guest.Number, "inOutsNumbers"+i);
                createDiv("GuestTotal"+i, "StatBlock", "£"+guest.Total.toFixed(2), "inOutsTotals"+i);
              
               // numberTotal=numberTotal+parseFloat(plat.Number);
               VatTotal = VatTotal +parseFloat(guest.Total)
                tourTotal=tourTotal + parseFloat(guest.Total);
           });
        }
        

        inOuts[i].Guides.forEach(guide => {

            createDiv("GuideName"+i, "StatBlock", guide.Name, "inOutsNames"+i);
            createDiv("GuideNumber"+i, "StatBlock", guide.Number, "inOutsNumbers"+i);
            createDiv("GuideTotal"+i, "StatBlock", "£"+parseFloat(guide.Total).toFixed(2), "inOutsTotals"+i);
          
           // numberTotal=numberTotal+parseFloat(plat.Number);
            tourTotal=tourTotal + parseFloat(guide.Total);
       });

       inOuts[i].GuideSales.forEach(sale => {

        createDiv("inOutsSaleName"+i, "StatBlock", sale.Name, "inOutsNames"+i);
        createDiv("inOutsSaleNumber"+i, "StatBlock", sale.Number, "inOutsNumbers"+i);
        createDiv("inOutsSaleTotal"+i, "StatBlock", "£"+sale.Total.toFixed(2), "inOutsTotals"+i);

        tourTotal=tourTotal + parseFloat(sale.Total);
    });

       createDiv("", "PadderTop", "", "StatsMaster");
       createDiv("", "PadderTop", "", "StatsMaster");
    
       document.getElementById("inOutsTotal"+i).innerHTML = "£"+tourTotal.toFixed(2);
       grandTotal = grandTotal+tourTotal;
    }

    if(User.Role=="Admin"){
        var tixSales = await getStats("AllTicketSales",startDate,endDate);

        createDiv("tixSalesHead", "Center", "", "StatsMaster");
    
        createDiv("Ine", "FiftyPer", "Ticket Sales", "tixSalesHead");
        createDiv("IneTrt", "FiftyPer", tixSales.Number, "tixSalesHead");
        createDiv("Incotal", "FiftyPer", "£"+tixSales.Price.toFixed(2) , "tixSalesHead");
        grandTotal = grandTotal+tixSales.Price;
    }
   

   
    //document.getElementById("GrandTotalTotal").innerHTML="£"+grandTotal;

    if(User.Role=="Admin"){
        var VAT = 20/100*parseFloat(VatTotal);
        var aftervat = parseFloat(VatTotal) - parseFloat(VAT);
        document.getElementById("GrandTotalVat").innerHTML="VAT: £"+VAT.toFixed(2);
        document.getElementById("GrandTotalTotal").innerHTML = "Grand Total: £"+aftervat.toFixed(2);
    }
    else if(User.Role=="Guide"){
        
        
        document.getElementById("GrandTotalTotal").innerHTML = "Grand Total: £"+grandTotal.toFixed(2);
    }
   
}

async function  makeIncomeStatsPageArangedByTour(){
    //StatsMaster

    var grandTotal=0;

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
   
    incomes = await getStats("Incomes",startDate,endDate,User);

    document.getElementById("StatsMaster").innerHTML="";
    document.getElementById("StatsMaster").className="FaderIn";
  
    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");

    createDiv("GrandTotalDiv", "CenterEven", "", "StatsMaster");
    createDiv("GrandTotalHeading", "Heading", "Grand Total:", "GrandTotalDiv");
    createDiv("GrandTotalTotal", "Heading", "", "GrandTotalDiv");

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");
   
        for(let i =0;i<incomes.length;i++){

            createDiv("IncomeHeads"+i, "Center", "", "StatsMaster");
            createDiv("Income"+i, "Center", "", "StatsMaster");
    
            document.getElementById("IncomeHeads"+i).style="background-color: "+incomes[i].Colour;
           
    
            createDiv("IncomeNames"+i, "OneThird", "", "Income"+i);
            createDiv("IncomeNumbers"+i, "OneThird", "", "Income"+i);
            createDiv("IncomeTotals"+i, "OneThird", "", "Income"+i);
           
            // createDiv("IncomeTourName"+i, "FiftyPer", incomes[i].TourName, "IncomeHeads"+i);
            // // createDiv("IncomeTourName"+i, "", "-", "IncomeNumbers"+i);
            // createDiv("IncomeTotal"+i, "FiftyPer", incomes[i].TotalGuests, "IncomeHeads"+i);
    
            createDiv("", "PadderTop", "", "IncomeNames"+i);
            createDiv("", "PadderTop", "", "IncomeNumbers"+i);
            createDiv("", "PadderTop", "", "IncomeTotals"+i);
    
           
    
            createDiv("IncomeTourName"+i, "FiftyPer", incomes[i].TourName, "IncomeHeads"+i);
            createDiv("IncomeTourGuest"+i, "FiftyPer", incomes[i].TotalGuests, "IncomeHeads"+i);
            createDiv("IncomeTotal"+i, "FiftyPer", "", "IncomeHeads"+i);
    
            createDiv("", "PadderTop", "", "IncomeNames"+i);
            createDiv("", "PadderTop", "", "IncomeNumbers"+i);
            createDiv("", "PadderTop", "", "IncomeTotals"+i);
    
          
            if(incomes[i].Guests!=null){
                var tourTotal=0;
                for(let x = 0;x<incomes[i].Guests.length;x++){
                    createDiv("IncomeGuestsName"+i, "StatBlock", incomes[i].Guests[x].Guest, "IncomeNames"+i);
                    createDiv("IncomeGuestsNumber"+i, "StatBlock", incomes[i].Guests[x].Number, "IncomeNumbers"+i);
                    createDiv("IncomeGuestsTotal"+i, "StatBlock", "£"+incomes[i].Guests[x].Total.toFixed(2), "IncomeTotals"+i);
                    tourTotal=tourTotal + parseFloat(incomes[i].Guests[x].Total);
                }
                document.getElementById("IncomeTotal"+i).innerHTML="£"+tourTotal.toFixed(2);

                grandTotal = grandTotal+tourTotal;
            }
            if(incomes[i].GuideNumbers!=null){
                var tourTotal=0;
                for(let x = 0;x<incomes[i].GuideNumbers.length;x++){
                    createDiv("IncomeGuestsName"+i, "StatBlock", incomes[i].GuideNumbers[x].Guide, "IncomeNames"+i);
                    createDiv("IncomeGuestsNumber"+i, "StatBlock", incomes[i].GuideNumbers[x].Number, "IncomeNumbers"+i);
                    createDiv("IncomeGuestsTotal"+i, "StatBlock", "£"+incomes[i].GuideNumbers[x].Total.toFixed(2), "IncomeTotals"+i);
                    tourTotal=tourTotal + parseFloat(incomes[i].GuideNumbers[x].Total);
                }
                document.getElementById("IncomeTotal"+i).innerHTML="£"+tourTotal.toFixed(2);

                grandTotal = grandTotal+tourTotal;
            }
            
            

            createDiv("", "PadderTop", "", "StatsMaster");
            createDiv("", "PadderTop", "", "StatsMaster");
        }
    
        

        var tixSales = await getStats("AllTicketSales",startDate,endDate);

        createDiv("tixSalesHead", "Center", "", "StatsMaster");

        createDiv("Ine", "FiftyPer", "Ticket Sales", "tixSalesHead");
        createDiv("IneTrt", "FiftyPer", tixSales.Number, "tixSalesHead");
        createDiv("Incotal", "FiftyPer", "£"+tixSales.Price.toFixed(2) , "tixSalesHead");

        grandTotal = grandTotal+tixSales.Price;
        document.getElementById("GrandTotalTotal").innerHTML="£"+grandTotal.toFixed(2);
       
}

async function  makeIncomeStatsPageArangedByGuide(){
    //StatsMaster
    var grandTotal=0;

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    

    incomes = await getStats("GuideIncomes",startDate,endDate);

   
    document.getElementById("StatsMaster").innerHTML="";
    document.getElementById("StatsMaster").className="FaderIn";
  
    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");

    createDiv("GrandTotalDiv", "CenterEven", "", "StatsMaster");
    createDiv("GrandTotalHeading", "Heading", "Grand Total:", "GrandTotalDiv");
    createDiv("GrandTotalTotal", "Heading", "", "GrandTotalDiv");

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");


    createDiv("IncomeHeads", "Center", "", "StatsMaster");
    createDiv("Income", "Center", "", "StatsMaster");

   

    createDiv("IncomeNames", "OneThird", "", "Income");
    createDiv("IncomeNumbers", "OneThird", "", "Income");
    createDiv("IncomeTotals", "OneThird", "", "Income");
   
    var i=0;
    incomes.forEach(income => {
       
        createDiv("IncomeHeads"+i, "Center", "", "StatsMaster");
        createDiv("Income"+i, "Center", "", "StatsMaster");

        document.getElementById("IncomeHeads"+i).style="background-color: "+incomes[i].Colour;
       

        createDiv("IncomeNames"+i, "OneThird", "", "Income"+i);
        createDiv("IncomeNumbers"+i, "OneThird", "", "Income"+i);
        createDiv("IncomeTotals"+i, "OneThird", "", "Income"+i);
       
      
        createDiv("", "PadderTop", "", "IncomeNames"+i);
        createDiv("", "PadderTop", "", "IncomeNumbers"+i);
        createDiv("", "PadderTop", "", "IncomeTotals"+i);

       
        createDiv("IncomeTourName"+i, "FiftyPer", income.Name, "IncomeHeads"+i);
        createDiv("IncomeTourGuest"+i, "FiftyPer", "", "IncomeHeads"+i);
        createDiv("IncomeTourTotal"+i, "FiftyPer", "", "IncomeHeads"+i);

        createDiv("", "PadderTop", "", "IncomeNames"+i);
        createDiv("", "PadderTop", "", "IncomeNumbers"+i);
        createDiv("", "PadderTop", "", "IncomeTotals"+i);
        var tourTotal=0;
        var numberTotal= 0;
        var x =0;
        income.GuideTour.forEach(tour => {
            
            createDiv("GuideTourName"+i, "StatBlock", tour.Name, "IncomeNames"+i);
            createDiv("GuideTourNumber"+i, "StatBlock", tour.Number, "IncomeNumbers"+i);
            createDiv("GuideTourTotal"+i, "StatBlock", "£"+tour.Total.toFixed(2), "IncomeTotals"+i);
           
            numberTotal=numberTotal+parseFloat(tour.Number);
            tourTotal=tourTotal + parseFloat(tour.Total);
            
            x++;
        });
        
        document.getElementById("IncomeTourGuest"+i).innerHTML=numberTotal.toFixed(2);

        grandTotal=grandTotal+tourTotal;
        document.getElementById("IncomeTourTotal"+i).innerHTML="£"+tourTotal.toFixed(2);
      
        //grandTotal = grandTotal+tourTotal;

      
        createDiv("", "PadderTop", "", "StatsMaster");
        createDiv("", "PadderTop", "", "StatsMaster");

        i++;
    });

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");
    document.getElementById("GrandTotalTotal").innerHTML="£"+grandTotal.toFixed(2);
    
}

async function makeOutgoingStatsPage(){

    var grandTotal=0;

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    outs = await getStats("OutGoings",startDate,endDate);
    console.log(outs);
  

    document.getElementById("StatsMaster").innerHTML="";
    document.getElementById("StatsMaster").className="FaderIn";
    
    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");
    
    createDiv("GrandTotalDiv", "CenterEven", "", "StatsMaster");
    createDiv("GrandTotalHeading", "Heading", "Grand Total:", "GrandTotalDiv");
    createDiv("GrandTotalTotal", "Heading", "", "GrandTotalDiv");

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");

    for(let i =0;i<outs.length;i++){

        createDiv("OutHeads"+i, "Center", "", "StatsMaster");
        createDiv("Out"+i, "Center", "", "StatsMaster");

        document.getElementById("OutHeads"+i).style="background-color: "+outs[i].Colour;
       
        createDiv("OutNames"+i, "OneThird", "", "Out"+i);
        createDiv("OutNumbers"+i, "OneThird", "", "Out"+i);
        createDiv("OutTotals"+i, "OneThird", "", "Out"+i);
       
        createDiv("", "PadderTop", "", "OutNames"+i);
        createDiv("", "PadderTop", "", "OutNumbers"+i);
        createDiv("", "PadderTop", "", "OutTotals"+i);

       

        createDiv("OutTourName"+i, "FiftyPer", outs[i].TourType, "OutHeads"+i);
        createDiv("OutTourGuest"+i, "FiftyPer", outs[i].TotalGuests, "OutHeads"+i);
        createDiv("OutTotal"+i, "FiftyPer", "", "OutHeads"+i);

        createDiv("", "PadderTop", "", "OutNames"+i);
        createDiv("", "PadderTop", "", "OutNumbers"+i);
        createDiv("", "PadderTop", "", "OutTotals"+i);
        var tourTotal=0;
        outs[i].GuideTotals.forEach(g => {

                createDiv("OutGuestsName"+i, "StatBlock",g.Name, "OutNames"+i);
                createDiv("OutGuestsNumber"+i, "StatBlock", g.TotalGuests, "OutNumbers"+i);
                createDiv("OutGuestsTotal"+i, "StatBlock", "£"+g.Total.toFixed(2), "OutTotals"+i);
                tourTotal=tourTotal + parseFloat(g.Total);
        });

        outs[i].BookingFees.forEach(b => {

            createDiv("OutGuestsName"+i, "StatBlock", b.Name, "OutNames"+i);
            createDiv("OutGuestsNumber"+i, "StatBlock","", "OutNumbers"+i);
            createDiv("OutGuestsTotal"+i, "StatBlock", "£"+b.Total.toFixed(2), "OutTotals"+i);

            tourTotal=tourTotal + parseFloat(b.Total);
        });

        outs[i].GuideSales.forEach(sale => {

           
            createDiv("OutGuestsName"+i, "StatBlock", sale.Name, "OutNames"+i);
            createDiv("OutGuestsNumber"+i, "StatBlock", sale.Number, "OutNumbers"+i);
            createDiv("OutGuestsTotal"+i, "StatBlock", "£"+sale.Total.toFixed(2), "OutTotals"+i);

            tourTotal=tourTotal + parseFloat(sale.Total);
        });
        
        document.getElementById("OutTotal"+i).innerHTML="£"+tourTotal.toFixed(2);
        grandTotal = grandTotal+tourTotal;
        
       
        createDiv("", "PadderTop", "", "StatsMaster");
        createDiv("", "PadderTop", "", "StatsMaster");
    }
    document.getElementById("GrandTotalTotal").innerHTML="£"+grandTotal.toFixed(2);
}

async function makeOutgoingStatsPageArangeByBookingPlatform(){

    let grandTotal=0;

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    outs = await getStats("OutGoingsByBookingPlatform",startDate,endDate);

   

    document.getElementById("StatsMaster").innerHTML="";
    document.getElementById("StatsMaster").className="FaderIn";
  
    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");

    createDiv("GrandTotalDiv", "CenterEven", "", "StatsMaster");
    createDiv("GrandTotalHeading", "Heading", "Grand Total:", "GrandTotalDiv");
    createDiv("GrandTotalTotal", "Heading", "", "GrandTotalDiv");

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");


    createDiv("OutsHeads", "Center", "", "StatsMaster");
    createDiv("Outs", "Center", "", "StatsMaster");

   

    createDiv("OutsNames", "OneThird", "", "Outs");
    createDiv("OutsNumbers", "OneThird", "", "Outs");
    createDiv("OutsTotals", "OneThird", "", "Outs");
   
       
    var i=0;
    outs.forEach(out => {
       
        createDiv("OutHeads"+i, "Center", "", "StatsMaster");
        createDiv("Out"+i, "Center", "", "StatsMaster");

        document.getElementById("OutHeads"+i).style="background-color: "+out.Colour;
       

        createDiv("OutNames"+i, "OneThird", "", "Out"+i);
        createDiv("OutNumbers"+i, "OneThird", "", "Out"+i);
        createDiv("OutTotals"+i, "OneThird", "", "Out"+i);
       
      
        createDiv("", "PadderTop", "", "OutNames"+i);
        createDiv("", "PadderTop", "", "OutNumbers"+i);
        createDiv("", "PadderTop", "", "OutTotals"+i);

       
        createDiv("OutPlatName"+i, "FiftyPer", out.Name, "OutHeads"+i);
        createDiv("OutPlatNumber"+i, "FiftyPer", "", "OutHeads"+i);
        createDiv("OutPlatTotal"+i, "FiftyPer", "", "OutHeads"+i);

        createDiv("", "PadderTop", "", "OutNames"+i);
        createDiv("", "PadderTop", "", "OutNumbers"+i);
        createDiv("", "PadderTop", "", "OutTotals"+i);
        var tourTotal=0;
        var numberTotal= 0;
       
        out.TourPlats.forEach(plat => {
            
            createDiv("PlatName"+i, "StatBlock", plat.Name, "OutNames"+i);
            //createDiv("PlatTourNumber"+i, "StatBlock", plat.Number, "OutNumbers"+i);
            createDiv("PlatTourTotal"+i, "StatBlock", "£"+plat.Total.toFixed(2), "OutTotals"+i);
           
            numberTotal=numberTotal+parseFloat(plat.Number);
            tourTotal=tourTotal + parseFloat(plat.Total);
            
           
        });
        
       // document.getElementById("OutPlatNumber"+i).innerHTML=numberTotal;

        grandTotal=grandTotal+tourTotal;
        document.getElementById("OutPlatTotal"+i).innerHTML="£"+tourTotal.toFixed(2);
      
        //grandTotal = grandTotal+tourTotal;

      
        createDiv("", "PadderTop", "", "StatsMaster");
        createDiv("", "PadderTop", "", "StatsMaster");

        i++;
    });

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");
    document.getElementById("GrandTotalTotal").innerHTML="£"+grandTotal.toFixed(2);
}

async function makeOutgiongsPageArrangeByGuide(){


    let grandTotal=0;

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;

    outs = await getStats("OutGoingsByGuide",startDate,endDate);



    document.getElementById("StatsMaster").innerHTML="";
    document.getElementById("StatsMaster").className="FaderIn";
  
    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");

    createDiv("GrandTotalDiv", "CenterEven", "", "StatsMaster");
    createDiv("GrandTotalHeading", "Heading", "Grand Total:", "GrandTotalDiv");
    createDiv("GrandTotalTotal", "Heading", "", "GrandTotalDiv");

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");


    createDiv("OutsHeads", "Center", "", "StatsMaster");
    createDiv("Outs", "Center", "", "StatsMaster");

   

    createDiv("OutsNames", "OneThird", "", "Outs");
    createDiv("OutsNumbers", "OneThird", "", "Outs");
    createDiv("OutsTotals", "OneThird", "", "Outs");
   
       
    var i=0;

    outs.forEach(out => {
        createDiv("OutHeads"+i, "Center", "", "StatsMaster");
        createDiv("Out"+i, "Center", "", "StatsMaster");

        document.getElementById("OutHeads"+i).style="background-color: "+out.Colour;
       

        createDiv("OutNames"+i, "OneThird", "", "Out"+i);
        createDiv("OutNumbers"+i, "OneThird", "", "Out"+i);
        createDiv("OutTotals"+i, "OneThird", "", "Out"+i);
       
      
        createDiv("", "PadderTop", "", "OutNames"+i);
        createDiv("", "PadderTop", "", "OutNumbers"+i);
        createDiv("", "PadderTop", "", "OutTotals"+i);

       
        createDiv("OutTourName"+i, "FiftyPer", out.Name, "OutHeads"+i);
        createDiv("OutTourNumber"+i, "FiftyPer", "", "OutHeads"+i);
        createDiv("OutTourTotal"+i, "FiftyPer", "£"+out.Total.toFixed(2), "OutHeads"+i);

        createDiv("", "PadderTop", "", "OutNames"+i);
        createDiv("", "PadderTop", "", "OutNumbers"+i);
        createDiv("", "PadderTop", "", "OutTotals"+i);
        var tourTotal=0;
        var numberTotal= 0;
       
        out.Tours.forEach(t => {
            
            createDiv("TourName"+i, "StatBlock", t.Name, "OutNames"+i);
            createDiv("TourTourNumber"+i, "StatBlock", t.Number, "OutNumbers"+i);
            createDiv("TourTourTotal"+i, "StatBlock", "£"+t.Total.toFixed(2), "OutTotals"+i);
           
            numberTotal=numberTotal+parseFloat(t.Number);
            tourTotal=tourTotal + parseFloat(t.Total);
            
           
        });

        out.GuideSales.forEach(sale => {

            console.log(sale)
            createDiv("OutGuestsName"+i, "StatBlock", sale.Name, "OutNames"+i);
            createDiv("OutGuestsNumber"+i, "StatBlock", sale.Number, "OutNumbers"+i);
            createDiv("OutGuestsTotal"+i, "StatBlock", "£"+sale.Total.toFixed(2), "OutTotals"+i);

            tourTotal=tourTotal + parseFloat(sale.Total);
        });
        
        //document.getElementById("OutTourNumber"+i).innerHTML=numberTotal;

        grandTotal=grandTotal+tourTotal;
        document.getElementById("OutTourTotal"+i).innerHTML="£"+tourTotal.toFixed(2);
      
        //grandTotal = grandTotal+tourTotal;

      
        createDiv("", "PadderTop", "", "StatsMaster");
        createDiv("", "PadderTop", "", "StatsMaster");

        i++;
    });

    createDiv("", "PadderTop", "", "StatsMaster");
    createDiv("", "PadderTop", "", "StatsMaster");
    document.getElementById("GrandTotalTotal").innerHTML="£"+grandTotal.toFixed(2);
  
}

function createSendTourButton(tourId, bookingPlatformId, guest,date) {


    var but = document.getElementById("addGuestBut");

    if (but == null) {

        createDiv("", "PadderTop", "", "GuestsPage");
        createDiv("", "PadderTop", "", "GuestsPage");

        createDiv("AddGuestDiv", "Center", "", "GuestsPage");

        var add = createBut("addGuestBut", "WideBut", "", "AddGuestDiv");
        add.onclick = function () {
            sendTour(tourId, bookingPlatformId)
        }

        createDiv(guest.Name+"DisplayNumber", "", "1 x "+guest.Name, "addGuestBut");
    }
    else {

        var existingGuest = document.getElementById(guest.Name + "DisplayNumber");

        if (existingGuest == null) {
            createDiv(guest.Name + "DisplayNumber", "", "1 x " + guest.Name, "addGuestBut");
        }
        else {
            var xIndex = existingGuest.innerHTML.indexOf("x");
            var number = existingGuest.innerHTML.substring(0, xIndex);
            
            var newNumber = parseInt(number) + 1;
            var endOfExisting = existingGuest.innerHTML.substring(xIndex-1);

            existingGuest.innerHTML = newNumber + endOfExisting;
        }

    }
    

}

async function GuestsPage(guide,tourType, bookingPlatform,date) {
   
    console.log(date)
    var guests = await get("Guests", tourType._id);
    clearMain("GuestsPage", "FaderIn");

    createDiv("extras", "Extras", "", "GuestsPage");
    var guidebut = createBut(guide.Name+"Extra", "", guide.Name, "extras");
    guidebut.onclick = function(){
        GuidesPage();
    }
    createDiv("", "PadderLeft", "", "extras");
    var tourTypebut = createBut(tourType.Name+"Extra", "", tourType.Time+" "+tourType.Name, "extras");
    tourTypebut.onclick = function(){
        TourTypesPage(guide)
    }
    createDiv("", "PadderLeft", "", "extras");
    var bookingPlatformbut = createBut(bookingPlatform.Name+"Extra", "", bookingPlatform.Name, "extras");
    bookingPlatformbut.onclick = function(){
        bookingPlatforms(tourType,guide)
    }
    createDiv("", "PadderTop", "", "GuestsPage");

    for (let i = 0; i < guests.length; i += 2) {

        createDiv("guestsButs" + i, "CenterEven", "", "GuestsPage");

        createDiv("guestsButsDIV" + i, "vertical", "", "guestsButs" + i);
        createDiv("guestsButsDIVCenter" + i, "Center", "", "guestsButsDIV" + i);
        createDiv(guests[i].Name, "BigText", guests[i].Name, "guestsButsDIVCenter" + i);
        createDiv("", "PadderTop", "", "guestsButsDIV" + i);

        document.getElementById(guests[i].Name).style = 'background-color: '+guests[i].Colour+';'
        createDiv(guests[i].Name+"Cent", "Center","","guestsButsDIV" + i);
        createInput(guests[i].Name+"Input", "SmallTextBox","text","",guests[i].Name+"Cent");

        if(i+1<guests.length){
            createDiv("guestsButsDIV" + i + 1, "vertical", "", "guestsButs" + i);
            createDiv("guestsButsDIVCenter" + i + 1, "Center", "", "guestsButsDIV" + i+1);
            createDiv(guests[i + 1].Name, "BigText", guests[i + 1].Name, "guestsButsDIVCenter" + i + 1);
            createDiv("", "PadderTop", "", "guestsButsDIV" + i+1);
            document.getElementById(guests[i + 1].Name).style = 'background-color:'+guests[i+1].Colour+';'
    
            createDiv(guests[i + 1].Name+"Cent", "Center","", "guestsButsDIV" + i + 1);
            createInput(guests[i + 1].Name+"Input", "SmallTextBox","text","", guests[i + 1].Name+"Cent");
        }
        



        // var guestsBut = createBut(guests[i].Name, "BigBut", guests[i].Name, "guestsButs" + i);
        // guestsBut.onclick = function () {
        //     createSendTourButton(tourType._id, bookingPlatform._id, guests[i]);
        //     //console.log(guests[i].Name);
        //     //sendTour(tourId, bookingPlatformId, guests[i].Id);
        // }
        // if (i + 1 < guests.length) {
        //     var guestsBut2 = createBut(guests[i + 1].Name, "BigBut", guests[i + 1].Name, "guestsButs" + i);
        //     guestsBut2.onclick = function () {
        //         createSendTourButton(tourType._id, bookingPlatform._id, guests[i + 1]);
        //        // console.log(guests[i + 1].Name);
        //         //sendTour(tourId, bookingPlatformId, guests[i].Id);
        //     }
        // }


        

        createDiv("", "PadderTop", "", "GuestsPage");
    }

    createDiv("", "PadderTop", "", "GuestsPage");
    createDiv("", "PadderTop", "", "GuestsPage");
    createDiv("", "PadderTop", "", "GuestsPage");
    createDiv("", "PadderTop", "", "GuestsPage");
    createDiv("AddGuestDiv", "Center", "", "GuestsPage");

    var add = createBut("addGuestBut", "BigBut", "Add", "AddGuestDiv");
    add.onclick = async function () {

        var tours=[];
        var guideSales=[];
        for(let i=0;i<guests.length;i++){

            var number = document.getElementById(guests[i].Name+"Input").value;

          
            if(number>0){

               
                if(date=="" || date==null){
                  
    
                    date = new Date();
                }
                else{
                    date = new Date(date);
                }
                if(bookingPlatform._id=="GuideSale"){

                    var guideSale = GuideSale(tourType._id,
                                                bookingPlatform.Guide.Id,
                                                guests[i]._id,
                                                number,
                                                date
                                            );

                    guideSales.push(guideSale);
                }

                var tour = Tour(
                    tourType._id,
                    bookingPlatform._id,
                    guests[i]._id,
                    guide.Id,
                    number,
                    date,
                    );
                tours.push(tour);
            }
           

        }
       
         if(guideSales.length>0){
             await store("GuideSales", guideSales);
         }
       
       await store("Tours", tours);
       load();
    }
    createDiv("", "PadderTop", "", "GuestsPage");
}

async function TourTypesPage(date) {
   
    var tourTypes = await get("TourTypes");
    clearMain("TourTypesPage", "FaderIn");

    createDiv("", "PadderTop", "", "TourTypesPage");
    createDiv("", "PadderTop", "", "TourTypesPage");

    MakeDate("TourTypesPage",date);
   
    // createDiv("extras", "Extras", "", "TourTypesPage");
    // var guidebut = createBut(guide.Name+"Extra", "", guide.Name, "extras");
    // guidebut.onclick = function(){
    //     GuidesPage();
    // }


    createDiv("", "PadderTop", "", "TourTypesPage");
   
   
    for (let i = 0; i < tourTypes.length; i += 2) {
       
        createDiv("tourTypesButs" + i, "CenterSpace", "", "TourTypesPage");

        var tourTypesBut = createBut(tourTypes[i].Name, "BigBut", tourTypes[i].Time+" "+tourTypes[i].Name, "tourTypesButs" + i);
        tourTypesBut.style = 'background-color: '+tourTypes[i].Colour+';'
        tourTypesBut.onclick = function () {
            setTimeout(function () {
                document.getElementById("TourTypesPage").className = "sliderLeft";
                setTimeout(function () {
                    var d = document.getElementById("date").value;
                   
                    GuidesPage(tourTypes[i],d)
                  
                }, fadeTime);
            }, slideTime);
        }
        if (i + 1 < tourTypes.length) {
            var tourTypes2 = createBut(tourTypes[i + 1].Name, "BigBut", tourTypes[i+1].Time + " " + tourTypes[i + 1].Name, "tourTypesButs" + i);
            tourTypes2.style = 'background-color: '+tourTypes[i+1].Colour+';'
            tourTypes2.onclick = function () {
                setTimeout(function () {
                    document.getElementById("TourTypesPage").className = "sliderLeft";
                    setTimeout(function () {
                        var d = document.getElementById("date").value;
                        GuidesPage(tourTypes[i + 1],d)
                        //bookingPlatforms(tourTypes[i + 1], guide,date)
                    }, fadeTime);
                }, slideTime);
               
            }
        }


        createDiv("", "PadderTop", "", "TourTypesPage");
    }
}

async function bookingPlatforms(tourType,guide,date) {

    console.log(date)
    var bookingPlatforms = await get("BookingPlatForms", tourType._id);

    clearMain("BookingPlatformPage", "FaderIn");
    

    createDiv("extras", "Extras", "", "BookingPlatformPage");
    
    createDiv("", "PadderLeft", "", "extras");
    var tourTypebut = createBut(tourType.Name+"Extra", "", tourType.Time+" "+tourType.Name, "extras");
    tourTypebut.onclick = function(){
        TourTypesPage(date)
    }
    createDiv("", "PadderLeft", "", "extras");

    var guidebut = createBut(guide.Name+"Extra", "", guide.Name, "extras");
    guidebut.onclick = function(){
        GuidesPage(tourType,date);
    }

    createDiv("", "PadderTop", "", "BookingPlatformPage");

    var j = 0;
    for (let i = 0; i < bookingPlatforms.length; i += 2) {
        j++;
        createDiv("bookingPlatformsButs" + i, "CenterSpace", "", "BookingPlatformPage");

        var bookingPlatformBut = createBut(bookingPlatforms[i].Name, "BigBut", bookingPlatforms[i].Name, "bookingPlatformsButs" + i);
        bookingPlatformBut.style = 'background-color: '+bookingPlatforms[i].Colour+';'
        bookingPlatformBut.onclick = function () {
            setTimeout(function () {
                document.getElementById("BookingPlatformPage").className = "sliderLeft";
                setTimeout(function () {
                    GuestsPage(guide,tourType, bookingPlatforms[i],date)
                   
                }, fadeTime);
            }, slideTime);
           
        }
        if (i + 1 < bookingPlatforms.length) {
            var bookingPlatformBut2 = createBut(bookingPlatforms[i + 1].Name, "BigBut", bookingPlatforms[i + 1].Name, "bookingPlatformsButs" + i);
            bookingPlatformBut2.style = 'background-color:'+bookingPlatforms[i + 1].Colour+';'
            bookingPlatformBut2.onclick = function () {
                setTimeout(function () {
                    document.getElementById("BookingPlatformPage").className = "sliderLeft";
                    setTimeout(function () {
                        
                        GuestsPage(guide,tourType, bookingPlatforms[i + 1],date)
                        
                    }, fadeTime);
                }, slideTime);

               
            }
        }
        

        createDiv("", "PadderTop", "", "BookingPlatformPage");
    }
    if (j % 2 == 0) {

        createDiv("bookingPlatformsButs" + "j", "CenterSpace", "", "BookingPlatformPage");

        var GuideSaleBut = createBut("Guide Sale", "BigBut", "Guide Sale", "bookingPlatformsButs" + "j");
        GuideSaleBut.onclick = async function () {
            await guidePopUp(guide,tourType,date);
            // setTimeout(function () {
            //     document.getElementById("BookingPlatformPage").className = "sliderLeft";
            //     setTimeout(function () {
                   
            //         // const guideSale = {Name:"GuideSale",_id:"GuideSale"}
            //         //GuestsPage(guide,tourType, guideSale,date);
            //     }, fadeTime);
            // }, slideTime);

        }
    }
    else {
        createDiv("bookingPlatformsButs" + j, "CenterSpace", "", "BookingPlatformPage");

        var GuideSaleBut = createBut("Guide Sale", "BigBut", "Guide Sale", "bookingPlatformsButs" + j);
        GuideSaleBut.onclick = async function () {
             await guidePopUp(guide,tourType,date);
            // setTimeout(function () {
            //     document.getElementById("BookingPlatformPage").className = "sliderLeft";
            //     setTimeout(function () {
                    
            //         // const guideSale = {Name:"GuideSale",_id:"GuideSale"}
            //         // GuestsPage(guide,tourType, guideSale,date);
            //     }, fadeTime);
            // }, slideTime);
        }
    }

   

    
    
}


async function guidePopUp(guide,tourType,date){

    document.getElementById("Main").style = "pointer-events:none;"

    createDiv("popup","PopUp","","Main");

    document.getElementById("popup").style = "pointer-events:all;"

    var guides = await get("Guides");
    console.log(guides)
    guides.forEach(g => {
        var guideBut = createBut(g.Name+"PopUp","PopBlock",g.Name,"popup");
        guideBut.style ='background-color: '+g.Colour+';'
        guideBut.onclick = function(){
             setTimeout(function () {
                document.getElementById("BookingPlatformPage").className = "sliderLeft";
                setTimeout(function () {
                    document.getElementById("Main").style = "pointer-events:all;"
                    const guideSale = {Name:"Guide Sale",_id:"GuideSale", Guide:g}
                    GuestsPage(guide,tourType, guideSale,date);
                }, fadeTime);
            }, slideTime);

        }
    });
    
}

async function GuidesPage(tourType,date) {
   
    console.log(date)
    var Guides = await get("Guides");
    
    clearMain("GuidesPage", "FaderIn");

    createDiv("extras", "Extras", "", "GuidesPage");
    
    createDiv("", "PadderLeft", "", "extras");
    var tourTypebut = createBut(tourType.Name+"Extra", "", tourType.Time+" "+tourType.Name, "extras");
    tourTypebut.onclick = function(){
        TourTypesPage(date)
    }
    
    createDiv("", "PadderTop", "", "GuidesPage");

    createDiv("", "PadderTop", "", "GuidesPage");
    createDiv("", "PadderTop", "", "GuidesPage");
    createDiv("", "PadderTop", "", "GuidesPage");
   
    for (let i = 0; i < Guides.length; i += 2) {
    
        createDiv("GuidesPageButs" + i, "CenterSpace", "", "GuidesPage");
        
        var GuidesBut = createBut(Guides[i].Name, "BigBut", Guides[i].Name, "GuidesPageButs" + i);
        GuidesBut.style = 'background-color: '+Guides[i].Colour+';'
        GuidesBut.onclick = function () {
            setTimeout(function () {
                document.getElementById("GuidesPage").className = "sliderLeft";
                setTimeout(function () {
                   
                    bookingPlatforms(tourType,Guides[i],date);
                    //TourTypesPage(Guides[i],d)
                }, fadeTime);
            }, slideTime);

        }
        if (i + 1 < Guides.length) {
            
            var GuidesBut2 = createBut(Guides[i + 1].Name, "BigBut", Guides[i + 1].Name, "GuidesPageButs" + i);
            GuidesBut2.style = 'background-color: '+Guides[i+1].Colour+';'
            GuidesBut2.onclick = function () {
                setTimeout(function () {
                    document.getElementById("GuidesPage").className = "sliderLeft";
                    setTimeout(function () {
                      
                        bookingPlatforms(tourType,Guides[i + 1],date);
                        //TourTypesPage(Guides[i + 1],d)
                    }, fadeTime);
                }, slideTime);


            }
        }


        createDiv("", "PadderTop", "", "GuidesPage");
    }

  

    
}

function BuildButtons(){

    clearMain("BuildButtonsPage", "FaderIn");
    createDiv("Buttons", "CenterSpace", "", "BuildButtonsPage");

    var registerGuideBut = createBut("registerGuideBut","BigBut","Register Guide","Buttons");
    registerGuideBut.onclick = function(){

        registerGuidePage();
    }
    var makeTourTypesBut = createBut("registerGuideBut","BigBut","Make Tours","Buttons");
    makeTourTypesBut.onclick = function(){

        makeTourTypesPage();
    }

}

async function addGuestsToTourType(tourType,guest){

    clearMain("AddGuestToTourType", "FaderIn");
    
    createDiv("hed", "Center", "", "AddGuestToTourType");
    
    createDiv("", "Heading", "Add Guest to "+tourType.Time +" "+tourType.Name, "hed");

    createDiv("", "PadderTop", "", "AddGuestToTourType");
    createDiv("", "PadderTop", "", "AddGuestToTourType");

    createDiv("guestInfo", "Center", "", "AddGuestToTourType");
    
    createDiv("Lables", "Vertical", "", "guestInfo");
    createDiv("", "PadderLeft", "", "guestInfo");
    createDiv("Inputs", "Vertical", "", "guestInfo");

    createDiv("", "", "Name: ", "Lables");
    createInput("NameInput", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    if(tourType.Free=="false"){
        createDiv("", "", "Price: ", "Lables");
        createInput("PriceInput", "", "number", "","Inputs");
        createDiv("", "PadderTop", "", "Lables");
        createDiv("", "PadderTop", "","Inputs");
    }

    createDiv("", "", "Colour: ", "Lables");
    createInput("ColourInput", "", "color", "","Inputs");
    createDiv("", "PadderTop", "", "Inputs");
    
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "", "Opacity:", "Lables");
    createInput("OpacityInput", "", "number", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    document.getElementById("OpacityInput").value =60;
    document.getElementById("OpacityInput").setAttribute('max','99');
    document.getElementById("OpacityInput").setAttribute('min','1');
    createDiv("", "", "Colour Output:", "Lables");
    createDiv("ColourOutput","","","Inputs");
    document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:black";
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

   

    createDiv("", "PadderTop", "", "AddGuestToTourType");
    createDiv("", "PadderTop", "", "AddGuestToTourType");
    
    

    document.getElementById("OpacityInput").onchange = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
      
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };
    document.getElementById("ColourInput").oninput = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
       
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };

    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("Errors", "", "", "AddGuestToTourType");

    createDiv("", "PadderTop", "", "AddGuestToTourType");
    createDiv("", "PadderTop", "", "AddGuestToTourType");
    createDiv("butBit", "Center", "", "AddGuestToTourType");

  
    if(guest!=null){
        
        document.getElementById("NameInput").value = guest.Name;
        if( document.getElementById("PriceInput")!=null)
        document.getElementById("PriceInput").value = parseInt(guest.Price);
        document.getElementById("ColourInput").value = guest.Colour.substring(0,guest.Colour.length-2);
        document.getElementById("OpacityInput").value = guest.Colour.substring(guest.Colour.length-2);
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+guest.Colour

        var newGuestBut2 = createBut("","","Edit Guest","butBit");
        newGuestBut2.onclick = async function() {
        
            var name = document.getElementById("NameInput").value;
            var price = document.getElementById("PriceInput").value;
            var colour = document.getElementById("ColourInput").value +"60";

            const g = Guest(tourType._id,name,price,colour);
            
            var putGuest = await edit("Guest", guest._id, g);
           
            if(putGuest=="Success"){
                var err = document.getElementById("Errors");
                err.className="Success";
                err.innerHTML="Guest Edited!";
                setTimeout(function () {
                    err.className="SuccessDone";
                }, 1000);
            }
            else{
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="Error";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
        
        }
    }
    else{
       
        var newGuestBut = createBut("","","Add Guest","butBit");
        newGuestBut.onclick = async function() {
            
            var name = document.getElementById("NameInput").value;
            var opacity = document.getElementById("OpacityInput").value;
            var colour = document.getElementById("ColourInput").value + opacity;
            var price =0;
            if( document.getElementById("PriceInput")!=null){
                price = document.getElementById("PriceInput").value
            }
            const g = Guest(tourType._id,name,price,colour);
           
            var putGuest = await store("Guest",g);
    
            if(putGuest=="Success"){
                var err = document.getElementById("Errors");
                err.className="Success";
                err.innerHTML="Guest Added!";
                setTimeout(function () {
                    err.className="SuccessDone";
                }, 1000);
            }
            else{
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="Error";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            
        }
    }
  
    

}

async function addBookingPlatformToTourType(tourType, bookingPlatform){

    clearMain("AddBookingPlatformToTourType", "FaderIn");
    
    createDiv("hed", "Center", "", "AddBookingPlatformToTourType");
    
    createDiv("", "Heading", "Add Booking Platform to "+tourType.Time +" "+tourType.Name, "hed");

    createDiv("", "PadderTop", "", "AddBookingPlatformToTourType");
    createDiv("", "PadderTop", "", "AddBookingPlatformToTourType");

    createDiv("bookingPlatformInfo", "Center", "", "AddBookingPlatformToTourType");
    
    createDiv("Lables", "Vertical", "", "bookingPlatformInfo");
    createDiv("", "PadderLeft", "", "bookingPlatformInfo");
    createDiv("Inputs", "Vertical", "", "bookingPlatformInfo");

    createDiv("", "", "Name: ", "Lables");
    createInput("NameInput", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "", "MarketingFee %: ", "Lables");
    createInput("MarketingFeeInput", "", "number", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");


    createDiv("", "", "Colour: ", "Lables");
    createInput("ColourInput", "", "color", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "", "Opacity:", "Lables");
    createInput("OpacityInput", "", "number", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    document.getElementById("OpacityInput").value =60;
    document.getElementById("OpacityInput").setAttribute('max','99');
    document.getElementById("OpacityInput").setAttribute('min','1');

    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "", "Colour Output:", "Lables");
    createDiv("ColourOutput","","","Inputs");
    document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:black";
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

   

    createDiv("", "PadderTop", "", "bookingPlatformInfo");
    createDiv("", "PadderTop", "", "bookingPlatformInfo");
    
    

    document.getElementById("OpacityInput").onchange = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
      
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };
    document.getElementById("ColourInput").oninput = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
    
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };

    createDiv("Errors", "", "", "AddBookingPlatformToTourType");

    createDiv("", "PadderTop", "", "AddBookingPlatformToTourType");
    createDiv("", "PadderTop", "", "AddBookingPlatformToTourType");
    createDiv("butBit", "Center", "", "AddBookingPlatformToTourType");
  
    if(bookingPlatform!=null){
        document.getElementById("NameInput").value = bookingPlatform.Name;
        document.getElementById("MarketingFeeInput").value = bookingPlatform.MarketingFee;
        document.getElementById("ColourInput").value = bookingPlatform.Colour.substring(0,bookingPlatform.Colour.length-2);
        document.getElementById("OpacityInput").value = bookingPlatform.Colour.substring(bookingPlatform.Colour.length-2);
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+bookingPlatform.Colour

        var newbookingPlatformBut = createBut("","","Edit Booking Platform","butBit");
        newbookingPlatformBut.onclick = async function() {
        
            var name = document.getElementById("NameInput").value;
            var marketingFee = document.getElementById("MarketingFeeInput").value;
            var opacity = document.getElementById("OpacityInput").value;
            var colour = document.getElementById("ColourInput").value + opacity;

            const b = {Name:name, MarketingFee:marketingFee ,Colour:colour};
            
            var result = await edit("BookingPlatform", bookingPlatform._id, b);
           console.log(result);
            if(result=="Success"){
                var err = document.getElementById("Errors");
                err.className="Success";
                err.innerHTML="Booking Platform Edited!";
                setTimeout(function () {
                    err.className="SuccessDone";
                }, 1000);
            }
            else{
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="Error";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
        }
    }
    else{
        var newGuestBut = createBut("","","Add Booking Platform","butBit");
        newGuestBut.onclick = async function() {
            
            var name = document.getElementById("NameInput").value;
            var marketingFee = document.getElementById("MarketingFeeInput").value;
            var colour = document.getElementById("ColourInput").value +"60";
    
            const b = {TourTypeId:tourType._id ,Name:name, MarketingFee:marketingFee, Colour:colour};
          
            var putGuest = await store("BookingPlatform",b);
    
            if(putGuest=="Success"){
                var err = document.getElementById("Errors");
                err.className="Success";
                err.innerHTML="Booking Platform Added!";
                setTimeout(function () {
                    err.className="SuccessDone";
                }, 1000);
            }
            else{
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="Error";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            
        }
    }
    

}

function addPaymentStructure(i,paymentStructure){

    var show = i+1;
   
    createDiv("", "", "Component  ", "PaymentLables");
    createDiv("", "", "Number "+show+"","PaymentInputs");

    createDiv("", "PadderTop", "", "PaymentLables");
    createDiv("", "PadderTop", "","PaymentInputs");

    if(i>0){
        createDiv("", "formInfo", "Change At: ", "PaymentLables");
        createInput("ChangeInput"+i, "", "number", "","PaymentInputs");
        createDiv("", "PadderTop", "", "PaymentLables");
        createDiv("", "PadderTop", "","PaymentInputs");
    
    }
   
    createDiv("", "formInfo", "Base: ", "PaymentLables");
    createInput("BaseInput"+i, "", "number", "","PaymentInputs");
    createDiv("", "PadderTop", "", "PaymentLables");
    createDiv("", "PadderTop", "","PaymentInputs");

    createDiv("", "formInfo", "Per Head: ", "PaymentLables");
    createInput("PerHeadInput"+i, "", "number", "","PaymentInputs");
    createDiv("", "PadderTop", "", "PaymentLables");
    createDiv("", "PadderTop", "","PaymentInputs");

    createDiv("", "PadderTop", "", "PaymentLables");
    createDiv("", "PadderTop", "","PaymentInputs");
    createDiv("", "PadderTop", "", "PaymentLables");
    createDiv("", "PadderTop", "","PaymentInputs");

    if(paymentStructure!=null){
        
        if(i>0){ 
            document.getElementById("ChangeInput"+i).value = paymentStructure.ChangeAt;
        }
        document.getElementById("BaseInput"+i).value = paymentStructure.Base;
        document.getElementById("PerHeadInput"+i).value = paymentStructure.PerHead;

    }
   
}

function makeNewTourTypePage(tourType,paymentStructures){
   
    clearMain("makeTourTypesPage", "FaderIn");
    createDiv("hed", "Center", "", "makeTourTypesPage");

    createDiv("", "Heading", "Make New Tour", "hed");

    createDiv("", "PadderTop", "", "makeTourTypesPage");
    createDiv("", "PadderTop", "", "makeTourTypesPage");

    createDiv("tourInfo", "Center", "", "makeTourTypesPage");
    
    createDiv("Lables", "Vertical", "", "tourInfo");
    createDiv("", "PadderLeft", "", "tourInfo");
    createDiv("Inputs", "Vertical", "", "tourInfo");

    createDiv("", "", "Name: ", "Lables");
    createInput("NameInput", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "", "Time: ", "Lables");
    createInput("TimeInput", "", "time", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "", "Colour: ", "Lables");
    createInput("ColourInput", "", "color", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "", "Opacity:", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    createInput("OpacityInput", "", "number", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    document.getElementById("OpacityInput").value =60;
    document.getElementById("OpacityInput").setAttribute('max','99');
    document.getElementById("OpacityInput").setAttribute('min','1');
   
    // createDiv("", "PadderTop", "", "Inputs");
    
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "", "Colour Output:", "Lables");
    createDiv("ColourOutput","","","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:black"
    createDiv("", "", "Free Tour: ", "Lables");
   
   
    var check = createInput("FreeTourInput", "", "checkbox", "","Inputs");
    check.onchange = function(){
        if(check.checked == true){
            document.getElementById("PaymnetInfo").innerHTML="";
            document.getElementById("paymentStructureButBit").style="display:none";

            createDiv("PaymentLables", "Vertical", "", "PaymnetInfo");
            createDiv("", "PadderLeft", "", "PaymnetInfo");
            createDiv("PaymentInputs", "Vertical", "", "PaymnetInfo");

            createDiv("", "formInfo", "Price per Head: ", "PaymentLables");
            createInput("PricePerHeadInput", "", "number", "","PaymentInputs");
            createDiv("", "PadderTop", "", "PaymentLables");
            createDiv("", "PadderTop", "","PaymentInputs");
            
        }
        else{
            document.getElementById("PaymnetInfo").innerHTML="";

            createDiv("PaymentLables", "Vertical", "", "PaymnetInfo");
            createDiv("", "PadderLeft", "", "PaymnetInfo");
            createDiv("PaymentInputs", "Vertical", "", "PaymnetInfo");

            addPaymentStructure(0);
            document.getElementById("paymentStructureButBit").style="display:center";
        }
    }
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("PaymnetInfo", "Center", "", "makeTourTypesPage");
    
    createDiv("PaymentLables", "Vertical", "", "PaymnetInfo");
    createDiv("", "PadderLeft", "", "PaymnetInfo");
    createDiv("PaymentInputs", "Vertical", "", "PaymnetInfo");
    var index =0;
    if(paymentStructures==null){
        addPaymentStructure(index);
    }
   

    createDiv("paymentStructureButBit", "Center", "", "makeTourTypesPage");
    var paymentStructureBut = createBut("","","Add Payment Component","paymentStructureButBit");
    paymentStructureBut.onclick = function(){
        index++;
        addPaymentStructure(index);
    }


    // createDiv("", "PadderTop", "", "makeTourTypesPage");
    // createDiv("", "PadderTop", "", "makeTourTypesPage");

     createDiv("", "PadderTop", "", "makeTourTypesPage");
     createDiv("", "PadderTop", "", "makeTourTypesPage");
    
    

    document.getElementById("OpacityInput").onchange = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
    
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };
    document.getElementById("ColourInput").oninput = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
        
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };

   
    createDiv("Errors", "", "", "makeTourTypesPage");

    createDiv("", "PadderTop", "", "makeTourTypesPage");
    createDiv("", "PadderTop", "", "makeTourTypesPage");

    createDiv("butBit", "Center", "", "makeTourTypesPage");

    if(tourType!=null){
       
        document.getElementById("NameInput").value = tourType.Name;
        document.getElementById("TimeInput").value = tourType.Time;
        if(tourType.Free=="true"){
            document.getElementById("FreeTourInput").checked=true;
            
        }
        else{
            document.getElementById("FreeTourInput").checked=false;
        }
        
        document.getElementById("ColourInput").value = tourType.Colour.substring(0,tourType.Colour.length-2);
        document.getElementById("OpacityInput").value = tourType.Colour.substring(tourType.Colour.length-2);
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+tourType.Colour
       

        if(paymentStructures.length>0){
          
            if(tourType.Free=="true"){
                
                document.getElementById("PaymnetInfo").innerHTML="";
                document.getElementById("paymentStructureButBit").style="display:none";

                createDiv("PaymentLables", "Vertical", "", "PaymnetInfo");
                createDiv("", "PadderLeft", "", "PaymnetInfo");
                createDiv("PaymentInputs", "Vertical", "", "PaymnetInfo");

                createDiv("", "formInfo", "Price per Head: ", "PaymentLables");
                var pph = createInput("PricePerHeadInput", "", "number", "","PaymentInputs");
                
                pph.value = paymentStructures[0].PricePerHead;
                createDiv("", "PadderTop", "", "PaymentLables");
                createDiv("", "PadderTop", "","PaymentInputs");
            }
            else{
                index = 0;
                if(paymentStructures.length==0){
                    addPaymentStructure(0,paymentStructures[0]);
                }
                else{

                    for(let i=0;i<paymentStructures.length;i++){
                        index++;
                        addPaymentStructure(i,paymentStructures[i]);
                    }
                }
                paymentStructureBut.onclick = async function() {
                   
                    addPaymentStructure(index);
                }
                
                
            }
           


            var newTourBut = createBut("","","Edit Tour","butBit");
            newTourBut.onclick = async function() {
                
                var name = document.getElementById("NameInput").value;
                var time = document.getElementById("TimeInput").value;
                var opacity = document.getElementById("OpacityInput").value;
                var colour = document.getElementById("ColourInput").value + opacity;
                var freeCheck = document.getElementById("FreeTourInput");
                var free = false;
                const paymentStructures =[];
                if(freeCheck.checked==true){
                    free=true;
                    pricePerHead = document.getElementById("PricePerHeadInput").value;
                    const component = {PricePerHead:pricePerHead};
                    paymentStructures.push(component);
                }
                else{
                    for(let i =0;i<=index;i++){
                        var base = 0;
                        var changeAt = 0;
                        var perHead = 0;
                        try{
                            if(i!=0){
                                changeAt = document.getElementById("ChangeInput"+i).value;
                            }
                            base = document.getElementById("BaseInput"+i).value;
                            
                            perHead = document.getElementById("PerHeadInput"+i).value;
                            if(i>0){
                                if(changeAt>0 && base>0 && perHead>0){
                                    const component = {Base:base, ChangeAt:changeAt,PerHead:perHead};
                                    paymentStructures.push(component);
                                }
                            }
                            else{
                                if(base>0 && perHead>0){
                                    const component = {Base:base, ChangeAt:changeAt,PerHead:perHead};
                                    paymentStructures.push(component);
                                }
                            }
                        }
                        catch{

                        }
                        

                        
                    }
                    
                }
              
                const t = {
                    Name:name,Time:time,
                    Colour:colour,
                    Free:free,
                    PaymentStructures:paymentStructures
                };
                if(paymentStructures.length>0){
                    var putTour = await edit("TourType",tourType._id,t);
                    if(putTour=="Success"){
                        var err = document.getElementById("Errors");
                        err.className="Success";
                        err.innerHTML="Tour Edited!";
                        setTimeout(function () {
                            err.className="SuccessDone";
                        }, 1000);
                    }
                    else{
                        var err = document.getElementById("Errors");
                        err.className="Error";
                        err.innerHTML="";
                        err.innerHTML="Error";
                        setTimeout(function () {
                            err.className="ErrorDone";
                        }, 1000);
                    }
                }
                else{
                    var err = document.getElementById("Errors");
                    err.className="Error";
                    err.innerHTML="";
                    err.innerHTML="Error";
                    setTimeout(function () {
                        err.className="ErrorDone";
                    }, 1000);
                }
               
                
            }
        
        }
    }
    else{
        var newTourBut = createBut("newTourBut","","Add Tour","butBit");
        newTourBut.onclick = async function() {
           
            var name = document.getElementById("NameInput").value;
            var time = document.getElementById("TimeInput").value;
            var freeCheck = document.getElementById("FreeTourInput");
            var colour = document.getElementById("ColourInput").value +"60";
            
            var free = false;
            const paymentStructures =[];
            if(freeCheck.checked==true){
                free=true;
                pricePerHead = document.getElementById("PricePerHeadInput").value;
                if(pricePerHead!=null){
                    const component = {PricePerHead:pricePerHead};
                    paymentStructures.push(component);
                }
               
            }
            else{
               
                for(let i =0;i<=index;i++){
                    var base = 0;
                    var changeAt = 0;
                    var perHead = 0;
                    if(i!=0){
                        changeAt = document.getElementById("ChangeInput"+i).value;
                    }
                    base = document.getElementById("BaseInput"+i).value;
                    
                    perHead = document.getElementById("PerHeadInput"+i).value;
                    if(i>0){
                        if(changeAt>0 && base>0 && perHead>0){
                            const component = {Base:base, ChangeAt:changeAt,PerHead:perHead};
                            paymentStructures.push(component);
                        }
                    }
                    else{
                        if(base>0 && perHead>0){
                            const component = {Base:base, ChangeAt:changeAt,PerHead:perHead};
                            paymentStructures.push(component);
                        }
                    }
                    // const component = {Base:base, ChangeAt:changeAt,PerHead:perHead};
                    // paymentStructures.push(component);
                }
            }

            const t = {Name:name,
                        Time:time,
                        Free:free,
                        Colour:colour,
                        PaymentStructures:paymentStructures
                    };
            if(paymentStructures.length>0){
                var putTour = await store("TourType",t);

            
                if(putTour=="Success"){
                    var err = document.getElementById("Errors");
                    err.className="Success";
                    err.innerHTML="Tour Created!";
                    setTimeout(function () {
                        err.className="SuccessDone";
                    }, 1000);
                }
                else{
                    var err = document.getElementById("Errors");
                    err.className="Error";
                    err.innerHTML="";
                    err.innerHTML="Error";
                    setTimeout(function () {
                        err.className="ErrorDone";
                    }, 1000);
                }
            }
            else{
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="Error";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            
            
            
        }
    }
    
}

async function editGuestBut(guest,i,tourType){

    
    var guestBox = document.getElementById("CenterGuests"+i);
    guestBox.innerHTML="";
    guestBox.style ='background-color: '+tourType.Colour+';'
    createDiv("GuestsName"+i+guest.Name, "", guest.Name, "CenterGuests"+i);

   
    var editBut = createBut("editBut","WideFit","Edit "+guest.Name,"CenterGuests"+i);
    editBut.onclick = async function(){
        
        var g = await get("Guest",guest._id);
        addGuestsToTourType(tourType,g);
    }

    var removeBut = createBut("editBut","WideFit","Remove "+guest.Name,"CenterGuests"+i);
    removeBut.onclick = async function(){
       
        guestBox.innerHTML="";
     
        createDiv("","","Are you sure?","CenterGuests"+i);

        var yesBut = createBut("yesBut","WideFit","Yes","CenterGuests"+i);
        yesBut.onclick = async function(){
           
            var result = await remove("Guest",guest);

            if(result=="Success"){
                makeTourTypesPage();
            }
            else{
                var guestBox = document.getElementById("CenterGuests"+i);
                guestBox.innerHTML="";
                guestBox.style ='background-color: '+tourType.Colour+';'
                createDiv("GuestsName"+i+guest.Name, "", guest.Name, "CenterGuests"+i);
            
                createDiv("editBut","WideFit","Error Deleting "+guest.Name,"CenterGuests"+i);

            }
        }
        
        var cancelBut = createBut("cancelBut","WideFit","Cancel","CenterGuests"+i);
        cancelBut.onclick = function(){
       
            makeTourTypesPage();
       
        }
       
        

    }

    var cancelBut = createBut("cancelBut","WideFit","Cancel","CenterGuests"+i);
    cancelBut.onclick = function(){
        makeTourTypesPage();
    }

}

async function editTOurTypeBut(tourType,i){

   
    var tourBox = document.getElementById("TourType"+i);
    
    tourBox.innerHTML="";
    tourBox.style ='background-color: '+tourType.Colour+';'
    

   
    var editBut = createBut("editBut","WideFit","Edit "+tourType.Time+" "+tourType.Name,"TourType"+i);
    editBut.onclick = async function(){
            var paymentStructures = await get("PaymentStructures",tourType._id);
            makeNewTourTypePage(tourType,paymentStructures);
    }

    var removeBut = createBut("editBut","WideFit","Remove "+tourType.Time+" "+tourType.Name,"TourType"+i);
    removeBut.onclick = async function(){
       
        tourBox.innerHTML="";
     
        createDiv("","","Are you sure?","TourType"+i);

        var yesBut = createBut("yesBut","WideFit","Yes","TourType"+i);
        yesBut.onclick = async function(){
            var result = await remove("TourType",tourType);

            if(result=="Success"){
                 makeTourTypesPage();
            }
            else{
                 var guestBox = document.getElementById("TourType"+i);
                 guestBox.innerHTML="";
                 guestBox.style ='background-color: '+tourType.Colour+';'
                 createDiv("TourType"+i+tourType.Name, "", tourType.Time+" "+tourType.Name, "TourType"+i);
             
                 createDiv("editBut","WideFit","Error Deleting "+ tourType.Time+" "+tourType.Name,"TourType"+i);
     
            }
        }
        
        var cancelBut = createBut("cancelBut","WideFit","Cancel","TourType"+i);
        cancelBut.onclick = function(){
       
            makeTourTypesPage();
       
        }
        

    }

    var cancelBut = createBut("cancelBut","WideFit","Cancel","TourType"+i);
    cancelBut.onclick = function(){
       
        makeTourTypesPage();
       
    }

}

async function editBookingPlatform(bookingPlatform,i,tourType){
    
    var guestBox = document.getElementById("CenterBookingPlatforms"+i);
    guestBox.innerHTML="";
    guestBox.style ='background-color: '+tourType.Colour+';'
    createDiv("GuestsName"+i+bookingPlatform.Name, "", bookingPlatform.Name, "CenterBookingPlatforms"+i);

   
    var editBut = createBut("editBut","WideFit","Edit "+bookingPlatform.Name,"CenterBookingPlatforms"+i);
    editBut.onclick = async function(){
        
        var b = await get("BookingPlatform",bookingPlatform._id);
        
        addBookingPlatformToTourType(tourType,b)
       
    }

    var removeBut = createBut("editBut","WideFit","Remove "+bookingPlatform.Name,"CenterBookingPlatforms"+i);
    removeBut.onclick = async function(){
      
        guestBox.innerHTML="";
        createDiv("","","Are you sure?","CenterBookingPlatforms"+i);
       var yesBut = createBut("yesBut","WideFit","Yes","CenterBookingPlatforms"+i);
       yesBut.onclick = async function(){
          
            var result = await remove("BookingPlatform",bookingPlatform);
            
            if(result=="Success"){
                makeTourTypesPage();
            }
            else{
            var bookingPlatformBox = document.getElementById("CenterBookingPlatforms"+i);
            bookingPlatformBox.innerHTML="";
            bookingPlatformBox.style ='background-color: '+tourType.Colour+';'
            createDiv("GuestsName"+i+bookingPlatform.Name, "", bookingPlatform.Name, "CenterBookingPlatforms"+i);
            
            createDiv("editBut","WideFit","Error Deleting "+bookingPlatform.Name,"CenterBookingPlatforms"+i);
    
            }
       }
       
       var cancelBut = createBut("cancelBut","WideFit","Cancel","CenterBookingPlatforms"+i);
       cancelBut.onclick = function(){
      
           makeTourTypesPage();
      
       }

    }

    var cancelBut = createBut("cancelBut","WideFit","Cancel","CenterBookingPlatforms"+i);
    cancelBut.onclick = function(){
        makeTourTypesPage();
    }
}

async function makeTourTypesPage(){
    
    clearMain("TourTypesPage", "FaderIn");
    createDiv("hed", "Center", "", "TourTypesPage");
    
    createDiv("", "Heading", "Tours", "hed");
    
    createDiv("", "PadderTop", "", "TourTypesPage");
    createDiv("", "PadderTop", "", "TourTypesPage");

    createDiv("", "PadderTop", "", "TourTypesPage");
    createDiv("", "PadderTop", "", "TourTypesPage");

    createDiv("butBit", "Center", "", "TourTypesPage");

    var makeTourTypeBut = createBut("","","Make New Tour","butBit");
    makeTourTypeBut.onclick = function(){
        makeNewTourTypePage(null,null);
    }

    createDiv("", "PadderTop", "", "TourTypesPage");
    createDiv("", "PadderTop", "", "TourTypesPage");

    var tourTypes = await get("TourTypes");

    for(let i=0;i<tourTypes.length;i++){
        
        createDiv("CenterTour"+i, "Center", "", "TourTypesPage");
       

        //createDiv("CenterAddOns"+i, "CenterEven", "","CenterTour"+i);
        
        createDiv("CenterGuests"+i, "TourBox", "", "CenterTour"+i);
        createDiv("Guests"+i, "", "", "CenterGuests"+i);
        document.getElementById("Guests"+i).style = 'background-color: '+tourTypes[i].Colour+';'
        
        createDiv("GuestsName"+i, "", "Guests", "Guests"+i);
        document.getElementById("GuestsName"+i).onclick = function(){
           
                addGuestsToTourType(tourTypes[i],null);
        }

        var guests = await get("Guests",tourTypes[i]._id);
        for(let g = 0;g<guests.length;g++){
           
            createDiv("GuestsName"+i+guests[g].Name, "", guests[g].Name, "CenterGuests"+i);
            document.getElementById("GuestsName"+i+guests[g].Name).style = 'background-color:'+guests[g].Colour+';'
            let guest = guests[g];
          
            document.getElementById("GuestsName"+i+guests[g].Name).onclick = function(){
                
                editGuestBut(guest,i,tourTypes[i]);
            }
        }

        createDiv("GuestLineBox"+i,"LineBox","","CenterTour"+i);

        createDiv("TourType"+i, "TourBox", "", "CenterTour"+i);
       
        document.getElementById("TourType"+i).onclick = function(){
           
            editTOurTypeBut(tourTypes[i],i);
            document.getElementById("TourType"+i).onclick = function(){}

        }
        createDiv(tourTypes[i].Time+i, "", tourTypes[i].Time, "TourType"+i);
       
        document.getElementById("TourType"+i).style = 'background-color: '+tourTypes[i].Colour+';'
        createDiv(tourTypes[i].Name+i, "", tourTypes[i].Name, "TourType"+i);

        createDiv("GuestLineBox"+i,"LineBox","","CenterTour"+i);

        createDiv("CenterBookingPlatforms"+i, "TourBox", "", "CenterTour"+i);
        createDiv("BookingPlatforms"+i, "", "", "CenterBookingPlatforms"+i);
        document.getElementById("BookingPlatforms"+i).style = 'background-color: '+tourTypes[i].Colour+';'
        
        createDiv("BookingPlatformsName"+i, "", "Platforms", "BookingPlatforms"+i);
        document.getElementById("BookingPlatformsName"+i).onclick = function(){
            addBookingPlatformToTourType(tourTypes[i],null);
        }

        var BookingPlatforms = await get("BookingPlatforms",tourTypes[i]._id);
        for(let b = 0;b<BookingPlatforms.length;b++){

            let BookingPlatform = BookingPlatforms[b];
            createDiv("BookingPlatformsName"+i+BookingPlatforms[b].Name, "", BookingPlatforms[b].Name, "CenterBookingPlatforms"+i);
            document.getElementById("BookingPlatformsName"+i+BookingPlatforms[b].Name).style = 'background-color: '+BookingPlatforms[b].Colour+';'
            document.getElementById("BookingPlatformsName"+i+BookingPlatforms[b].Name).onclick = function(){

                editBookingPlatform(BookingPlatform,i,tourTypes[i]);
            }
        }

        createDiv("", "PadderTop", "", "TourTypesPage");
        createDiv("", "PadderTop", "", "TourTypesPage");
        createDiv("", "PadderTop", "", "TourTypesPage");
        createDiv("", "PadderTop", "", "TourTypesPage");
        createDiv("", "PadderTop", "", "TourTypesPage");
        createDiv("", "PadderTop", "", "TourTypesPage");
    }

    

    
}

async function registerGuidePage(){
    
    clearMain("registerGuidePage", "FaderIn");

    createDiv("centerGuide", "Center", "", "registerGuidePage");

    createDiv("Lables", "Vertical", "", "centerGuide");
    createDiv("", "PadderLeft", "", "centerGuide");
    createDiv("Inputs", "Vertical", "", "centerGuide");

    createDiv("", "TextHeight", "Full Name:", "Lables");
    createInput("FullName", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "Email:", "Lables");
    createInput("Email", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "User Name:", "Lables");
    createInput("UserName", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "Password:", "Lables");
    createInput("Password", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "Retype Password:", "Lables");
    createInput("RetypePassword", "", "text", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "TextHeight", "Colour:", "Lables");
    createInput("ColourInput", "", "color", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");

    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "TextHeight", "Opacity:", "Lables");
    createInput("OpacityInput", "", "number", "","Inputs");
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    document.getElementById("OpacityInput").value =60;
    document.getElementById("OpacityInput").setAttribute('max','99');
    document.getElementById("OpacityInput").setAttribute('min','1');

    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "TextHeight", "Colour Output:", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    createDiv("ColourOutput","","","Inputs");
    
    createDiv("", "PadderTop", "", "Lables");
    createDiv("", "PadderTop", "","Inputs");
    document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:black"
   

    createDiv("", "PadderTop", "", "registerGuidePage");
    createDiv("", "PadderTop", "", "registerGuidePage");
    
    

    document.getElementById("OpacityInput").onchange = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
      
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };
    document.getElementById("ColourInput").oninput = function(){
        var opacity = document.getElementById("OpacityInput").value;
        var colour = document.getElementById("ColourInput").value +opacity;
    
        document.getElementById("ColourOutput").style = "width:60px; height: 20px;background-color:"+colour
    };
    createDiv("", "PadderTop", "", "registerGuidePage");
    createDiv("", "PadderTop", "", "registerGuidePage");

    createDiv("Errors", "", "", "registerGuidePage");

    createDiv("", "PadderTop", "", "registerGuidePage");
    createDiv("", "PadderTop", "", "registerGuidePage");
    createDiv("butBit", "Center", "", "registerGuidePage");
  
    var registerBut = createBut("","","Register","butBit");
    registerBut.onclick = async function(){
        var fullName = document.getElementById("FullName").value;
        var password = document.getElementById("Password").value;
        var retypePassword = document.getElementById("RetypePassword").value;
        var email = document.getElementById("Email").value;
        var opacity = document.getElementById("OpacityInput").value;
        var userName = document.getElementById("UserName").value;
        var colour = document.getElementById("ColourInput").value +opacity;
    
          
        if(password.toString()==retypePassword.toString()){
            const guide = Guide(fullName,userName,email,password,colour);

            if(fullName==""){
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="No Full Name";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
               
            }
            else if(email==""){
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="No Email";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            else if(userName==""){
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="No User Name";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            else if(password==""){
                var err = document.getElementById("Errors");
                err.className="Error";
                err.innerHTML="";
                err.innerHTML="No Password";
                setTimeout(function () {
                    err.className="ErrorDone";
                }, 1000);
            }
            else{
                var reg = await store("Guide",guide);
               
                if(reg=="Email Address in Use"){
                    var err = document.getElementById("Errors");
                    err.className="Error";
                    err.innerHTML="";
                    err.innerHTML=reg;
                    setTimeout(function () {
                        err.className="ErrorDone";
                    }, 1000);
                }
                if(reg=="User Name in Use"){
                    var err = document.getElementById("Errors");
                    err.className="Error";
                    err.innerHTML="";
                    err.innerHTML=reg;
                    setTimeout(function () {
                        err.className="ErrorDone";
                    }, 1000);
                }
                else{
                    fullName="";
                    email="";
                    userName="";
                    password="";
                    var err = document.getElementById("Errors");
                    err.className="Success";
                    err.innerHTML="Guide Registered!";
                    setTimeout(function () {
                        err.className="SuccessDone";
                    }, 1000);
                }
            }
        }
        else{
            var err = document.getElementById("Errors");
            err.className="Error";
            err.innerHTML="";
            err.innerHTML="Passwords do not match";
            setTimeout(function () {
                err.className="ErrorDone";
            }, 1000);
        }
    }
       
}
    





