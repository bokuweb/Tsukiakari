BrowserWindow = require 'browser-window'
TwitterApi    = require 'node-twitter-api'
#jsonfile      = require 'jsonfile'
#config        = require 'config'
Q             = require 'q'
util          = require 'util'

loginWindow = null

class Auth
  constructor : ->
    #config = jsonfile.readFileSync "file://#{__dirname}/config.json"
    @twitter = new TwitterApi
      callback       : 'http://example.com'
      consumerKey    : consumerKey
      consumerSecret : consumerSecret

  request : ->
    d = Q.defer()
    @twitter.getRequestToken (error, requestToken, requestTokenSecret) =>
      if error
        console.log error
        d.reject error

      url = @twitter.getAuthUrl requestToken
      loginWindow = new BrowserWindow
        width  : 800
        height : 600

      loginWindow.webContents.on 'will-navigate', (event, url) =>
        event.preventDefault()
        matched = url.match /\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/
        if matched
          @twitter.getAccessToken requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) =>
            if error then d.reject error
            else
              @twitter.verifyCredentials accessToken, accessTokenSecret, (error, profile, response) =>
                if error then d.reject error
                else
                  setTimeout ->
                    loginWindow.close()
                    loginWindow = null
                  , 100
                  profile.accessToken = accessToken
                  profile.accessTokenSecret = accessTokenSecret
                  d.resolve profile

      loginWindow.webContents.session.clearStorageData {}, =>
        loginWindow.loadUrl url
    d.promise


module.exports = Auth
