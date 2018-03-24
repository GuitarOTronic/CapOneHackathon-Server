const axios = require('axios');
const qs = require('qs');
const Promise = require('bluebird');
const moment = require('moment');

function getAccessToken() {
  // POST URL: 'https://api.dxhackathon.com/oauth2/token'
  return new Promise((resolve, reject) =>{

    var clientId = process.env.CLIENT_ID
    var clientSecret = process.env.CLIENT_SECRET
    var url = 'https://api.dxhackathon.com/oauth2/token'
    var body = qs.stringify({client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials"})

    var headers = {'Content-Type': "application/x-www-form-urlencoded",
    'Accept': "application/json"}

    var accToke

    axios({
      method: 'post',
      url: url,
      headers: headers,
      data: body
    }).then(response => {
      //return accessToken
      console.log('ACCESSTOLKEINRESPONSE', response.data.access_token);
      accToke = response.data.access_token
      resolve(accToke)
    })
    .catch(error => {
      console.log('ERROR', error);
      reject(error);
    });

  })
}

function getTransferEligibleList(userReference) {
  return new Promise((resolve, reject) =>{
    //get bank account info by userReference,
    getAccessToken()
    .then(accessToken=>{

      var url = 'https://api.dxhackathon.com/money-movement/accounts'
      var headers = {"Content-Type": "application/json", "Authorization":"Bearer " + accessToken, "Accept": "application/json;v=0"}
      var retrievedAcct = { }
      return axios({
        method: 'get',
        url: url,
        headers: headers
      })
    })
    .then(response=>{
      console.log('LISTRESPONSE', response.data);
      let matches = response.data.accounts.filter((account)=>{
        console.log(userReference, account.moneyMovementAccountReferenceId)
        if (account.moneyMovementAccountReferenceId == userReference) {
          return true
        }
        return false
      })
      console.log('matches: ', matches)
      if (matches[0]) return resolve(matches[0])
    })
    .catch(error => {
      console.log('ERROR', error);
      reject(error);
    });
    //attach to data object and return

  })
}

function scheduleTransfer(originAccountRefId, destinationAccountRefId, amount, memo = 'allowance') {
  return new Promise((resolve, reject)=>{

  getAccessToken()
  .then(accessToken=>{

    console.log("timestamp", moment().format("YYYY-MM-DD"));
    transferDate = moment().format("YYYY-MM-DD");

    var url = 'https://api.dxhackathon.com/money-movement/transfer-requests'
    var body = {
      "originMoneyMovementAccountReferenceId": originAccountRefId,
      "destinationMoneyMovementAccountReferenceId": destinationAccountRefId,
      "transferAmount": amount,
      "currencyCode": "USD",
      "transferDate": transferDate,
      "memo": "for investments",
      "transferType": "Internal",
      "frequency": "OneTime"
    }


    var headers = {"Content-Type": "application/json", "Authorization": "Bearer "+ accessToken, "Accept": "application/json;v=0"}
    return axios({
      method: 'post',
      url: url,
      headers: headers,
      data: body
    })
  })
    .then(response => {
      //return accessToken
      console.log('TRANSFERRESPONSE', response.data);
      resolve(response.data)
    })
    .catch(error => {
      console.log('ERROR', error);
      reject(error);
    });


  })

}

module.exports = {
  getAccessToken,
  getTransferEligibleList
 }
