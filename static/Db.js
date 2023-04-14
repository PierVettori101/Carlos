
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require("bcrypt");

const uri = "mongodb://localhost:27017";
//const uri = "mongodb://162.220.244.184:27017";


const client = new MongoClient(uri);


// const saltRounds = 10;
//var password = "Fkdj^45ci@Jad";

async function registerGuide(guide){
    var result = "";
    try{
        const db = client.db('Carlos');
        const collection = db.collection('Users');
       

        var emailCheck = await collection.findOne( {Email: guide.Email} );
        var userNameCheck = await collection.findOne( {UserName: guide.UserName} );
        if(emailCheck==null && userNameCheck==null){
            
            // THIS IS FOR PASSWORDS LATER
            
            bcrypt.genSalt(10, function(err, salt) {
    
                bcrypt.hash(guide.Password, salt, function(err, hash) {
                    if(err!=null){
                        console.log(err);
                    }
                    else{
                       
                        const g = {UserName:guide.UserName,Password:hash, Role:"Guide", Email:guide.Email.toLowerCase(), FullName:guide.FullName, Colour:guide.Colour};
                       
                        collection.insertOne(g);
                        result="success";
                    } 
                        
                });
            });


                //const g = {UserName:guide.UserName, Role:"Guide", Email:guide.Email, FullName:guide.FullName, Colour:guide.Colour};
                
                // collection.insertOne(g);
                // result="success";
        }
        else if(emailCheck!=null){
            result="Email Address in Use";
        }
        else if(userNameCheck!=null){
            result="User Name in Use";
        }
        
       
    }
    catch(e){
        result="Error";
        console.log(e);
    }
   
    return result;
}

async function editGuide(guide){
    
    var result = "";
    try{
            const db = client.db('Carlos');
            const collection = db.collection('Users');
        

            user = await collection.findOne( {Email: guide.Email.toLowerCase()} )
            
            if(user!=null){
            
            const pass = await bcrypt.compare(guide.OldPassword, user.Password);
           
            if(pass==true){
            
                bcrypt.genSalt(10, function(err, salt) {
    
                    bcrypt.hash(guide.Password, salt, async function(err, hash) {
                        if(err!=null){
                            console.log(err);
                        }
                        else{
                            const filter = { _id: user._id };
            
                            const updateDocument = {
                                $set: {
                                    FullName:guide.FullName,
                                    UserName:guide.UserName,
                                    Email:guide.Email.toLowerCase(),
                                    Password:hash,
                                    Colour:guide.Colour
                                },
                            };
                            const dbResult = await collection.updateOne(filter, updateDocument);
                            // const g = {UserName:guide.UserName,Password:hash, Role:"Guide", Email:guide.Email.toLowerCase(), FullName:guide.FullName, Colour:guide.Colour};
                           
                            // collection.insertOne(g);
                            result="success";
                        } 
                            
                    });
                });
            }
            else{
                result="Error";
            }
        }
    }
    catch(e){
        result="Error";
        console.log(e);
    }
   
    return result;
}

async function storePaymentStructures(structures,tourTypeId){
    var result = "";
        try{
            const db = client.db('Carlos');
            const collection = db.collection('PaymentStructures');
           
            // await collection.deleteMany({TourTypId:tourTypeId});
            await collection.insertMany(structures);
            result = "Success";
        }
        catch(e){
             console.log(e);
             result = "storePaymentStructures Error";
        }
        
       return result;
}

function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

module.exports = {
  
    getGuides: async function () {
       
        var users =[];
        const db = client.db('Carlos');
        const collection = db.collection('Users');
          
        try{
            await collection.find({Role:"Guide"}).forEach(function(result, err) {
              
                const guide = {Name:result.UserName, Id: result._id,Colour:result.Colour}
                users.push(guide);
              
            });	
        }
        catch(e){
            console.log(e);
        }
        //console.log(users);
        return users;
    },

    login: async function (email,password) {
        try{
            var user=null;
            const db = client.db('Carlos');
            const collection = db.collection('Users');

            

            user = await collection.findOne( {Email: email.toLowerCase()} )
           
            if(user!=null){
               
                const pass = await bcrypt.compare(password, user.Password);
                if(pass==true){

                    var send ={
                        _id:user._id,
                        UserName:user.UserName,
                        Role:user.Role,
                        Colour:user.Colour
                    }
                    return send;
                }
                else{
                    return null;
                }
            }
            else{
                return null;
            }
            
           
        }
        catch(e){
            console.log(e);
            
            return null;
        }
        
       
    },

    getTicket: async function(){
        try{
            var tix=null;
            const db = client.db('Carlos');
            const collection = db.collection('Ticket');
            

            tix = await collection.findOne( {} );
            
            return tix;
        }
        catch(e){
            console.log(e);
            
            return tix;
        }
    },

    getUser: async function (id) {
       
        var user=null;
        
        try{
           
            const db = client.db('Carlos');
            const collection = db.collection('Users');
            user = await collection.findOne( {_id: id} )
            
            
        }
        catch(e){
            console.log(e);
            
            
        }
        
        return user;
    },

    getGuest: async function (id) {
        try{
            var guest=null;
            const db = client.db('Carlos');
            const collection = db.collection('Guests');
            var Id = new ObjectId(id);

            guest = await collection.findOne( {_id: Id} )
            
            return guest;
        }
        catch(e){
            console.log(e);
            
            return guest;
        }
    },

    getBookingPlatform: async function (id) {
        try{
            var BookingPlatform=null;
            const db = client.db('Carlos');
            const collection = db.collection('BookingPlatforms');
            var Id = new ObjectId(id);

            BookingPlatform = await collection.findOne( {_id: Id} )
            
            return BookingPlatform;
        }
        catch(e){
            console.log(e);
            
            return BookingPlatform;
        }
    },

    editGuest: async function (id,guest) {
       var result = "";
        try{
           
           
            const db = client.db('Carlos');
            const collection = db.collection('Guests');

            var Id = new ObjectId(id);
           
            const filter = { _id: Id };
           
            const updateDocument = {
                $set: {
                    Name: guest.Name,
                    Price: guest.Price,
                    Colour: guest.Colour,
                },
            };
            const dbResult = await collection.updateOne(filter, updateDocument);


            const filter2 = {Name: guest.Name };
            // update the value of the 'quantity' field to 5
            const updateDocument2 = {
                $set: {
                    Colour: guest.Colour,
                },
            };
            const dbResult2 = await collection.updateMany(filter2, updateDocument2);
            

            if(dbResult2.matchedCount>0 && dbResult.matchedCount===1){
                result = "Success";
            }
            else{
                result = "Failed to Edit";
            }
            return result;
        }
        catch(e){
            console.log(e);
            result = "Error";
            return result;
        }
    },

    EditGuideSale: async function (id,number) {
        var result = "";
         try{
            
            
             const db = client.db('Carlos');
             const collection = db.collection('GuideSales');
 
            
             var Id = new ObjectId(id);
             var oldGuideSale  = await collection.findOne({_id: Id});

            
             const filter = { _id: Id };
            
             const updateDocument = {
                 $set: {
                     Number: parseInt(number)+parseInt(oldGuideSale.Number)
                 },
             };
             const dbResult = await collection.updateOne(filter, updateDocument);
             if(dbResult.modifiedCount==1){
                result="Success";
             };
             return result;
         }
         catch(e){
             console.log(e);
             result = "Error";
             return result;
         }
     },

    editTourType: async function (id,tourType) {
        var result = "";
         try{
            
             const db = client.db('Carlos');
             const collection = db.collection('TourTypes');
          
             var Id = new ObjectId(id);
            
             const filter = { _id: Id };
             // update the value of the 'quantity' field to 5
             const updateDocument = {
                 $set: {
                     Name: tourType.Name,
                     Time: tourType.Time,
                     Colour: tourType.Colour,
                     Free: tourType.Free
                 },
             };

             var structs=[];

             const paymentStructuresDb = db.collection('PaymentStructures');
             await paymentStructuresDb.deleteMany({ "TourTypeId" : Id });

             if(tourType.Free=="false"){
                for(let i =0;i<tourType.PaymentStructures.length;i++){
                    const struct ={
                        TourTypeId: Id, 
                        Base: tourType.PaymentStructures[i].Base, 
                        ChangeAt: tourType.PaymentStructures[i].ChangeAt,
                        PerHead: tourType.PaymentStructures[i].PerHead
                    };
                    structs.push(struct);
                }
            }
            else{

                
                const struct ={
                    TourTypeId:id, 
                    PricePerHead: tourType.PaymentStructures[0].PricePerHead,
                };
                structs.push(struct);
            }
            
             var payStruct = await storePaymentStructures(structs);
             const dbResult = await collection.updateOne(filter, updateDocument);
 

             if(dbResult.matchedCount===1 && payStruct=="Success"){
                 result = "Success";
             }
             else{
                 result = "Failed to Edit";
             }
             return result;
         }
         catch(e){
             console.log(e);
             result = "Error";
             return result;
         }
    },

    editBookingPlatform: async function (id,bookingPlatform) {
        var result = "";
         try{
            
            
             const db = client.db('Carlos');
             const collection = db.collection('BookingPlatforms');
 
             var Id = new ObjectId(id);
            
             const filter = { _id: Id };
             // update the value of the 'quantity' field to 5
             const updateDocument = {
                 $set: {
                     Name: bookingPlatform.Name,
                     MarketingFee:bookingPlatform.MarketingFee,
                     Colour: bookingPlatform.Colour,
                 },
             };
             const dbResult = await collection.updateOne(filter, updateDocument);
 
 
             const filter2 = {Name: bookingPlatform.Name };
             // update the value of the 'quantity' field to 5
             const updateDocument2 = {
                 $set: {
                     Colour: bookingPlatform.Colour,
                 },
             };
             const dbResult2 = await collection.updateMany(filter2, updateDocument2);
             
 
             if(dbResult2.matchedCount>0 && dbResult.matchedCount===1){
                 result = "Success";
             }
             else{
                 result = "Failed to Edit BookingPlatform";
             }
             return result;
         }
         catch(e){
             console.log(e);
             result = "Error";
             return result;
         }
    },

    getGuests: async function(TourTypeId){
      
        var guests =[];
        const db = client.db('Carlos');
        const collection = db.collection('Guests');
      
        try{
            //var id = new ObjectId(TourTypeId);
           
            await collection.find({TourTypeId:TourTypeId.toString()}).forEach(function(result, err) {
                
                guests.push(result);
              
            });	

         
        }
        catch(e){
            console.log(e);
        }
        //console.log(users);
        return guests;

    },

    getTicketSales: async function(date){
       
        const db = client.db('Carlos');
        const collection = db.collection('TicketSales');
        var ticketSales=0;
        try{
           
           
            // var dat ="" ;
            
            // if(date==null|| date==""){
            //     dat = new Date();
            //     dat.setHours(0,0,0,0);
               
                
            // }
            // else{

            //     dat = new Date(date);
            //     dat.setHours(0,0,0,0);
            // }

            
           var storedTic = await collection.findOne({Date:date});
           if(storedTic!=null){
                ticketSales =storedTic.Number;
           }
          
        }
        catch(e){
            console.log(e);
        }
        //console.log(users);
        return ticketSales;
    },

    getDaily: async function(date){

      
        var dailies =[];
        try{
            var dat ="" ;
            
            if(date==null|| date==""){
                dat = new Date();
                dat.setHours(0,0,0,0);
               
                
            }
            else{

                dat = new Date(date);
                dat.setHours(0,0,0,0);
            }

            const db = client.db('Carlos');

            const tours = [];
            
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
                var d = new Date(tour.Date);
                d.setHours(0,0,0,0);
                
                 if(d.toDateString() == dat.toDateString()){
                     tours.push(tour);
                 }  
            });	

            const guideSales = [];
            
            await db.collection('GuideSales').find({}).forEach(function(guideSale, err) {
            
                var d = new Date(guideSale.Date);
                d.setHours(0,0,0,0);
                
                 if(d <= dat && d>=dat){
                    
                    guideSales.push(guideSale);
                 }  
            });	
            
            const tourTypes = []

            await db.collection('TourTypes').find({}).forEach(async function(tourType, err) {
                tourTypes.push(tourType);
            });	

            const BookingPlatforms = []

            await db.collection('BookingPlatforms').find({}).forEach(async function(bookingPlatform, err) {
                BookingPlatforms.push(bookingPlatform);
            });	

            const guides = []

            await db.collection('Users').find({}).forEach(async function(guide, err) {
                
             
                if(guide.Role=="Guide"){
                    guides.push(guide);
                }
                
            });	

            const guests = []
            await  db.collection('Guests').find({}).forEach(async function(guest, err,) {
                guests.push(guest);
                
            });	
            
            tourTypes.forEach(tourType => {
                
                var guideSaaaales=[];
                var pax = 0;
                tours.forEach(t => {
                    if(t.TourTypeId==tourType._id.toString()){
                        pax = pax +parseInt(t.Number);

                    }
                });

                const daily = {
                    tourType:tourType.Time + " "+ tourType.Name,
                    Guests:[],
                    Guides:[],
                    BookingPlatforms:[],
                    GuideSales:[],
                    Pax:pax,
                    Colour:tourType.Colour,
                    tourTypeId:tourType._id
                };

                
                guideSales.forEach(guideSale => {
                    
                    if(parseInt(guideSale.Number)>0){
                        
                    }
                    if(tourType._id.toString()== guideSale.TourTypeId){
                        
                        var guideName="";
                        var guideId="";
                        guides.forEach(guide => {

                            if(guideSale.GuideId== guide._id.toString()){
                                guideName=guide.UserName;
                                guideId=guide._id.toString();
                            }
                        });
                        var guestName="";
                        var guestId="";
                        guests.forEach(guest => {
                            if(guideSale.GuestId==guest._id.toString()){
                                guestName=guest.Name;
                                guestId=guest._id.toString();
                            }
                        });

                        const gs = {
                            Id:guideSale._id.toString(),
                            Guide:guideName,
                            GuideId:guideId,
                            Number:parseInt(guideSale.Number),
                            Guest:guestName,
                            GuestId:guestId,
                            //TourType:t
                        };

                        var exists = false;
                  
                        for(let index =0;index<guideSaaaales.length;index++){
                            
                                if(guideSaaaales[index].GuideId == gs.GuideId && guideSaaaales[index].GuestId==gs.GuestId){
                                    
                                    guideSaaaales[index].Number = guideSaaaales[index].Number + parseFloat(gs.Number);
                                    if( guideSaaaales[index].Number==0){
                                        
                                        const indexToRemove = guideSaaaales.indexOf(guideSaaaales[index]);

                                        if (indexToRemove > -1) { // only splice array when item is found
                                            guideSaaaales.splice(indexToRemove, 1); // 2nd parameter means remove one item only
                                        }
                                    }
                                    exists = true;
                                }
                            }
                        
                        if(exists==false){
                            guideSaaaales.push(gs); 
                        }
                       
                       
                        
                    }
                    
                });

                

                guests.forEach(g => {

                    var guestTotal=0;
                    if(g.TourTypeId == tourType._id.toString()){
                         tours.forEach(t => {
                            if(t.TourTypeId==tourType._id.toString()
                                && t.GuestId == g._id.toString()){
                                    guestTotal = guestTotal + parseInt(t.Number);
                            }
                        });
                    }

                    if(guestTotal>0){
                        const guest = {
                            Name:g.Name,
                            Number: guestTotal,
                            Colour:g.Colour,
                            Id:g._id
                        }
                        
                       
                        daily.Guests.push(guest);
                    }
                    
                });
                
                BookingPlatforms.forEach(b => {

                    var bookingPlatTotal=0;
                    if(b.TourTypeId == tourType._id.toString()){
                       
                        tours.forEach(t => {
                            if(t.TourTypeId==tourType._id.toString()
                                && t.BookingPlatformId == b._id.toString()){
                                    bookingPlatTotal = bookingPlatTotal + parseInt(t.Number);
                            }
                        });
                    }

                    if(bookingPlatTotal>0){
                        const bookiPlat = {
                            Name:b.Name,
                            Number: bookingPlatTotal,
                            Colour:b.Colour,
                            Id:b._id
                        }
    
                        daily.BookingPlatforms.push(bookiPlat);
                    }
                    
                });

                
                guides.forEach(g => {

                    let guideTotal=0;
                   
                    tours.forEach(t => {
                        if(t.TourTypeId==tourType._id.toString()
                            && t.GuideId == g._id.toString()){

                                guideTotal = guideTotal + parseInt(t.Number);
                               
                        }
                    });

                    
   
                    if(guideTotal>0){
                        const guideNum = {
                            Name:g.UserName,
                            Number: guideTotal,
                            Colour:g.Colour,
                            Id:g._id
                        }
                       
                        daily.Guides.push(guideNum);
                    }
                    
                });

                daily.GuideSales=guideSaaaales;
                dailies.push(daily);
                //  if(pax>0){
      
                //     daily.GuideSales=guideSaaaales;
                //     dailies.push(daily);
                // }
                
            });


        }
        catch(e){
            console.log(e)
        }

        dailies.sort(function(a, b){
            if(a.tourType < b.tourType) { return -1; }
            if(a.tourType > b.tourType) { return 1; }
            return 0;
        })
        
        return dailies;
    },

    getUserInOuts: async function(startDate, endDate,User){
        const InOuts=[];
      
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }
           
            const db = client.db('Carlos');

            const tours = [];
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
                var date = new Date(tour.Date);
                date.setHours(0,0,0,0);
            
                 if(date>=start && date<=end){
                     tours.push(tour);
                 }  
            });	


            const guideSales = [];
            
            await db.collection('GuideSales').find({}).forEach(function(guideSale, err) {
            
                var date = new Date(guideSale.Date);
                date.setHours(0,0,0,0);
                
                 if(date>=start && date<=end){
                    
                    guideSales.push(guideSale);
                 }  
            });	

            const tourTypes = []

            await db.collection('TourTypes').find({}).forEach(async function(tourType, err) {
                tourTypes.push(tourType);
            });	

            const BookingPlatforms = []

            await db.collection('BookingPlatforms').find({}).forEach(async function(bookingPlatform, err) {
                BookingPlatforms.push(bookingPlatform);
            });	


            var Id = new ObjectId(User.Id);
            const guide = await db.collection('Users').findOne({_id: Id})
          
            const paymentStructures = []
            await db.collection('PaymentStructures').find({}).forEach(function(paymentStructure, err) {
                
                paymentStructures.push(paymentStructure);
               
            });	

            const guests = []
            await db.collection('Guests').find({}).forEach(function(guest, err) {
                
                guests.push(guest);
               
            });	


            tourTypes.forEach(t => {
                
                const inOut = {
                    Name:t.Time + " "+t.Name,
                    Guests:[],
                    Guides:[],
                    BookingPlatforms:[],
                    GuideSales:[],
                    Colour:t.Colour,
                    Total:0,
                    Free:t.Free
                };

                if(t.Free=="true"){

                    var payStruct = paymentStructures.find(x => x.TourTypeId==t._id.toString());
                   
                        var guideTotal = 0;
                      
                        tours.forEach(tour => {
                            if(tour.TourTypeId==t._id.toString() 
                                && tour.GuideId == guide._id.toString()){
                                    guideTotal = guideTotal + parseInt(tour.Number);
                            }
                        });

                        if(guideTotal>0){

                            const g = {
                                Name: "Guests",
                                Number:guideTotal,
                                Total:"-"+parseFloat(guideTotal) * parseFloat(payStruct.PricePerHead),
                            }
    
                            inOut.Guides.push(g);
                        }
                       
                    
                }
                else{

                    var guideTotal = 0;
                    
                    tours.forEach(tour => {
                        if(tour.TourTypeId==t._id.toString() 
                            && tour.GuideId == guide._id.toString()){
                                guideTotal = guideTotal + parseInt(tour.Number);
                        }
                    });

                    var payStruct = null;

                    paymentStructures.forEach(p => {
                        if(guideTotal>= p.ChangeAt){
                            payStruct = p;
                        }
                    });

                    var total=0;
                    if(parseFloat(guideTotal)>0){
                        total = parseFloat(guideTotal) * parseFloat(payStruct.PerHead) + parseFloat(payStruct.Base);
                    }
                
                    if(guideTotal>0){
                        var g = {
                            Name: "Guests",
                            Number:guideTotal,
                            Total:total,
                            };

                            inOut.Guides.push(g);
                        }

                        var GuideSaleTotal=0;
                        guideSales.forEach(guideSale => {
                            if(guideSale.TourTypeId==t._id.toString()){
                                if(guideSale.GuideId==guide._id.toString()){
                                    GuideSaleTotal=GuideSaleTotal+ parseInt(guideSale.Number);
                                }
                            } 
                            
                        });

                        if(GuideSaleTotal>0){
                            const gs ={
                                Name:"Sale",
                                Number:GuideSaleTotal,
                                Total:parseFloat(GuideSaleTotal)*2
                            }
                            inOut.GuideSales.push(gs);
                            
                        }
                    

                }
                
                InOuts.push(inOut);
            });
        }
        catch(e){
            console.log(e)
        }
        return InOuts;
    },

    getInOuts: async function(startDate, endDate){
        const InOuts=[];
    
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }
           
            const db = client.db('Carlos');

            const tours = [];
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
                var date = new Date(tour.Date);
                date.setHours(0,0,0,0);
            
                 if(date>=start && date<=end){
                     tours.push(tour);
                 }  
            });	


            const guideSales = [];
            
            await db.collection('GuideSales').find({}).forEach(function(guideSale, err) {
            
                var date = new Date(guideSale.Date);
                date.setHours(0,0,0,0);
                
                 if(date>=start && date<=end){
                    
                    guideSales.push(guideSale);
                 }  
            });	

            const tourTypes = []

            await db.collection('TourTypes').find({}).forEach(async function(tourType, err) {
                tourTypes.push(tourType);
            });	

            const BookingPlatforms = []

            await db.collection('BookingPlatforms').find({}).forEach(async function(bookingPlatform, err) {
                BookingPlatforms.push(bookingPlatform);
            });	

            const guides = []

            await db.collection('Users').find({}).forEach(async function(guide, err) { 
                if(guide.Role=="Guide"){
                    guides.push(guide);
                }
                
            });	

            const paymentStructures = []
            await db.collection('PaymentStructures').find({}).forEach(function(paymentStructure, err) {
                
                paymentStructures.push(paymentStructure);
               
            });	

            const guests = []
            await db.collection('Guests').find({}).forEach(function(guest, err) {
                
                guests.push(guest);
               
            });	

            tourTypes.forEach(t => {
                
                const inOut = {
                    Name:t.Time + " "+t.Name,
                    Guests:[],
                    Guides:[],
                    BookingPlatforms:[],
                    GuideSales:[],
                    Colour:t.Colour,
                    Total:0,
                    Free:t.Free
                };

                guests.forEach(g => {
                    if(g.TourTypeId==t._id.toString()){
                        var totalGuest = 0;
                        var discounts = 0;

                        tours.forEach(tour => {
                            if(tour.TourTypeId==t._id.toString() 
                                && tour.GuestId == g._id.toString()){
                                totalGuest = totalGuest + parseInt(tour.Number);
                                
                                if(tour.BookingPlatformId=="GuideSale"){
                                    discounts = discounts + parseInt(tour.Number);
                                }
                            }
                        });

                        var discountPrice = 95/100*g.Price
                        
                        total = (g.Price * (totalGuest-discounts)) +(discountPrice*discounts);

                        const guest = {
                            Name:g.Name,
                            Number:totalGuest,
                            Total: total,//parseFloat(g.Price)* parseFloat(totalGuest),
                        };

                        if(totalGuest!=0){
                            inOut.Guests.push(guest);
                        }
                            
                    }
                   
                });

                if(t.Free=="true"){

                    var payStruct = paymentStructures.find(x => x.TourTypeId==t._id.toString());
                   
                    guides.forEach(g => {
                        
                        var guideTotal = 0;

                        tours.forEach(tour => {
                            if(tour.TourTypeId==t._id.toString() 
                                && tour.GuideId == g._id.toString()){
                                    guideTotal = guideTotal + parseInt(tour.Number);
                            }
                        });

                        if(guideTotal>0){

                            const guide = {
                                Name: g.UserName,
                                Number:guideTotal,
                                Total:parseFloat(guideTotal) * parseFloat(payStruct.PricePerHead),
                            }
    
                            inOut.Guides.push(guide);
                        }
                        
                    });
                    
                }
                else{

                    guides.forEach(g => {
                        
                        var guideTotal = 0;
                        

                        tours.forEach(tour => {
                            if(tour.TourTypeId==t._id.toString() 
                                && tour.GuideId == g._id.toString()){
                                    guideTotal = guideTotal + parseInt(tour.Number);
                            }
                        });

                        var payStruct = null;

                        paymentStructures.forEach(p => {
                            if(guideTotal>= p.ChangeAt){
                                payStruct = p;
                            }
                        });

                        var total=0;
                        if(parseFloat(guideTotal)>0){
                            total = parseFloat(guideTotal) * parseFloat(payStruct.PerHead) + parseFloat(payStruct.Base);
                        }
                       
                        if(guideTotal>0){
                            var guide = {
                                Name:g.UserName,
                                Number:guideTotal,
                                Total:"-"+total,
                                };

                                inOut.Guides.push(guide);
                            }

                            var GuideSaleTotal=0;
                            guideSales.forEach(guideSale => {
                                if(guideSale.TourTypeId==t._id.toString()){
                                    if(guideSale.GuideId==g._id.toString()){
                                        GuideSaleTotal=GuideSaleTotal+ parseInt(guideSale.Number);
                                    }
                                } 
                                
                            });

                            if(GuideSaleTotal>0){
                                const gs ={
                                    Name:g.UserName +" Sale",
                                    Number:GuideSaleTotal,
                                    Total:parseFloat(GuideSaleTotal)*2
                                }
                                inOut.GuideSales.push(gs);
                                
                            }
                    });

                }

                BookingPlatforms.forEach(b => {
                    

                    var bookiGuests =[];
                    guests.forEach(guest => {
                        
                        if(guest.TourTypeId == b.TourTypeId &&
                            guest.TourTypeId == t._id.toString() &&
                            b.TourTypeId == t._id.toString()){
                            var gusetNumber = {
                                Guest:guest,
                                Number:0
                            }
                            bookiGuests.push(gusetNumber);
                        }
                    });
                    
                    tours.forEach(tour => {
                        if(tour.TourTypeId==t._id.toString() 
                            && tour.BookingPlatformId == b._id.toString()){
                               // bookiTot = bookiTot + parseInt(tour.Number);

                                var index = bookiGuests.findIndex((x => x.Guest._id.toString()==tour.GuestId));
                                if(index>0){
                                    bookiGuests[index].Number = bookiGuests[index].Number + parseInt(tour.Number);
                                }
                                
                               
                        }
                    });

                    var bookiTot = 0;
                    bookiGuests.forEach(bookiGuest => {
                        bookiTot = bookiTot +bookiGuest.Number * bookiGuest.Guest.Price
                    });

                   
                    if(bookiTot>0){
                        var booki = {
                            Name:b.Name,
                            Number:bookiTot,
                            Total: parseFloat("-"+bookiTot) *  parseFloat(b.MarketingFee)/100,
                            };

                            inOut.BookingPlatforms.push(booki);
                        }

                });

                InOuts.push(inOut);

                InOuts.sort(function(a, b){
                    if(a.Name < b.Name) { return -1; }
                    if(a.Name > b.Name) { return 1; }
                    return 0;
                })
            });

        }
        catch(e){
            console.log(e)
        }
        
        return InOuts;
    },

    getOutGoings: async function(startDate, endDate){
        const outs=[];
      
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }
           
            const db = client.db('Carlos');

            const tours = [];
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
                var date = new Date(tour.Date);
                date.setHours(0,0,0,0);
            
                 if(date>=start && date<=end){
                     tours.push(tour);
                 }  
            });	

            const guideSales = [];
            
            await db.collection('GuideSales').find({}).forEach(function(guideSale, err) {
            
                var date = new Date(guideSale.Date);
                date.setHours(0,0,0,0);
                
                 if(date>=start && date<=end){
                    
                    guideSales.push(guideSale);
                 }  
            });	

            const tourTypes = []

            await db.collection('TourTypes').find({}).forEach(async function(tourType, err) {
                tourTypes.push(tourType);
            });	

            const BookingPlatforms = []

            await db.collection('BookingPlatforms').find({}).forEach(async function(bookingPlatform, err) {
                BookingPlatforms.push(bookingPlatform);
            });	

            const guides = []

            await db.collection('Users').find({}).forEach(async function(guide, err) { 
                if(guide.Role=="Guide"){
                    guides.push(guide);
                }
                
            });	
            const paymentStructures = []
            await db.collection('PaymentStructures').find({}).forEach(function(paymentStructure, err) {
                
                paymentStructures.push(paymentStructure);
               
            });	

            const guests = []
            await db.collection('Guests').find({}).forEach(function(guest, err) {
                
                guests.push(guest);
               
            });	


            for(let i =0;i<tourTypes.length;i++){

                var totalGuests = 0;
               
                for(let t =0;t<tours.length;t++){

                    if(tours[t].TourTypeId==tourTypes[i]._id.toString()){
                        totalGuests = totalGuests + parseInt(tours[t].Number);
                    }
                }

                var bookingFees = [];
                BookingPlatforms.forEach(b => {
                    
                    var bookingTotal=0;

                    guests.forEach(guest => {
                        
                        var guestTotal =0;

                        tours.forEach(t => {

                            if(t.BookingPlatformId == b._id.toString() && t.TourTypeId==tourTypes[i]._id.toString() &&
                                t.GuestId== guest._id.toString()){
    
                                    guestTotal= guestTotal + parseInt(t.Number);
                            }
                           
                        });
                        bookingTotal = bookingTotal + guestTotal * (parseFloat(guest.Price) * b.MarketingFee/100)
                        //bookingTotal = bookingTotal + (guestTotal * parseFloat(b.MarketingFee)/100)
                    });
                   

                    //var total = parseFloat(bookingTotal)*parseFloat(b.MarketingFee)/100;

                    if(bookingTotal>0){
                        const bookingFee= {
                            Name:b.Name,
                            //Number:bookingTotal,
                            Total:bookingTotal,
                            Colour:b.Colour
                        };
                        bookingFees.push(bookingFee);
                    }
                   
                });

                var guideGuestTotals = [];
                var sales =[];
                if(tourTypes[i].Free=="true"){
                    
                }
                else{
                    var payStruct = null;
                   
                    guides.forEach(g => {
                        var guideTotalGuest = 0;
                        
                        for(let t =0;t<tours.length;t++){
                            if(tours[t].TourTypeId==tourTypes[i]._id.toString()){
                                if(tours[t].GuideId ==g._id.toString()){
                                    guideTotalGuest = guideTotalGuest + parseInt(tours[t].Number);
                                }
                            }
                        }
                      
                        paymentStructures.forEach(p => {
                             if(guideTotalGuest>= p.ChangeAt){
                               payStruct=p;
                            }
                        });
                        
                        var total=0;
                        if(parseFloat(guideTotalGuest)>0){
                            total = parseFloat(guideTotalGuest) * parseFloat(payStruct.PerHead) + parseFloat(payStruct.Base);
                        }
                       
                        if(guideTotalGuest>0){
                            var guideGuestTotal = {
                                Name:g.UserName,
                                 TotalGuests:guideTotalGuest,
                                 Total:total,
                                };
                            guideGuestTotals.push(guideGuestTotal);
                        }
                        

                        var GuideSaleTotal=0;
                        guideSales.forEach(guideSale => {
                           
                            if(guideSale.TourTypeId==tourTypes[i]._id.toString()){
                                if(guideSale.GuideId==g._id.toString()){
                                    GuideSaleTotal=GuideSaleTotal+ parseInt(guideSale.Number);
                                }
                            } 
                            
                        });

                        if(GuideSaleTotal>0){
                            const gs ={
                                Name:tourTypes[i].Time + " "+ tourTypes[i].Name +" Sale",
                                Number:GuideSaleTotal,
                                Total:parseFloat(GuideSaleTotal)*2
                            }
                            sales.push(gs);
                            
                        }
                    });

                }

                

                const out = {
                    TourType: tourTypes[i].Time +" "+tourTypes[i].Name,
                    GuideTotals: guideGuestTotals,
                    BookingFees: bookingFees,
                    Colour:tourTypes[i].Colour,
                    TotalGuests:totalGuests,
                    GuideSales:sales,
                };

                outs.push(out);

                
            }

            
            outs.sort(function(a, b){
                if(a.TourType < b.TourType) { return -1; }
                if(a.TourType > b.TourType) { return 1; }
                return 0;
            })
        }
        catch(e){
            console.log(e)
        }

        return outs;
    },
    
    getOutGoingsByBookingPlatform: async function(startDate, endDate){
        const outs=[];
      
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }
           
            const db = client.db('Carlos');

            const tours = [];
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
                var date = new Date(tour.Date);
                date.setHours(0,0,0,0);
            
                 if(date>=start && date<=end){
                     tours.push(tour);
                 }  
            });	

            const guests = []
            await db.collection('Guests').find({}).forEach(function(guest, err) {
                
                guests.push(guest);
               
            });	

            var bookingPlatforms = [];
            await db.collection('BookingPlatforms').find({}).forEach(async function(bookPlat, err) {
            
                bookingPlatforms.push(bookPlat);
            });	
            const tourTypes = []
            await db.collection('TourTypes').find({}).forEach(function(tourType, err) {
                
                var bookPlats=[]
                bookingPlatforms.forEach(b => {
                    if(b.TourTypeId==tourType._id.toString()){
                        bookPlats.push(b);
                    }
                });

                var t = {
                    Name:tourType.Name,
                    Time:tourType.Time,
                    Colour:tourType.Colour,
                    BookPlats: bookPlats,
                };

                tourTypes.push(t)
                //tourTypes.push(tourType);
            });	

            if(outs.length==0){

                var b = bookingPlatforms[0];
                const out ={
                    Name:b.Name,
                    TourPlats:[],
                    Colour:b.Colour
                }

               
                outs.push(out);
            }
 
            bookingPlatforms.forEach(b => {
                
                index = outs.findIndex((tp => b.Name == tp.Name));
                if(index ==-1){

                    const out ={
                       
                        Name:b.Name,
                        TourPlats:[],
                        Colour:b.Colour
                    }
    
                    outs.push(out);

                }
            });
            
            outs.forEach(o => {
                
                tourTypes.forEach(tourType => {
                    
                    

                    tourType.BookPlats.forEach(b => {
                       
                        var bookiTotal = 0;
                       
                        guests.forEach(guest => {
                           
                            var guestTotal = 0;

                            tours.forEach(t => {
                                if(t.BookingPlatformId == b._id.toString() && 
                                    t.GuestId == guest._id.toString()){
                                        guestTotal = guestTotal + parseInt(t.Number);
                                }
                            });

                            bookiTotal = bookiTotal + guestTotal * (parseFloat(guest.Price) * b.MarketingFee/100)
                        });
                        
                        if(bookiTotal>0){
                            if(b.Name == o.Name){
                                const bookiplat ={
                                    Name:tourType.Time +" "+ tourType.Name,
                                    //Number:3,
                                    Total:bookiTotal
                                }
    
                                o.TourPlats.push(bookiplat);
                            }
                            
                        }
                        
                    });

                });
           });
                
            // for(let i =0;i<outs.length;i++){
                
            //     tourTypes.forEach(tourType => {
                
            //         tourType.BookPlats.forEach(b => {
            //             var tourTotal = 0;

            //             tours.forEach(t => {
                            
            //                 if(t.TourTypeId == tourType._id.toString()){
            //                    tourTotal=tourTotal+ parseInt(t.Number);
                               
            //                 }
            //             });
                   
                   
                   
            //             if(b.Name == outs[i].Name){
                           
            //                 if(tourTotal>0){
            //                     const tourPlat={
            //                         Name:tourType.Time +" "+ tourType.Name,
            //                         Number:tourTotal,
            //                         Total: parseFloat(b.MarketingFee) * parseFloat(tourTotal),
            //                     };
    
            //                     outs[i].TourPlats.push(tourPlat);
            //                 }
                           

            //             }
                        
        
                        
            //         });
    
                   
                    
                   
            //     });

            // };

        }
        catch(e){
            console.log(e)
        }
       
        return outs;
    },

    getOutGoingsByGuide: async function(startDate, endDate){

        const outs=[];
      
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }
           
            const db = client.db('Carlos');

            const tours = [];
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
                var date = new Date(tour.Date);
                date.setHours(0,0,0,0);
            
                 if(date>=start && date<=end){
                     tours.push(tour);
                 }  
            });	

            const guideSales = [];
            
            await db.collection('GuideSales').find({}).forEach(function(guideSale, err) {
            
                var date = new Date(guideSale.Date);
                date.setHours(0,0,0,0);
                
                 if(date>=start && date<=end){
                    
                    guideSales.push(guideSale);
                 }  
            });	


            var guides = [];
            await db.collection('Users').find({Role:"Guide"}).forEach(async function(guide, err) {
            
                guides.push(guide);
            });

            const paymentStructures = []
            await db.collection('PaymentStructures').find({}).forEach(function(paymentStructure, err) {
                
                paymentStructures.push(paymentStructure);
               
            });	

            const tourTypes = []
            await db.collection('TourTypes').find({}).forEach(function(tourType, err) {
                
                tourTypes.push(tourType);
            });	

            guides.forEach(g => {
            
                var guideTotal =0;
                var guideTours = [];
                var sales = [];
                tourTypes.forEach(t => {
                   
                    if(t.Free=="false"){
                        
                        var tourTotal = 0;
                        tours.forEach(tt => {
                            
                            if(tt.TourTypeId == t._id.toString() &&
                                tt.GuideId == g._id.toString()){
                                  
                                    tourTotal = tourTotal + parseInt(tt.Number);
                                }
                            
                        });
                       
                        var payStruct = null;
                        paymentStructures.forEach(p => {
                                if(tourTotal>= p.ChangeAt){
                                payStruct=p;
                            }
                        });

                        
                        var total=0;
                        if(parseFloat(tourTotal)>0){
                            total = parseFloat(tourTotal) * parseFloat(payStruct.PerHead) + parseFloat(payStruct.Base);
                            guideTotal = guideTotal+total;
                        }

                        const guideTour = {
                            Name:t.Time + " "+t.Name,
                            Number:tourTotal,
                            Total:total 
                        };
                        if(tourTotal>0){
                            guideTours.push(guideTour);
                        }
                        
                       
                    }

                    var GuideSaleTotal=0;
                    guideSales.forEach(guideSale => {
                        if(guideSale.TourTypeId==t._id.toString()){
                            if(guideSale.GuideId==g._id.toString()){
                                GuideSaleTotal=GuideSaleTotal+ parseInt(guideSale.Number);
                            }
                        } 
                        
                    });

                    if(GuideSaleTotal>0){
                        const gs ={
                            Name:t.Time + " "+ t.Name +" Sale",
                            Number:GuideSaleTotal,
                            Total:parseFloat(GuideSaleTotal)*2
                        }
                        sales.push(gs);
                        
                    }
                    

                });
                {
                    const out = {
                        Name:g.UserName,
                        Tours:guideTours,
                        Total:guideTotal,
                        Colour:g.Colour,
                        GuideSales:sales,
                    };
    
                    outs.push(out);
                }
                
            });

        }
        catch(e){
            console.log(e)
        }
       
        return outs;
    },

    getUserIncomes:  async function(startDate, endDate,User){

        const incomes =[];
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }
           
            const db = client.db('Carlos');

            const tours = [];
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
                var date = new Date(tour.Date);
                date.setHours(0,0,0,0);
            
                 if(date>=start && date<=end){
                     tours.push(tour);
                 }  
            });	


            const guideSales = [];
            
            await db.collection('GuideSales').find({}).forEach(function(guideSale, err) {
            
                var date = new Date(guideSale.Date);
                date.setHours(0,0,0,0);
                
                 if(date>=start && date<=end){
                    
                    guideSales.push(guideSale);
                 }  
            });	

            const tourTypes = []

            await db.collection('TourTypes').find({}).forEach(async function(tourType, err) {
                tourTypes.push(tourType);
            });	

            const BookingPlatforms = []

            await db.collection('BookingPlatforms').find({}).forEach(async function(bookingPlatform, err) {
                BookingPlatforms.push(bookingPlatform);
            });	


            var Id = new ObjectId(User.Id);
            const guide = await db.collection('Users').findOne({_id: Id})
          
            const paymentStructures = []
            await db.collection('PaymentStructures').find({}).forEach(function(paymentStructure, err) {
                
                paymentStructures.push(paymentStructure);
               
            });	

            const guests = []
            await db.collection('Guests').find({}).forEach(function(guest, err) {
                
                guests.push(guest);
               
            });	


            tourTypes.forEach(t => {
                
                var totalGuests = 0;
           
                const income ={
                    TourName:t.Time+ " "+t.Name,
                    Guests:[],
                    TotalGuests:[],
                    Guides:[],
                    GuideSales:[],
                    Colour:t.Colour,
                    
                }

                var guideTotal = 0;
                    
                tours.forEach(tour => {
                    if(tour.TourTypeId==t._id.toString() 
                        && tour.GuideId == guide._id.toString()){
                            guideTotal = guideTotal + parseInt(tour.Number);
                    }
                });

                var payStruct = null;

                paymentStructures.forEach(p => {
                    if(guideTotal>= p.ChangeAt){
                        payStruct = p;
                    }
                });

                var total=0;
                if(parseFloat(guideTotal)>0){
                    total = parseFloat(guideTotal) * parseFloat(payStruct.PerHead) + parseFloat(payStruct.Base);
                }
            
                if(guideTotal>0){
                    var g = {
                        Name: "Guests",
                        Number:guideTotal,
                        Total:total,
                        };

                        income.Guides.push(g);
                    }

                    var GuideSaleTotal=0;
                    guideSales.forEach(guideSale => {
                        if(guideSale.TourTypeId==t._id.toString()){
                            if(guideSale.GuideId==guide._id.toString()){
                                GuideSaleTotal=GuideSaleTotal+ parseInt(guideSale.Number);
                            }
                        } 
                        
                    });

                    if(GuideSaleTotal>0){
                        const gs ={
                            Name:"Sale",
                            Number:GuideSaleTotal,
                            Total:parseFloat(GuideSaleTotal)*2
                        }
                        income.GuideSales.push(gs);
                        
                    }


            
                incomes.push(income);
                
            });

            incomes.sort(function(a, b){
                if(a.TourName < b.TourName) { return -1; }
                if(a.TourName > b.TourName) { return 1; }
                return 0;
            })
        }
        catch(e){
            console.log(e)
        }
        return incomes;
    },

    getIncomes: async function(startDate, endDate){
       
        const incomes=[];

       
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }
           
            const db = client.db('Carlos');
            const tours = []
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
               var date = new Date(tour.Date);
               date.setHours(0,0,0,0);
           
                if(date>=start && date<=end){
                    tours.push(tour);
                }  
            });	

            
           const tourTypes = []

           await db.collection('TourTypes').find({}).forEach(async function(tourType, err) {
               
               
                tourTypes.push(tourType)

                // var tourGuest={
                //     Tour:tourType.Time + " "+ tourType.Name,
                //     //GuestNumbers:guests
                // };
                // // tourGuest.Tour = tourType.Time + " "+ tourType.Name;
                // // tourGuest.GuestNumbers=guests;
                // tourNumbers.push(tourGuest);
                // console.log(tNum);
           });	

           const guests = []
           await  db.collection('Guests').find({}).forEach(async function(guest, err,) {
               guests.push(guest);
               
           });	

           const guides = []

            await db.collection('Users').find({}).forEach(async function(guide, err) {
                guides.push(guide);
            });

           for(let i = 0;i<tourTypes.length;i++){
            

            var totalGuests = 0;
            for(let t =0;t<tours.length;t++){
                if(tours[t].TourTypeId==tourTypes[i]._id.toString()){
                    totalGuests = totalGuests + parseInt(tours[t].Number);
                }
            }

            
            if(tourTypes[i].Free=="true"){
                var total = 0;
                var guest=null;
                var tourGuests=[];
                const guideNumbers=[];
                
                var payStruct =  await db.collection('PaymentStructures').findOne({TourTypeId:tourTypes[i]._id});
                var price = payStruct.PricePerHead;

                guides.forEach(u => {
    
                    guests.forEach(g => {
                        var guideGuestNumber =0;
                        tours.forEach(t => {
                           
                            if(t.GuideId == u._id.toString() && t.GuestId==g._id.toString() && t.TourTypeId == tourTypes[i]._id.toString()){
                                guideGuestNumber = guideGuestNumber + parseInt(t.Number);
                            }
                        });
                        if(g.TourTypeId == tourTypes[i]._id.toString()){
                           
                            total = price * guideGuestNumber;

                            if(guideGuestNumber>0){
                                
                                const gN = {
                                    Guide:u.UserName,
                                    Name:g.Name,
                                    Number:guideGuestNumber,
                                    Total:total, 
                                    Colour:u.Colour
                                };
    
                               
                                guideNumbers.push(gN);
                            }
                            
                        }
                        
                    }); 
    
                });
                for(let g = 0;g<guests.length;g++){
                    if(guests[g].TourTypeId==tourTypes[i]._id){
                        guest = guests[g];
                    }
                }

                if(guest!=null){
                    total = price * totalGuests;
                    const guestNumber = {Guest:guest.Name, Number:totalGuests,Total:total};
                    tourGuests.push(guestNumber);
                    
                    const income ={
                        TourName:tourTypes[i].Time+ " "+tourTypes[i].Name,
                        TotalGuests:totalGuests,
                        Colour:tourTypes[i].Colour,
                        GuideNumbers:guideNumbers,
                       
                    }
                    incomes.push(income);
                }
                
                
            }
            else{
            
                var tourGuests=[];
                for(let g = 0;g<guests.length;g++){
                    var total = 0;
                    var totalGuestType = 0;
                    var discounts =0;
                    if(guests[g].TourTypeId==tourTypes[i]._id){
                    
                        for(let t =0;t<tours.length;t++){
                            if(tours[t].TourTypeId==tourTypes[i]._id.toString() && tours[t].GuestId==guests[g]._id.toString()){
                                totalGuestType = totalGuestType + parseInt(tours[t].Number);

                                if(tours[t].BookingPlatformId=="GuideSale"){
                                    discounts = discounts + parseInt(tours[t].Number);
                                }
                            }
                        }
                        var discountPrice = 95/100*guests[g].Price
                        
                        total = (guests[g].Price * (totalGuestType-discounts)) +(discountPrice*discounts);

                        if(totalGuestType>0){
                            const guestNumber = {Guest:guests[g].Name, Number:totalGuestType,Total:total};
                        
                            tourGuests.push(guestNumber);
                        }
                        

                    }
                }

                const income ={
                    TourName:tourTypes[i].Time+ " "+tourTypes[i].Name,
                    Guests:tourGuests,
                    TotalGuests:totalGuests,
                    Colour:tourTypes[i].Colour,
                    
                }
            
                incomes.push(income);
                
            }
               
                
           }
           incomes.sort(function(a, b){
                if(a.TourName < b.TourName) { return -1; }
                if(a.TourName > b.TourName) { return 1; }
                return 0;
            })
        }
        catch(e){
            console.log(e);
        }
      
        return incomes;
    },

    getGuideIncomes: async function(startDate, endDate){
        const incomes=[];

       
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }
           
            const db = client.db('Carlos');
            const tours = []
            await db.collection('Tours').find({}).forEach(function(tour, err) {
            
               var date = new Date(tour.Date);
               date.setHours(0,0,0,0);
           
                if(date>=start && date<=end){
                    tours.push(tour);
                }  
            });

            const tourTypes = []

            await db.collection('TourTypes').find({Free: "true" }).forEach(async function(tourType, err) {
                tourTypes.push(tourType);
            });
          
            const guides = []

            await db.collection('Users').find({Role: "Guide" }).forEach(async function(guide, err) {
                guides.push(guide);
            });

           
            var payStructs=[];
            await db.collection('PaymentStructures').find({}).forEach(async function(payStruct, err) {
                payStructs.push(payStruct);
            });

            
          

          
           guides.forEach(g => {

            const guideTours = [];

            tourTypes.forEach(tourType => {
                var price = "";
                payStructs.forEach(p => {
                    if(p.TourTypeId==tourType._id.toString()){
                        price=p.PricePerHead;
                    }
               });
                
               var tourTotal=0;
              
                tours.forEach(t => {
                
                    if(t.TourTypeId==tourType._id.toString() && 
                        t.GuideId == g._id.toString()){
                            
                            tourTotal=parseInt(tourTotal)+ parseInt(t.Number);
                        }
                 
                });

            
                if(tourTotal>0){
                    const guideTour={
                        Name:tourType.Time + " "+ tourType.Name,
                        Number:tourTotal,
                        Total:parseFloat(price)*parseFloat(tourTotal),
                    }
                    guideTours.push(guideTour);
                }
                
            });
 
            const income = {
                Name:g.UserName,
                GuideTour:guideTours,
                Colour:g.Colour
            }
           
            incomes.push(income);
        });
            
        }
        catch(e){

        }
        return incomes;
    },

    getAllTicketSales: async function(startDate,endDate){
       
        var ticketSales = 0;
        var tixPrice = 0;
        try{
            var start="";
            
            if(startDate==null|| startDate==""){
                var today = new Date();
                start = addMonths(today, -1);
                start.setHours(0,0,0,0);
               
                
            }
            else{

                start = new Date(startDate);
                start.setHours(0,0,0,0);
            }

            var end="";

            if(endDate==null || endDate==""){
                var today = new Date();
                end =  today;
                end.setHours(0,0,0,0);
               
            }
            else{
                end = new Date(endDate);
                end.setHours(0,0,0,0);
            }

            const db = client.db('Carlos');
           
            await db.collection('TicketSales').find({}).forEach(function(tix, err) {
            
               var date = new Date(tix.Date);
               date.setHours(0,0,0,0);
           
                if(date>=start && date<=end){
                    ticketSales=ticketSales+tix.Number;
                }  
            });

            var tic = await db.collection('Ticket').findOne({});
            tixPrice = parseFloat(tic.Price)*parseFloat(ticketSales);
        }
        catch(e){
            console.log(e);
        }

        const send = {
            Number:ticketSales,
            Price:tixPrice,
        }
        return send;
    },

    getBookingPlatforms: async function(TourTypeId){
        
        
        var bookingPlatforms =[];
        const db = client.db('Carlos');
        const collection = db.collection('BookingPlatforms');
         
        try{
           // var id = new ObjectId(TourTypeId);
           
            await collection.find({TourTypeId: TourTypeId }).forEach(function(result, err) {
               
                bookingPlatforms.push(result);
         
            });	
        }
        catch(e){
            console.log(e);
        }
        
        return bookingPlatforms;


      
    },

    getTourTypes: async function(){
        var tourTypes =[];
        const db = client.db('Carlos');
        const collection = db.collection('TourTypes');
          
        try{
            await collection.find({}).forEach(function(result, err) {
                
                tourTypes.push(result);
              
            });	

            tourTypes.sort(function(a, b){
                if(a.Name < b.Name) { return -1; }
                if(a.Name > b.Name) { return 1; }
                return 0;
            })
        }
        catch(e){
            console.log(e);
        }
        //console.log(users);
        return tourTypes;

    },

    getPaymentStructures: async function(id){
        var paymentStructures =[];
       
        const db = client.db('Carlos');
        const collection = db.collection('PaymentStructures');
        
        try{
            var Id = new ObjectId(id);
            await collection.find({TourTypeId:Id}).forEach(function(result, err) {
                
                paymentStructures.push(result);
            
            });	
            // console.log(paymentStructures);
            paymentStructures.sort(function(a, b){
                if(a.ChangeAt < b.ChangeAt) { return -1; }
                if(a.ChangeAt > b.ChangeAt) { return 1; }
                return 0;
            })
        }
        catch(e){
            console.log(e);
        }
       
        return paymentStructures;

    },

    getTourType: async function(id){
        var tourType= "";
        const db = client.db('Carlos');
        const collection = db.collection('TourTypes');
          
        try{
            var Id = new ObjectId(id);
            tourType= await collection.findOne({_id:Id})
            
        }
        catch(e){
            console.log(e);
        }
        //console.log(users);
        return tourType;

    },

    deleteTours: async function(id,d){
        var result = "";
        
        try{
            const db = client.db('Carlos');
            const tours = db.collection('Tours');
            const guideSales = db.collection('GuideSales');
            dat = new Date(d);
            dat.setHours(0,0,0,0);
        
            var tttt = dat.toDateString()+" 00:00:00 GMT+0100 (British Summer Time)";
           
           
            var deleteTours = await tours.deleteMany({ 
                "TourTypeId" : id ,
                "Date":tttt
            });
            var deleteGuideSales = await guideSales.deleteMany({ 
                "TourTypeId" : id ,
                "Date":tttt
            });
            if(deleteTours.deletedCount>0){
                result = "Success";
            }
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;

    },

    registerGuide: async function(guide){
       
        var result = registerGuide(guide);
        return result;
    },

    EditGuide: async function(guide){
       
        var result = editGuide(guide);
        return result;
    },

    storeTicket: async function(t){
        var result = "";
        try{
            const db = client.db('Carlos');
            const collection = db.collection('Ticket');
          
            var tix = await collection.findOne( {} );
            if(tix !=null){
                const filter = {_id:tix._id};
                // update the value of the 'quantity' field to 5
                const updateDocument = {
                    $set: {
                        Price:t.Price
                    },
                };
                const dbResult = await collection.updateOne(filter, updateDocument);
                if(dbResult.matchedCount===1){
                   result = "Success";
                }
                else{
                   result = "Fail!";
                }
            }
            else{
                var dbrslt = await collection.insertOne(t);
                
                if(dbrslt.acknowledged==true){
                    result = "Success";
                 }
                 else{
                    result = "Fail!";
                 }
            }
            
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    storeTicketSale: async function(tic){
        var result = "";
        try{
            const db = client.db('Carlos');
            const collection = db.collection('TicketSales');
          
            // var dat ="" ;
            
            // if(tic.Date==null|| tic.Date==""){
            //     dat = new Date();
            //     dat.setHours(0,0,0,0);
               
                
            // }
            // else{

            //     dat = new Date(tic.Date);
            //     dat.setHours(0,0,0,0);
            // }

            
            var storedTicket = await collection.findOne({Date:tic.Date})
            if(storedTicket !=null){
                const filter = {_id:storedTicket._id};
                
                const updateDocument = {
                    $set: {
                        Number: parseInt(storedTicket.Number)+parseInt(tic.Number)
                    },
                };
                const dbResult = await collection.updateOne(filter, updateDocument);
                if(dbResult.matchedCount===1){
                   result = "Success";
                }
                else{
                   result = "Fail!";
                }
            }
            else{
                var dbrslt = await collection.insertOne(tic);
                
                if(dbrslt.acknowledged==true){
                    result = "Success";
                 }
                 else{
                    result = "Fail!";
                 }
            }
            
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    storeTour: async function(tours){
       
        var result = "";
        try{
            const db = client.db('Carlos');
            const collection = db.collection('Tours');
          
            if(tours!=null){
                collection.insertMany(tours);
            }
            
            result = "Success";
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    storeGuideSales: async function(guideSales){
       
        var result = "";
        try{
            const db = client.db('Carlos');
            const collection = db.collection('GuideSales');
          
            if(guideSales!=null){
                collection.insertMany(guideSales);
            }
            
            result = "Success";
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    addGuestToTourType: async function(guest){
       
        var result = "";
        try{
            const db = client.db('Carlos');
            const collection = db.collection('Guests');
            
            var insertResult = await collection.insertOne(guest);

            const filter = {Name: guest.Name };
           
            const updateDocument = {
                $set: {
                    Colour: guest.Colour,
                },
            };
            const dbResult = await collection.updateMany(filter, updateDocument);
            


            result = "Success";
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    storeTourType: async function(tourType){
       
        var result = "";
        try{
            const db = client.db('Carlos');
            const collection = db.collection('TourTypes');
           
            const t = {
                Name:tourType.Name,
                Time:tourType.Time, 
                Free:tourType.Free,
                Colour:tourType.Colour
            }

            var insert = await collection.insertOne(t);

            
            const paymentStructuresDb = db.collection('PaymentStructures');
            await paymentStructuresDb.deleteMany({ "TourTypeId" : t._id });
           
            var structs=[];

            if(tourType.Free=="false"){
                for(let i =0;i<tourType.PaymentStructures.length;i++){
                    const struct ={
                        TourTypeId: t._id, 
                        Base: tourType.PaymentStructures[i].Base, 
                        ChangeAt: tourType.PaymentStructures[i].ChangeAt,
                        PerHead: tourType.PaymentStructures[i].PerHead
                    };
                    structs.push(struct);
                }
            }
            else{

                const struct ={
                    TourTypeId: t._id, 
                    PricePerHead: tourType.PaymentStructures[0].PricePerHead,
                };
                structs.push(struct);
            }
           
            var payStruct = await storePaymentStructures(structs);

            if(insert.acknowledged=true && payStruct=="Success"){
                result = "Success";
            }
            else{
                result = "Error";
            }
           
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    storeBookingPlatform: async function(bookingPlatform){
       
        var result = "";
        try{
            const db = client.db('Carlos');
            const collection = db.collection('BookingPlatforms');
           
            await collection.insertOne(bookingPlatform);

            const filter = {Name: bookingPlatform.Name };
            // update the value of the 'quantity' field to 5
            const updateDocument = {
                $set: {
                    Colour: bookingPlatform.Colour,
                },
            };
            const dbResult = await collection.updateMany(filter, updateDocument);

            result = "Success";
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    removeGuest: async function(guest){
       
        var result = "";
       
        try{
            const db = client.db('Carlos');
            const collection = db.collection('Guests');
            
             var id = new ObjectId(guest._id);
            const query = {_id: id};

            const dbRslt =await collection.deleteOne(query);
            if(dbRslt.deletedCount === 1) {
                result = "Success";
              } 
              else {
                result = "No documents matched the query. Deleted 0 documents.";
              }
            
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    removeTourType: async function(tourType){
       
        var result = "";
       
        try{
            const db = client.db('Carlos');
            const collection = db.collection('TourTypes');
            
             var id = new ObjectId(tourType._id);
            const query = {_id: id};

            const dbRslt =await collection.deleteOne(query);
            if(dbRslt.deletedCount === 1) {
                result = "Success";
              } 
              else {
                result = "No documents matched the query. Deleted 0 documents.";
              }
            
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },

    removeBookingPlatform: async function(bookingPlatform){
       
        var result = "";
        
        try{
            const db = client.db('Carlos');
            const collection = db.collection('BookingPlatforms');
            
             var id = new ObjectId(bookingPlatform._id);
            const query = {_id: id};

            const dbRslt =await collection.deleteOne(query);
            if(dbRslt.deletedCount === 1) {
                result = "Success";
              } 
              else {
                result = "No documents matched the query. Deleted 0 documents.";
              }
            
        }
        catch(e){
             console.log(e);
             result = "Error";
        }
        
       return result;
    },


    dbSeed: async function () {
        try{
           // var url = "mongodb://localhost:27017/Carlos";
           const db = client.db('Carlos');
           //const collection = db.collection('Users');
          
            db.dropDatabase();

            //var guides = [];
            const Carlos = {UserName:"Carlos",  Role:"Manager",Email:"piervettori101@gmail.com",FullName:"Carlos Warlos"};
            const P = {UserName:"Pier", Role:"Guide",Email:"piervettori@yahoo.co.uk",FullName:"Pie Face"};
            

            registerGuide(Carlos);
            registerGuide(P);
            // guides.push(Carlos);
            // guides.push(P);
            //await client.db("Carlos").collection("Users").insertMany(guides);

            //var tourTypes=[];


            // const OldTown1 = {Name:"Old Town", Time:"13:00", BasePrice:2, PricePerHead:1, Colour:"0400ff"};
            // const OldTown2 = {Name:"Old Town", Time:"12:00", BasePrice:2, PricePerHead:1,Colour:"0423ff"};
            // const Castle1 = {Name:"Castle", Time:"13:00", BasePrice:1, PricePerHead:2,Colour:"0467ff"};
           
            // tourTypes.push(OldTown1);
            // tourTypes.push(OldTown2);
            // tourTypes.push(Castle1);
            
            // await client.db("Carlos").collection("TourTypes").insertMany(tourTypes);


            // var bookingPlatforms = [];
            // const BookingPlatform1 = {Name:"Fare Harbor", TourTypeId:OldTown1._id, MarketingFee:2.5, Colour:"6700ff"};
            // const BookingPlatform2 = {Name:"GYG", TourTypeId:OldTown2._id, MarketingFee:1, Colour:"0400ff"};

            // bookingPlatforms.push(BookingPlatform1);
            // bookingPlatforms.push(BookingPlatform2);
            
            // await client.db("Carlos").collection("BookingPlatforms").insertMany(bookingPlatforms);


            // var colourNumber6 = Math.floor(Math.random() * 15);
            // var colourNumber7 = Math.floor(Math.random() * 15);
            // var guests = [];

            // const g1 = {Name:"Adult", TourTypeId:OldTown1._id,Colour:"c"+colourNumber6};
            // const g2 = {Name:"Child", TourTypeId:OldTown1._id,Colour:"c"+colourNumber7};

            // var colourNumber8 = Math.floor(Math.random() * 15);
            // var colourNumber9 = Math.floor(Math.random() * 15);

            // const g3 = {Name:"FullPrice", TourTypeId:OldTown2._id,Colour:"c"+colourNumber8};
            // const g4 = {Name:"Concession", TourTypeId:OldTown2._id,Colour:"c"+colourNumber9};

            // var colourNumber10 = Math.floor(Math.random() * 15);
            // var colourNumber11 = Math.floor(Math.random() * 15);
            // var colourNumber12 = Math.floor(Math.random() * 15);
            // var colourNumber13 = Math.floor(Math.random() * 15);

            // const g5 = {Name:"Moose", TourTypeId:Castle1._id,Colour:"c"+colourNumber10};
            // const g6 = {Name:"Duck", TourTypeId:Castle1._id,Colour:"c"+colourNumber11};
            // const g7 = {Name:"Gnome", TourTypeId:Castle1._id,Colour:"c"+colourNumber12};
            // const g8 = {Name:"Unicorn", TourTypeId:Castle1._id,Colour:"c"+colourNumber13};

            // guests.push(g1);
            // guests.push(g2);
            // guests.push(g3);
            // guests.push(g4);
            // guests.push(g5);
            // guests.push(g6);
            // guests.push(g7);
            // guests.push(g8);

            //await client.db("Carlos").collection("Guests").insertMany(guests);

            // var tours=[];
            // const tour = {TourTypeId:OldTown1._id, BookingPlatformId:BookingPlatform1._id, Number:0, Guest:guests._id, Date:"01/01/1988"};
           

            // tours.push(tour);
           
            
            // await client.db("Carlos").collection("Tours").insertMany(tours);


        }
        catch(e){
            console.log(e); 
        }
       
    },



}