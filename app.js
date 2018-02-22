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
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT
    }

})

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
        title:"new titile ",
        body:"this is a body"
    });
});


//getting all data
Article.findAll().then((articles)=>{
    console.log("articles",articles);
    console.log("articles datavalues",articles.dataValues);
    console.log("articles",articles.length);
})
.catch((err)=>{
    console.log(err)
})




//connects to the database and automatically create a model in database
connection.sync();