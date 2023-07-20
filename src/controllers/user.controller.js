//Autores: Vasquez Miguel, Alexandra Ivana & Barandiaran Japaja, Jhossepy Alexander & Marquez Mendez, Andrea Janet.
//importa los modelos a usar
const User = require('../models/User');
const Institution = require('../models/Institution');
const InstitutionStudent = require('../models/InstitutionStudent');
const CycleScheduleByInstitution = require('../models/CycleScheduleByInstitution');
const InstitutionStudentClassSchedule = require('../models/InstitutionStudentClassSchedule');
const UserService = require('../models/UserService');
const Price = require('../models/Price');
const UserTicket = require('../models/UserTicket');
const UserTicketDetail = require('../models/UserTicketDetail');
const ClassSchedule = require('../models/ClassSchedule');
const Companie = require('../models/Companie');
const TripControl = require('../models/TripControl');


//crea un objeto donde iran los metodos
const userCtrl = {};

//importa modulo passport
const passport = require('passport');
const nodemailer = require('nodemailer');

//por cada direccion renderiza una vista diferente
userCtrl.renderLogin = (req, res) => {
    res.render('user/login');
};

//si el ingreso de sesion es exitoso o falla te redirige a una vista diferente
userCtrl.login = passport.authenticate('local', {
    failureRedirect: '/user/login',
    successRedirect: '/dashboard',
    failureFlash: true
});

userCtrl.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Sesión cerrada exitosamente');
        res.redirect('/user/login');
    });
    /*
    req.flash('success_msg', 'Sesión cerrada exitosamente');
    res.redirect('/user/login');
    */
};

userCtrl.renderSignup = async (req, res) => {

    try{

        const institutions = await Institution.find();
            console.log(institutions);
        res.render('user/signupForm1', {institutions});
        
    }catch(e){
        console.log(e);
    }

};


let institutionGlobal, institutionUserGlobal;

userCtrl.signupForm1 = async (req, res) => {
    try{

        const {institution, user} = req.body;

        const institutionFound = await Institution.findOne({name: institution});
        institutionGlobal = institutionFound;
                                                                                        console.log(institutionFound);

        const institution_id = institutionFound._id;

        const institutionStudentFound = await InstitutionStudent.findOne({user: user, institution_id: institution_id});
        institutionUserGlobal = institutionStudentFound;
                                                                                        console.log(institutionStudentFound);

        const cycleSchedulesByInstitutionArray = await CycleScheduleByInstitution.find({institution_id: institution_id});
                                                                                        console.log(cycleSchedulesByInstitutionArray);

        if(institutionStudentFound){
            res.render('user/signupForm2', {institutionStudentFound, institutionFound, cycleSchedulesByInstitutionArray});
        }else{
            req.flash('error_msg', 'No te encuentras en esta institución');
            res.redirect('/user/signup');
        }

    
    }catch(e){
        console.log(e);
    }

};

userCtrl.signupForm2 = async (req, res) => {
    try{
        const {cycles, card} = req.body;
        console.log(req.body, institutionGlobal, institutionUserGlobal);
        
        


        const cyclesArray = [];

        for (const cycle of cycles) {
            const cycleScheduleByInstitutionFound = await CycleScheduleByInstitution.findById(cycle);
            console.log("CycleScheduleByInstitution",cycleScheduleByInstitutionFound);
            cyclesArray.push(cycleScheduleByInstitutionFound);
        }
        console.log("CycleScheduleByInstitutionArray",cyclesArray);

 

                                                
        const newUser = new User({
            user: institutionUserGlobal.user,
            document_type: institutionUserGlobal.document_type,
            document_number: institutionUserGlobal.document_number,
            names: institutionUserGlobal.names,
            last_names: institutionUserGlobal.last_names,
            email: institutionUserGlobal.email,
            password: institutionUserGlobal.document_number,
            address: institutionUserGlobal.address,
            campus: institutionUserGlobal.campus,
            phone_number: institutionUserGlobal.phone_number,
            college_career: institutionUserGlobal.college_career,
            course: institutionUserGlobal.course,
            gender: institutionUserGlobal.gender,
            age: institutionUserGlobal.age,
            cycles: cyclesArray.length,
            institution_id: institutionGlobal._id
        });

        newUser.password = await newUser.encryptPassword(institutionUserGlobal.document_number);
        await newUser.save();
        console.log(newUser);

        const user_id = newUser._id;


        




        const start_service = cyclesArray[0].cycle_start;
        const end_service = cyclesArray[cyclesArray.length - 1].cycle_end;

        const newUserService = new UserService({
            start_service: start_service,
            end_service: end_service,
            user_id:  user_id
        });

        await newUserService.save();
        console.log(newUserService);





 
        const institution_student_id = institutionUserGlobal._id;

        const institutionStudentClassScheduleArray = await InstitutionStudentClassSchedule.find({institution_student_id: institution_student_id});

        for (const institutionStudentClassSchedule of institutionStudentClassScheduleArray) {
            
            const newClassSchedule = new ClassSchedule({
                day: institutionStudentClassSchedule.day,
                start_hour: institutionStudentClassSchedule.start_hour,
                end_hour: institutionStudentClassSchedule.end_hour,
                class: institutionStudentClassSchedule.class,
                user_id: user_id
            });
    
            
            await newClassSchedule.save();
            console.log(newClassSchedule);

        }





        const userPricePerTrip = await Price.findOne({name:"User Price Per Trip"});
        const userPricePerTripPrice = userPricePerTrip.price;
        console.log(userPricePerTrip);
        console.log(userPricePerTripPrice);

        const classSchedule = await ClassSchedule.find({user_id: user_id}).distinct('day');
        const differentDays = classSchedule.length;
        console.log(classSchedule);
        console.log(differentDays);

        const institutionWeeksPerCycle = institutionGlobal.weeksPerCycle;
        console.log(institutionWeeksPerCycle);

        const cyclesWithService = cyclesArray.length;
        console.log(cyclesWithService);

        const userServicePrice = userPricePerTripPrice * differentDays * institutionWeeksPerCycle * cyclesWithService;
        console.log(userServicePrice);


        const userRegistration = await Price.findOne({name:"User Registration"});
        const userRegistrationPrice = userRegistration.price;
        console.log(userRegistration);


        const total = userServicePrice + userRegistrationPrice;
        console.log(total);






        const total_trips = differentDays * institutionWeeksPerCycle * cyclesWithService;
        console.log(total_trips);

        const newTripControl = new TripControl({
            total_trips: parseInt(total_trips),
            taken_trips: 0,
            untaken_trips: parseInt(total_trips),
            user_id:  user_id
        });

        await newTripControl.save();
        console.log(newTripControl);







        const companieInfo = await Companie.findById('648ba532a5f1532634da4949');
                        console.log(companieInfo)

        const companie_id = companieInfo._id;
                            console.log(companie_id)
        
        const newUserTicket = new UserTicket({
            date: Date.now(),
            description: "Monto total",
            amount: parseInt(total),
            companie_id: companie_id,
            user_id: user_id
        });

        await newUserTicket.save();
                            console.log(newUserTicket)

        const user_ticket_id = newUserTicket._id;
                            console.log(user_ticket_id)





                            
        const amounts = [parseInt(userRegistrationPrice), parseInt(userServicePrice)];
        const descriptions = ["Monto de matricula para usuarios", "Monto por cantidad de viajes"];
                            console.log(amounts, descriptions)

        for (let index = 0; index < amounts.length; index++) {

            const newUserTicketDetail = new UserTicketDetail({
                amount: amounts[index],
                user_ticket_id: user_ticket_id,
                description: descriptions[index]
            });

            await newUserTicketDetail.save();
            console.log(newUserTicketDetail)
        }






        const contentHTML = `
        <h1>Has sido registrado correctamente ¡Bienvenido a Busspress!</h1>
        <p>Este es tu recibo electrónico<p>
        <p>Tu contraseña por defecto es tu número de DNI</p>
        <ul>
            <li>Monto total: S/.${total} cargado al número de tarjeta ${card}</li>
            <li>${descriptions[0]}: S/.${amounts[0]}</li>
            <li>${descriptions[1]}: S/.${amounts[1]}</li>
        </ul>
        `;

        const to = newUser.email;
            
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // upgrade later with STARTTLS
            auth: {
                user: "busspressenterprise@gmail.com",
                pass: "ynyrcscacpgkzxwo",
            },
        });
                console.log("Envia correo 1")
                console.log(transporter)

        const info = await transporter.sendMail({
            from: "'Busspress' <busspressenterprise@gmail.com>",
            to: to,
            subject: "Comienza a usar Busspress",
            html: contentHTML
        });
                console.log("Envia correo 2")
                console.log(info)



        req.flash('success_msg', 'Usuario registrado exitosamente, revisa tu correo electronico');
        res.redirect('/user/login'); 
        
    }catch(e){
        console.log(e);
    }
};

/*

userCtrl.signup = async (req, res) => {
    const errors = [];
    const { 
        user,
        document_type,
        document_number,
        names,
        last_names,
        email,
        address,
        campus,
        phone_number,
        college_career,
        course,
        start_service,
        end_service,
        password,
        confirm_password
    } = req.body;

    const contentHTML = `
        <h1>Haz sido registrado exitosamente</h1>
        <p>Ingresa a Busspress con los siguientes datos</p>
        <ul>
            <li>Codigo: ${user}</li>
            <li>Contraseña: La que ingresaste en el formulario</li>
        </ul>
    `;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: "busspressenterprise@gmail.com",
          pass: "ynyrcscacpgkzxwo",
        },
    });

    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    
    if (password.length < 8) {
        errors.push({text: 'Las contraseñas deben tener al menos 8 caracteres'});
    }

    if (errors.length > 0) {
        res.render('admin/newuser', {
            errors,
            user,
            document_type,
            document_number,
            names,
            last_names,
            email,
            address,
            campus,
            phone_number,
            college_career,
            course,
            start_service,
            end_service,
            password,
            confirm_password
        });

    }else{

        const { 
            user,
            email,
            document_number
        } = req.body;

        //console.log(user, email, document_number);

        const user1 = await User.findOne({user: user}); 
        //console.log('Usuario', user1);
        if (user1) {
            errors.push({text: 'Ya existe un usuario con este codigo'});
        }
        
        
        const email1 = await User.findOne({email: email});
        //console.log('Email', email1);
        if (email1) {
            errors.push({text: 'Ya existe un usuario con este email'});
        }

        
        const document_number1 = await User.findOne({document_number: document_number});
        //console.log('Numero de documento', document_number1);
        if (document_number1) {
            errors.push({text: 'Ya existe un usuario con este numero de documento'});
        }

        if (errors.length > 0) {
            res.render('admin/newuser', {
                errors,
                user,
                document_type,
                document_number,
                names,
                last_names,
                email,
                address,
                campus,
                phone_number,
                college_career,
                course,
                start_service,
                end_service,
                password,
                confirm_password
            });
        }else{
            const newUser = new User({
                user,
                document_type,
                document_number,
                names,
                last_names,
                email,
                address,
                campus,
                phone_number,
                college_career,
                course,
                start_service,
                end_service,
                password
            });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();

            const info = await transporter.sendMail({
                from: "'Busspress' <busspressenterprise@gmail.com>",
                to: email,
                subject: "Comienza a usar Busspress",
                html: contentHTML
            });

            console.log('Correo enviado', info.messageId);

            req.flash('success_msg', 'Usuario registrado exitosamente, revisa tu correo electronico');
            res.redirect('/user/login'); 
            
        }
        
    }
};

*/




module.exports = userCtrl;