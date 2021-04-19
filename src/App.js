import React,{useState} from "react";
import {Input , InputGroup ,InputGroupAddon,Button
,Row,Col,Card,CardBody,CardText} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [rawdata, setRawdata] = useState("");
  const [percent, setPercent] = useState(0);
  const [moredaays, setMoredaays] = useState()
  const [result, setResult] = useState({
    totalDays:"--",
      Present:"--",
      Absent:"--",
      Attendencepercent:"--"
  })
  const CalculateData=()=>{
    if (rawdata.charAt(29)===" ") {
      CalculateDataforsamsungusers();
    }
    else {
      CalculateDataforordinaryusers();
    };
  };
  const CalculateDataforsamsungusers=()=>{
    var PandAforsam = [];
    if (rawdata.length<=1) {
      alert("Enter The Copied Content");
    }
    else{
      for (let index = 44,i=1,j=0; index <= rawdata.length; index=(index+44)+1,i++,j++) 
      {
        var calP  = (44*i)+j;
       PandAforsam.push(rawdata.charAt(calP));
     };
     let Pforsam = 0;
     let Aforsam = 0;
     for (let index = 0; index < PandAforsam.length; index++) 
     {
       if (PandAforsam[index]==="P") {
        Pforsam++;
       }
       else if (PandAforsam[index]==="A") {
         Aforsam++;
       };
     };
     var totalDaysforsam = Pforsam+Aforsam;
    if (totalDaysforsam===0) {
      alert("Enter Valid TEXT OR check the copied content")
    }
    else{
      var Attendencepercentforsam = parseFloat((Pforsam*100)/totalDaysforsam).toFixed(2);
    setResult({
      totalDays:totalDaysforsam,
      Present:Pforsam,
      Absent:Aforsam,
      Attendencepercent:Attendencepercentforsam
    })
    setPercent(Attendencepercentforsam);
    };
    if (Attendencepercentforsam<75) {
      var moredaysforsam = parseInt(((75*totalDaysforsam)-(100*Pforsam))/25);
      setMoredaays(moredaysforsam);
    }
    };
  };



  const CalculateDataforordinaryusers=()=>{
    var PandA = [];
    if (rawdata.length<=1) {
      alert("Enter The Copied Content");
    }
    else{
    for (let index = 50,i=1,j=-1; index <= rawdata.length; index=(index+50)+1,i++,j++) {
       var calP  = (50*i)+j;
      PandA.push(rawdata.charAt(calP));
    };
    let P = 0;
    let A = 0;
    for (let index = 0; index < PandA.length; index++) {
      if (PandA[index]==="P") {
       P++;
      }
      else if (PandA[index]==="A") {
        A++;
      }
    }
    var totalDays = P+A;
    if (totalDays===0) {
      alert("Enter Valid TEXT OR check the copied content")
    }
    else{
    var Attendencepercent = parseFloat((P*100)/totalDays).toFixed(2);
    setResult({
      totalDays:totalDays,
      Present:P,
      Absent:A,
      Attendencepercent:Attendencepercent
    })
    setPercent(Attendencepercent);
  };
  if (Attendencepercent<75) {
    var moredays = parseInt(((75*totalDays)-(100*P))/25);
    setMoredaays(moredays);
  }
  };
  };
  const clear = ()=>{
    setRawdata("");
  }
  return (
    <div >
      <h2 className="mt-2" 
      style={{
        position:"absolute" ,
        left:"20%",
        right:"20%",
        color:"#F7CD2E"
      }}>Calculate Your Attendence % Here ...</h2>
      <InputGroup  className="w-75"
      style={{position:"absolute" ,top:"30%",left:"20%",right:"20%",height:"40px"}}>
      <Input
      placeholder="Enter copied TEXT from RITAGE"
      value={rawdata}
      onChange={(e)=>{setRawdata(e.target.value)}}/>
         <InputGroupAddon addonType="prepend" className="w-25">
      <Button
      color="primary"
      onClick={clear}
      >x</Button>
      </InputGroupAddon>
      </InputGroup>
      <Button 
        color="info"
       style={{position:"absolute", top:"41%",left:"37%",right:"20%"}}
        onClick={CalculateData}>
          Calculate
        </Button>
    <Row style={{position:"absolute", top:"52%",left:"20%",right:"20%"}}>
      <Col>
      <Card>
        <CardBody>
          <CardText>
            <span>Total Days : {result.totalDays}</span><br/>
            <span>Present Days : {result.Present}</span><br/>
            <span>Absent Days : {result.Absent}</span><br/>
           {percent<=75?
           <>
            <span className="text-danger">Attendence percentage : {result.Attendencepercent}%</span><br/>
            <span className="text-danger">More days needed : {moredaays}</span>
            </>         
                     :
           <span className="text-success">Attendence percentage : {result.Attendencepercent}%</span>          
            }
          </CardText>
        </CardBody>
      </Card>
      </Col>
    </Row>
    </div>
  );
}

export default App;
