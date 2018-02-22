const Sequelize=require("sequelize");

//establishing connection to mysql database
const connection=new Sequelize('sequelize_demo','root','',{
    host:'localhost',
    dialect:'mysql',
    define:{
        timestamps:false
    }
});

//definint model

// var Article=connection.define('article',{
//     title:Sequelize.STRING,
//     body:Sequelize.TEXT
// });2

//2nd way to define model
var Article=connection.define('article',{
    //slug is a string with removal of every space and alphanumeric character
    slug:{
        type:Sequelize.STRING,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
        validate:{
            len:{
                args:[2,10],
                msg:"please enter a character of length between 2 to 10"
            },
            is:{
                args:["^[a-z]+$",'i'],
                msg:"only letters are valid"
            }
        }
    },
    body:{
        type:Sequelize.TEXT
        // validate:{
        //     stringUppercase:function(value){
        //         var first=string.charAt(0);
        //         if(!first===first.toUppercase()){
        //             throw new Error("first letter must be uppercase");
        //         }
        //     }
        // }
    }

},{
    hooks:{
        beforeValidate:function(){
            console.log("before validate");
        },
        afterValidate:function(){
            console.log("after validate");
        },
        beforeCreate:function(res){
            console.log("before create",res);
        },
        afterCreate:function(res){
            console.log("after create",res.slug)
        }
    }
})


var User=connection.define('user',{
    username:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

//testing the connection
connection.authenticate()
.then(()=>{
    console.log("connection has been established sucessfully")
})
.catch((err)=>{
    console.log("unable to connect to database",err)
})


//inserting into table
Article.sync(
    {
        force:true//deletes a table if it already exist
        // logging:console.lo
    }
).then(()=>{
    return Article.create({
        slug:'title id',
        title:"sghh",
        body:"this is a body333"
    }).then(()=>{
        console.log("article inserted",Article.dataValues)
    })
    .catch((err)=>{
        console.log("error",err)
    });
});

User.sync().then(()=>{

    //creating a instance of user ,it wont save until we perform save funtion
    let userInstance= User.build({
        username:"sabin",
        password:'mysecretkey'
    });

    userInstance.save().then((user)=>{
        console.log("user",user.dataValues)
    });
})




//getting all data
// Article.findAll().then((articles)=>{
//     console.log("articles",articles);
//     console.log("articles datavalues",articles.dataValues);
//     console.log("articles",articles.length);
// })
// .catch((err)=>{
//     console.log(err)
// })




//connects to the database and automatically create a model in database
connection.sync();