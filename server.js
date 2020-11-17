const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
// middle ware
app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(
    bodyParser.json({
        type: ['application/json', 'text/plain'],
    })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/download', function(req, res){ 
    res.download('Hello.txt'); 
});

// file upload api
app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;
    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        
        const buf = fs.readFileSync(`${__dirname}/public/${myFile.name}`, (err) => {
            if (err) console.log(err);
        });

    const data = buf.toString();
    res.send({state: data, name: myFile.name});
    fs.unlink(`${__dirname}/public/${myFile.name}`, (err) => {
      if(err){
        console.log(err);
      }
      else{
        console.log(`${__dirname}/public/${myFile.name}` + ' was deleted');
      }
    });
    });
})
app.listen(4500, () => {
    console.log('server is running at port 4500');
})