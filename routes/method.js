const express=require("express");
const router=express.Router();
var bodyParser=require('body-parser');
var http=require('http');
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const fs=require("fs");
const { config } = require('process');
const { error } = require('console');
const { parse } = require('path');
var rddata=fs.readFileSync('./routes/datas.json');
const datta=JSON.parse(rddata);
var arr=require('./datas.json');
const { stringify } = require('querystring');

//  ----------------------------------------------
// GET REQUEST
// -----------------------------------------------
// eg localhost:6000/api
router.get('/',function(req,res){
  console.log(datta);
    res.send(datta); 
  });

// --------------------------------------------------  
// POST REQUEST
// -------------------------------------------------- 
//  for adding the below given datas only
//  eg  localhost:6000/api/add
router.post('/add',(req,res)=>{
  arr.push({"hospital_Name": "Hospital D",
  "Patient_Count": 50,
  "Location": "City A"})
  res.send(arr);
  fs.writeFileSync('datas.json',JSON.stringify(arr),function(err,data){
        if (err) {
          console.log("ERRORin writing file");
        }
  })
 })
// .......................................................
// for adding custom datas( give the data as params)
// eg localhost:6000/api/add_ob/christ hospital/589/DELHI

router.post("/add_ob/:hos_name/:pat_count/:loc",function(req,res){
    let hos_name=req.params.hos_name;
    let pat_count=req.params.pat_count;
    let loc=req.params.loc;
    arr.push({"hospital_Name" : hos_name,
        "Patient_Count": pat_count,
        "Location": loc,})
        
    res.send(arr);
    fs.writeFileSync('./method/datas.json',JSON.stringify(arr),function(err,data){
      if (err) {
        console.log("ERRORin writing file");
      }
    })  
})

// ------------------------------------------------------------------
   //  PUT REQUEST
// -------------------------------------------------------------------
// give the index of  hosptal data you need to UPDATE as params in :ind
  // GIVE hospital_Name   AS PARAMS IN :id For chnging name of hospital
      // then give the new name you need to give as param in :value
  // GIVE Location    AS PARAM IN :id FOR chnging location of hospital
  // GIVE Patient_Count AS PARAM IN  :id FOR chnging patient of hospital

  // eg: localhost:6000/api/update/0/hospital_Name/ABCD Hopital
  // eg: localhost:6000/api/update/1/Location/kochi

   router.put("/update/:ind/:id/:value",function(req,res){
   const index=req.params.ind;
   let id=req.params.id;
   let current_dt=arr[index];
   let chvalue=req.params.value;
   if (id=='hospital_Name') {
     current_dt.hospital_Name=(chvalue);
     console.log(current_dt);
     res.send(arr);
     fs.writeFileSync('datas.json',JSON.stringify(arr),function(err,data){
         if (err) {
              console.log("ERRORin writing file");
            }
         else{
             console.log(arr);
           }
        })
    }
   else if (id=='Location') {
        current_dt.Location=(chvalue);
        console.log(current_dt);
        res.send( arr);
        fs.writeFileSync('datas.json',JSON.stringify(arr),function(err,data){
           if (err) {
             console.log("ERRORin writing file");
            }
           else{
              console.log(arr);
            }
       })
    }
   else if (id=='Patient_Count') {
         current_dt.Patient_Count=(chvalue);
        console.log(current_dt);
        res.send(arr);
        fs.writeFileSync('datas.json',JSON.stringify(arr),function(err,data){
            if (err) {
              console.log("ERRORin writing file");
            }
            else{
               console.log(arr);
            }
        })
    }
   else {
       res.send("CHECK THE PARAMSS  ENTERED; SPELLING, CASE ,SPECIAL CHARA ETC; IT SHOULD BE hospital_Name ,Location ,Patient_Count AFTER update/ AND YOUR INDEX NUMBER")
    }
})
// ------------------------------------------------------------------------
//    DELETE REQUEST
// -----------------------------------------------------------------------
// give the index of  hosptal data you need to dlt as params in :ind
// eg: localhost:6000/api/delete/0  for deleting fst set of data.
router.delete("/delete/:ind",function(req,res){
  const indx=req.params.ind;
  let current_dt=arr[indx];
  console.log(delete arr[indx]);
  console.log(arr);
  res.send(arr);
  fs.writeFileSync('datas.json',JSON.stringify(arr),function(err,data){
     if (err) {
          console.log("error while writing the file");
        }
    })
});
module.exports=router;
  