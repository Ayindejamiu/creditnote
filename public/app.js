(function(){
var app = angular.module("myApp");

const mainFunc = function($scope, $location,$firebaseArray, $firebaseObject){

   // $scope.Creditlist =[ ];

$scope.headertext="Mainstream Credit Note App";

};




//Data Controlller
const dataController = function($scope, $location, $firebaseArray, $firebaseObject){
     $scope.Export = function () {
                html2canvas(document.getElementById('credittable'), {
                    onrendered: function (canvas) {
                        var data = canvas.toDataURL();
                        var docDefinition = {
                            content: [{
                                image: data,
                                width: 500
                            }]
                        };
                        pdfMake.createPdf(docDefinition).download("Table.pdf");
                    }
                });
     }

  var firebaseConfig = {
    apiKey: "AIzaSyAmar9zMFpPwEkkx5yKB7vLYixIIm10rPs",
    authDomain: "creditnote-b3bf2.firebaseapp.com",
    projectId: "creditnote-b3bf2",
      databaseURL:"https://creditnote-b3bf2-default-rtdb.firebaseio.com/",
    storageBucket: "creditnote-b3bf2.appspot.com",
    messagingSenderId: "307055955080",
    appId: "1:307055955080:web:c067e9d7c9be1c4623633d"
  };

    firebase.initializeApp(firebaseConfig);
        
               
         var ref = firebase.database().ref('creditnote');
        var reflist = $firebaseArray(ref);
        reflist.$loaded().then(function(){ 
           $scope.Creditlist = reflist;
            
           // $scope.Creditlist= reflist; 
            
            
        });
   
    $scope.limit = 10;
    $scope.loadMore = function() {         
    var increamented = $scope.limit + 10;
    $scope.limit = increamented > $scope.Creditlist.length ? $scope.Creditlist.length : increamented;
       
    };

     $scope.logFunc = function(u,v,w,x,y,p,q,r){
        
         
         let data = {Insurer: u,
                     Underwriter: v, 
                     Iclass: w,
                     Premium: x, 
                     Commission: y, 
                     Netpremium: p,
                     MyStartdate: q.toDateString(),
                     MyEnddate: r.toDateString(), 
                    timestamp:firebase.database.ServerValue.TIMESTAMP}
         var ref = firebase.database().ref('creditnote');
        var reflist = $firebaseArray(ref);
        reflist.$add(data).then(function(){ 
            alert("Credit Note added"); 
            $location.path("data");
            
            
           
            
       // $scope.todo.push(data);
        $scope.logFunc = "";
    }, function(error){
            alert(error)
        });
        
        $scope.logFunc = "";
        
    }
   /* $scope.logFunc = function(u,v,w,x,y,p,q,r){
      

       
        if(u !='' && v !='' && w !='' && x !='' && y !='' && p !='' && q !='' && r !=''){

           //alert(`${u} and ${v} and ${w} and ${x} and ${y}`);



            const d = new Date();
        const mydate = d.toLocaleDateString();
        const myHour = d.getHours;
        const myMinute = d.getMinutes;
        const mySeconds = d.getSeconds;
        const myTime = d.getTime;
        const pushLog = {
        
            codetitle:u,
            codedet:v,
            codemyClass:w,
            codeAmountInsured:x,
            codeCommission:y,
            codeNpremium:p,
            codeRealdate:q,
            codeEnddate:r,
            date: `${mydate}`
    
        }

         $scope.todo.push(pushLog);
        
        //console.log($scope.todo);

       
        alert("added");
        $location.path("data");

        }
        
        /* else {
            alert("One of the fields is empty");
        }


        

    }*/
$scope.delFunc = function(x){
const myConfirm = confirm (`Do you want to delete this`);

if (myConfirm==true){
      
    const delRef= firebase.database().ref(`creditnote`);
        delRef.orderByChild("timestamp").equalTo(x).on("child_added", function(snapshot){
            let myKey = snapshot.key;
            
            const delRef1= firebase.database().ref(`creditnote/${myKey}`);
            const dellist = $firebaseObject(delRef1);
            dellist.$remove().then(function(){
                alert("item deleted Sucessfully");
                $route.reload();
            })
             
        }, function(err){
            alert(err)
        })
}
    
        
    }
      

    //Edit Function

    $scope.editFunc = function(u,v,w,x,y,z,p,q,r){
        
 $location.path(`editlog/${u}/${v}/${w}/${x}/${y}/${z}/${p}/${q}/${r}`);


    }

    //Print Function 
    $scope.printme = function(u,v,w,x,y,p,b,c,z) {
        const mydate = b;
        const enddate = c;
        
        
      
    var printContents = `<table class="table table-hover table-dark" style="margin-top:270px">
    <tbody>
        <tr>
        <td>Class: ${w} Insurance Policy</td>
            <td colspan="2"> <h2>Credit Note</h2></td>
            <td> Date: ${mydate} </td>
        </tr>
        <tr><td colspan="3" rowspan="2"> <h3> ${v} </h3> </td>
        <td> Branh: Abuja</td>
        </tr>
        <tr> 
        
        <td> Gross Premium: &#8358; ${x} </td></tr>
        <tr> 
        <td colspan="3">Insured Name: ${u} <br> Insured TBA <br> Policy No: TBA</td><td>Commission: &#8358; ${y} <br>Net Premium: &#8358; ${p}</td></tr>
        <tr> 
        <td colspan="4"> Transaction Details: Being premium on ${w} Insurance Policy for the Period of ${mydate} till ${enddate}</td></tr>
        <tr><td colspan="2">Checked By: </td> <td> Signature: </td> <td> Date: ${mydate} </td> </tr>
                </tbody> </table>

<table class="table table-hover table-dark" style="margin-top:120px">
<tbody>
        <tr>
        <td>Class: ${w} Insurance Policy</td>
            <td colspan="2"> <h2>Credit Note</h2></td>
            <td> Date: ${mydate} </td>
        </tr>
        <tr><td colspan="3" rowspan="2"> <h3> ${v} </h3> </td>
        <td> Branh: Abuja</td>
        </tr>
        <tr> 
        
        <td> Gross Premium: &#8358; ${x} </td></tr>
        <tr> 
        <td colspan="3">Insured Name: ${u} <br> Insured TBA <br> Policy No: TBA</td><td>Commission: &#8358; ${y} <br>Net Premium: &#8358; ${p}</td></tr>
        <tr> 
        <td colspan="4"> Transaction Details: Being premium on ${w}  Insurance Policy for the Period of ${mydate} till ${enddate}</td></tr>
        <tr><td colspan="2">Checked By: </td> <td> Signature: </td> <td> Date: ${mydate} </td> </tr>
                </tbody> </table>
<table class="table table-hover table-dark" style="margin-top:100px">
<tbody>
        <tr>
        <td>Class: ${w} Insurance Policy</td>
            <td colspan="2"> <h2>Credit Note</h2></td>
            <td> Date: ${mydate} </td>
        </tr>
        <tr><td colspan="3" rowspan="2"> <h3> ${v} </h3> </td>
        <td> Branh: Abuja</td>
        </tr>
        <tr> 
        
        <td> Gross Premium: &#8358; ${x} </td></tr>
        <tr> 
        <td colspan="3">Insured Name: ${u} <br> Insured TBA <br> Policy No: TBA</td><td>Commission: &#8358; ${y} <br>Net Premium: &#8358; ${p}</td></tr>
        <tr> 
        <td colspan="4"> Transaction Details: Being premium on  ${w} Insurance Policy for the Period of ${mydate} till ${enddate}</td> </tr>
        <tr><td colspan="2">Checked By: </td> <td> Signature: </td> <td> Date: ${mydate} </td> </tr>
                </tbody>
</table>`;
        
        
    var originalContents = document.body.innerHTML;        
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
        //$location.path("data");

                
}

    //Delete Logs
  /* / $scope.delFunc = function(x){
const myConfirm = confirm (`Do you want to delete this`);

if (myConfirm==true){
     $scope.todo.splice(x,1);
} else {return false}
    }*/
  }
  
// Edit Controller

const editController =function($scope,$routeParams, $location, $firebaseArray, $firebaseObject){

  
    

    $scope.eInsurer = $routeParams.x.Insurer;
    $scope.eUnderwriter = $routeParams.x.Underwriter;
    $scope.eIclass = $routeParams.x.Iclass;
    $scope.ePremium = $routeParams.x.Premium;
    $scope.eCommission = $routeParams.Commission;
    $scope.eNetpremium = $routeParams.Netpremium;
    $scope.eMyStartdate = $routeParams.MyStartdate;
    $scope.eMyEnddate = $routeParams.MyEnddate;
    $scope.eid = $routeParams.id;
    $scope.mydate= `${mydate}`

// Edit Function
     const delRef= firebase.database().ref(`creditnote`);
        delRef.orderByChild("timestamp").equalTo(x).on("child_added", function(snapshot){
            let myKey = snapshot.key;
            
            const delRef1= firebase.database().ref(`creditnote/${myKey}`);
            const dellist = $firebaseObject(delRef1);
            dellist.$remove().then(function(){
                alert("item deleted Sucessfully");
                $route.reload();
            })
             
        }, function(err){
            alert(err)
        })
    
     
    
  $scope.editFunc= function(u,v,w,x,y,p,q,r,z){
     
  

        $scope.todo[z]={
            codeInsurer:u,
            codeUnderwriter:v,
            codeIclass:w,
            codePremium:x,
            codePremium:x,
            codeCommission:y,
            codeNetpremium:p,
            codeMyStartdate:q,
            codeMyEnddate:r,
            date:`${mydate}`
        }

       
        alert("edited!")

        $location.path("data");
  }


  

   // alert(`${$scope.ptitle} and ${ $scope.dcode}`);
}

//Nothing comes above this comment

app.controller("editController", editController);
app.controller("dataController", dataController);
app.controller("myCtrl", mainFunc);

}());