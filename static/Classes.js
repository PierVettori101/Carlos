

function Guest(tourTypeId,name,price,colour){
    const g ={};
    g.TourTypeId=tourTypeId;
    g.Name=name;
    g.Price=price;
    g.Colour=colour;
    return g;
}

function TourType(name,time,colour,free){
    const t ={};
    t.Name=name;
    t.Time=time;
    t.Colour=colour;
    t.Free=free;
    return t;
}

function Tour(tourTypeId,bookingPlatformId,guestId,guideId,number,date){
    
    var dat = new Date(date);
    dat.setHours(0,0,0,0);
    const t ={};
    t.TourTypeId = tourTypeId;
    t.BookingPlatformId = bookingPlatformId;
    t.GuestId=guestId;
    t.GuideId=guideId;
    t.Number=number;
    t.Date=dat;
    return t;
}

function Guide(fullName,userName,email,password,colour){
    const g = {
        FullName:fullName,
        UserName:userName,
        Email:email,
        Password:password,
        Colour:colour
    };
    return g;
}

function GuideSale(tourTypeId,guideId,guestId,number,date){
    var dat = new Date(date);
    dat.setHours(0,0,0,0);
    const g ={};
    g.TourTypeId = tourTypeId;
    g.GuideId = guideId;
    g.GuestId = guestId;
    g.Number = number;
    g.Date = dat;
    return g;
}