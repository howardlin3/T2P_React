import React, {Component} from 'react';
import Woodstocks from "../images/Woodstock.jpeg"
import firebase from "firebase";


class PayCard extends Component{

  getPaymentRequest(paymentRequestID){
    var db = firebase.firestore();
    db.collection("paymentRequests").where("PaymentRequestID", "==", paymentRequestID)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              var requestData = doc.data();
              var amount = requestData.PaymentAmount;
              var phoneNumber = requestData.PhoneNumber; 
              var description = requestData.RequestDescription;
              console.log("amount: ", amount, "phone number: ", phoneNumber);
              document.getElementById("description").textContent = "@sdlkfsldkjf requests "+ amount+ " for "+ description; 
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }

  render(){
    var currentUUID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    console.log("THE MY VAR IS: "+ currentUUID);
    this.getPaymentRequest(currentUUID);

    return(
      <div className="card" style={{width:"450px",height:"525px", marginTop:"40px",display: "inline-block"}}>
        <div className="view overlay" >
          <img class="card-img-top" src={Woodstocks} alt="Card image cap"style={{display: "inline-block", width:"125px",height:"125px",borderRadius:"75px",marginTop:"40px"}}></img>
          <a href="#!">
            <div className="mask rgba-white-slight"></div>
          </a>
        </div>
        <div className="card-body" style={{width: "450px",height:"200px"}}>
          <h1 className="card-title" style = {{fontSize:"20px",textAlign: "center",marginTop: "5px"}}>Woodstocks Pizza</h1>
          <p id="description" className="card-text" style = {{fontSize:"16px",textAlign: "center",marginTop: "18px"}}> Someone requests $23.20 for 16 X-Large Cheese Pizza.</p>
          <a id="decline" href="home" className="btn btn-light" style = {{ width:"300px",height:"60px",fontSize:"16px",paddingTop: "18px",marginTop: "10px"}} > No Thanks</a>
          <br /> 
          <a id="pay" href="#" className="btn btn-info" style = {{ width:"300px",height:"60px",fontSize: "16px", paddingTop: "18px",marginTop: "10px"}} onclick="fadeButton()" > Pay Now</a>
          <br />
          <p id="report" className="card-text" style = {{fontSize: "14px",textAlign: "center",marginTop: "15px"}}>Think there was a mistake?  
            <a href="#" className="link" style = {{width:"250px",height:"35px",fontSize:"14px"}}> Report your error
            </a>
          </p>
          <a id="return" href="home2" className="btn btn-light" style = {{ width:"350px",height:"65px",fontSize:"16px",paddingTop: "22px",marginTop: "-80px",visibility: "hidden"}}> Return to Home</a>
          <a id="card" href="#" className="btn btn-light" style = {{ width:"350px",height:"65px",fontSize:"14px",paddingTop: "37px",marginTop: "15px",display: "inline-block",visibility: "hidden"}}>PayJunction balance:<br/><div style={{color:"#818181",marginTop:"10px",fontSize:"16px"}}>$573.29</div></a>
        </div>
      </div>
    );
  }
  
}

export default PayCard;