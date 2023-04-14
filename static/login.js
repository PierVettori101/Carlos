



function login(){

    var email = document.getElementById("Emailtxt");
    var password = document.getElementById("Passwordtxt");

    $.ajax({
        type: "Get",
        url: "/Login",
        data: { 
            'email': email,
            'password': password,
        },
        dataType: "json",
        success: function (data) {
            if (data == "Error") {
                console.log("Error in getClients return data");
            }
            else {
                console.log(data.data);
                
            }

        },
        error: function (data) {
            console.log("Error in getClients Ajax error");
            console.log(data);
        }
    });

   


}