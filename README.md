mo-server
=========

#Get Started

[please ensure the latest nodejs(v0.11+) is intalled
http://nodejs.org/dist/v0.11.14/]

npm install

node --harmony server

##Running test

npm test OR  moncha --harmony

#api

##insert component info

  POST:"/componentinfo"
  
  request:
  
  {
      keyword:'your component name',
      intro:'your component introduction',
      demo:'your component demo',
      verrify:0,
      codelink:'git@yourcomponent'
  }
  
  response:
  
  if success
  
  {
      code:200
  }
  
  if error
  
  { 
      code:500,
      msg:'errorreson'
  }
