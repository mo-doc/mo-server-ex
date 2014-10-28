mo-server
=========
[![Build Status](https://travis-ci.org/mo-doc/mo-server-ex.svg?branch=master)](https://travis-ci.org/mo-doc/mo-server-ex)

#Get Started

##NodeJs config

npm install

node ./bin/www

##MongoDB config

mkdir /data/db mongodb --dbpath /data/db
default port at 27017

##Running test

npm test OR  moncha

#api

* [`insert a component`](#insertComponent)
* [`select a component`](#selectComponent)
* [`select components`](#selectComponents)
* [`update a compoent`](#updateComponent)
* [`list components by classification`](#getComponentsByClassification)
* [`list components by keyword`](#keywordFilter)


<a name="insertComponent" />
##insert component information

  POST:"api/component/add"
  
  request:
  
  {
      title:'title',
      intro:'your component introduction',
      demo:'your component demo',
      verify:0,
      codelink:'git@yourcomponent'
      keyword:'keyword1,keyword2,keyword3', 
      classify:'base'
  }
  
  response:
  
  if success

      code:200
  
  if error
  
      code:500,
      msg:'errorreson'

<a name="selectComponent" />
##select a component
	
  POST:"api/component/findOne"

  request:
	any {key:value} that can specify a component

  response:
	component Object

<a name="selectComponents" />
##select components

  POST:"api/component/find"

  request:
	any {key:value} that can specify a group of components

  response:
	components list


<a name="updateComponent" />
##update a component

  POST:"api/component/remove"

  request:
	any {key:value} that can specify a component

  response:

  if success

      code:200
  
  if error
  
      code:500,
      msg:'errorreson'


<a name="getComponentsByClassification" />
##get components by classification

  GET:'api/component/listbyclassify'

  response:

  [
   {
    classify: "util",
    list: [ ]
   },
   {
    classify: "base",
    list: [ ]
   },
   {
    classify: "server",
    list: [ ]
   }
  ]


<a name="keywordFilter" />
##list components by keyword

  GET:'api/component/keywordfilter?keyword=****'

  response:

  [
   {
    classify: "util",
    list: [ ]
   },
   {
    classify: "base",
    list: [ ]
   },
   {
    classify: "server",
    list: [ ]
   }
  ]
