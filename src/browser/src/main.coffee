app           = require 'app'
BrowserWindow = require 'browser-window'
jsonfile      = require 'jsonfile'
ipc           = require 'ipc'
_             = require 'lodash'
Auth          = require './auth'
Q             = require 'q'

mainWindow = null

app.on 'window-all-closed', -> app.quit()

app.on 'ready', ->
  global.consumerKey = "njiDlWzzRl1ReomcCmvhbarN7"
  global.consumerSecret = "rTOSMuY11adXXUxHHTlcNRWRZsutORnvgAl9eojb19Y77Ub78M"
  global.accountFilePath = "#{app.getPath('cache')}/accounts.json"

  loadMainWindow = ->
    mainWindow = new BrowserWindow 
      width: 1200
      height: 800
      'min-width': 840

    mainWindow.on 'closed', -> mainWindow = null
    #mainWindow.openDevTools()
    mainWindow.loadUrl "file://#{__dirname}/../../renderer/index.html"
  #accountFilePath = "accounts.json"
  accounts = []
  try
    accounts = jsonfile.readFileSync accountFilePath

  authenticate = ->
    d = Q.defer()
    auth = new Auth()
    auth.request()
      .then d.resolve
      .fail (error) ->
        console.log util.inspect(error)
    d.promise

  ipc.on 'authenticate-request', (event, arg) =>
    authenticate().then (account) ->
      account._id = accounts.length
      accounts.push account unless  _.includes(_.map(accounts, 'id'), account.id) 
      jsonfile.writeFile accountFilePath, accounts,  (err) ->
        event.sender.send 'authenticate-request-reply', accounts

  if accounts[0]?.accessToken? and accounts[0]?.accessTokenSecret?
    loadMainWindow()
  else
    authenticate().then (account) ->
      account._id = accounts.length 
      accounts.push account unless  _.includes(_.map(accounts, 'id'), account.id)
      jsonfile.writeFile accountFilePath, accounts,  (err) ->
        loadMainWindow()



