// const { MongoClient } = require('mongodb');
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const path = require('path');
const db = require('../Node/static/Db.js');
const bcrypt = require("bcrypt");
var bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 



//const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(sessions({
    // secret: encrypt("startSesh"),
	secret: "RGH54TYHdfgefre2y88vddf89ghjkopdcvsq1234bkdfytsbdcrwvd6wgd6tqfvdei53",
    saveUninitialized:false,
	cookie: {
		httpOnly: true,
		secure: true,
		sameSite: true,
		authorised:false
	},
    resave: false
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));



app.use(cookieParser());


var session;

//db.dbSeed();

app.get('/', async (req,res) => {
	console.log("get")
	if(session == null){
		
		
		res.sendFile(path.join(__dirname + '/login.html'));
	}
	else{
		// var user = await db.getUser(session.userid);
		// console.log(user)
		// if(user!=null){
			
		// 	session=req.session;
		// 	session.userid=user._id;
		// 	session.cookie.authorised=true;
		// 	res.sendFile(path.join(__dirname + '/Main.html'));

		// }
		// else{
		 	res.sendFile(path.join(__dirname + '/login.html'));
			
		// }
	}
	
    
});

app.post('/',async (req,res) => {
    
	
	var user = await db.login(req.body.username,req.body.password);
	if(user!=null){

		
		session=req.session;
		session.userid=user._id;
		session.userRole=user.Role;
		session.cookie.authorised=true;
		
		res.sendFile(path.join(__dirname + '/Main.html'));
		
		
	
	}
    else{
		console.log("user")
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
})

app.get('/getSession',async (req,res) => {
	
	var user = await db.getUser(session.userid);

	var send = {Id:user._id,Name:user.UserName, Role:user.Role}
	res.jsonp({
		data:send
		})
});

app.get('/logout',(req,res) => {
    
	
	session=null;
    res.jsonp({
		data:""
		})
});

app.get('/logoutFromUserEdit',(req,res) => {
    
	
	session=null;
	res.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/getUser',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var user = await db.getUser(session.userid);
			var send ={
				FullName:user.FullName,
				UserName:user.UserName,
				Email:user.Email,
				Colour:user.Colour,
				
			};
			res.jsonp({
				data:send
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
	
	
});

app.post('/getTicket',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var tix = await db.getTicket();
			
			res.jsonp({
				data:tix
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
	
	
});

app.post('/getGuides',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var guides = await db.getGuides();
		
			res.jsonp({
				data:guides
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
	
	
});

app.post('/getGuests',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var guests = await db.getGuests(req.body.Id);
			
			res.jsonp({
				data:guests
				})
			}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getDaily',async (req,res) => {
  
	if(session!=null){
		if(session!=null){
			if(session.cookie.authorised==true){
				
				var daily = await db.getDaily(req.body.date);
				
				res.jsonp({
					data:daily
					})
			}
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
	
});

app.post('/getInOuts',async (req,res) => {
  
	if(session!=null){
		if(session.cookie.authorised==true){
			var incomes=""

			if(req.body.User.Role =="Admin"){
				incomes = await db.getInOuts(req.body.startDate,req.body.endDate);
			}
			else if(req.body.User.Role =="Guide"){
				incomes = await db.getUserInOuts(req.body.startDate,req.body.endDate,req.body.User);
			}
			
			
			res.jsonp({
				data:incomes
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});


app.post('/getAllTicketSales',async (req,res) => {
  
	if(session!=null){
		if(session.cookie.authorised==true){
			var allTicketSales = await db.getAllTicketSales(req.body.startDate,req.body.endDate);
			
			res.jsonp({
				data:allTicketSales
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});


app.post('/getIncomes',async (req,res) => {
  
	if(session!=null){
		if(session.cookie.authorised==true){
			var incomes = "";
			
			if(req.body.User.Role =="Admin"){
				incomes = await db.getIncomes(req.body.startDate,req.body.endDate);
			}
			else{
				incomes = await db.getUserIncomes(req.body.startDate,req.body.endDate,req.body.User);
			}
			
			
			res.jsonp({
				data:incomes
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getGuideIncomes',async (req,res) => {
  
	if(session!=null){
		if(session.cookie.authorised==true){
			var incomes = await db.getGuideIncomes(req.body.startDate,req.body.endDate);
			
			res.jsonp({
				data:incomes
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getOutGoings',async (req,res) => {
  
	if(session!=null){
		if(session.cookie.authorised==true){
			var outGoings = await db.getOutGoings(req.body.startDate,req.body.endDate);
			
			res.jsonp({
				data:outGoings
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getOutGoingsByBookingPlatform',async (req,res) => {
  
	if(session!=null){
		if(session.cookie.authorised==true){
			var outGoings = await db.getOutGoingsByBookingPlatform(req.body.startDate,req.body.endDate);
			
			res.jsonp({
				data:outGoings
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getOutGoingsByGuide',async (req,res) => {
  
	if(session!=null){
		if(session.cookie.authorised==true){
			var outGoings = await db.getOutGoingsByGuide(req.body.startDate,req.body.endDate);
			
			res.jsonp({
				data:outGoings
				})
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getTicketSales',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var ticketSales = await db.getTicketSales(req.body.Id);
			
			res.jsonp({
				data:ticketSales
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getGuest',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var guest = await db.getGuest(req.body.Id);
			
			res.jsonp({
				data:guest
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getBookingPlatform',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var bookingPlatform = await db.getBookingPlatform(req.body.Id);
			
			res.jsonp({
				data:bookingPlatform
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/editGuest',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var editGuest = await db.editGuest(req.body.Id, req.body.Obj);
			
			res.jsonp({
				data:editGuest
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/editTourType',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var editTourType = await db.editTourType(req.body.Id, req.body.Obj);
			
			res.jsonp({
				data:editTourType
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/editBookingPlatform',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var editBookingPlatform = await db.editBookingPlatform(req.body.Id, req.body.Obj);
			
			res.jsonp({
				data:editBookingPlatform
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/deleteTours',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var editTourType = await db.deleteTours(req.body.Id, req.body.Date);
			
			res.jsonp({
				data:editTourType
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getTourTypes',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var tourTypes = await db.getTourTypes();
			
			res.jsonp({
				data:tourTypes
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getPaymentStructures',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var PaymentStructures = await db.getPaymentStructures(req.body.Id);
			
			res.jsonp({
				data:PaymentStructures
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getTourType',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var tourType = await db.getTourType(req.body.Id);
			
			res.jsonp({
				data:tourType
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/getBookingPlatForms',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var bookingPlatforms = await db.getBookingPlatforms(req.body.Id);
			
			res.jsonp({
				data:bookingPlatforms
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/storeGuide',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var guide = await db.registerGuide(req.body.Obj);
			
			res.jsonp({
				data:guide
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/EditGuide',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var guide = await db.EditGuide(req.body.Obj);
			
			res.jsonp({
				data:guide
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/EditGuideSale',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var guide = await db.EditGuideSale(req.body.Id, req.body.Obj);
			
			res.jsonp({
				data:guide
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/storeGuest',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var guest = await db.addGuestToTourType(req.body.Obj);
			
			res.jsonp({
				data:guest
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
	
});

app.post('/storeTicket',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var tix = await db.storeTicket(req.body.Obj);
			
			res.jsonp({
				data:tix
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/storeTicketSales',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var tix = await db.storeTicketSale(req.body.Obj);
			
			res.jsonp({
				data:tix
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/storeTourType',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var tourType = await db.storeTourType(req.body.Obj);
			
			res.jsonp({
				data:tourType
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/storeBookingPlatform',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var bookingPlatform = await db.storeBookingPlatform(req.body.Obj);
			
			res.jsonp({
				data:bookingPlatform
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/removeGuest',async (req,res) => {
   
	if(session!=null){
		if(session.cookie.authorised==true){
			var guest = await db.removeGuest(req.body.Obj);
			
			res.jsonp({
				data:guest
				})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/removeTourType',async (req,res) => {
   
	if(session!=null){
		if(session.cookie.authorised==true){
			var tourType = await db.removeTourType(req.body.Obj);
			
			res.jsonp({
				data:tourType
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/removeBookingPlatform',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var BookingPlatform = await db.removeBookingPlatform(req.body.Obj);
			
			res.jsonp({
				data:BookingPlatform
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/storeTours',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var result = await db.storeTour(req.body.Obj);
			
			res.jsonp({
				data:result
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.post('/storeGuideSales',async (req,res) => {
    
	if(session!=null){
		if(session.cookie.authorised==true){
			var result = await db.storeGuideSales(req.body.Obj);
			
			res.jsonp({
				data:result
			})
		}
		else{
			res.sendFile(path.join(__dirname + '/login.html'));
			
		}
	}
	else{
		res.sendFile(path.join(__dirname + '/login.html'));
        
    }
});

app.listen(80,  (req,res) => {

	console.log("Listening on 80");

});