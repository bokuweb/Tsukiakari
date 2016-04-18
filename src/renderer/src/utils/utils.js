
export const decodeHtml = text => {
  const e = document.createElement('div');
  e.innerHTML = text;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

/*
 _htmlDecode = (text) ->
 e = document.createElement 'div'
 e.innerHTML = text
 if e.childNodes.length is 0 then "" else e.childNodes[0].nodeValue

 # TODO : move to item model
 decorateText : (text) =>
 strs =  text.split /(https?:\/\/\S+|\s?\#\S+)/
 for str in strs
 if str.match(/https?:\/\/\S+/)
 m "a[href='#']", { onclick : _openExternal.bind this, str}, str
 else if str.match(/^\#\S+|^\s\#\S+/)
 m "a[href='#']", { onclick : _openExternal.bind this, str}, str
 else m "span", _htmlDecode(str)
 */
