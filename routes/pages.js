
const router = require('express').Router();
const fs = require('fs')

const HTML_routes = JSON.parse(fs.readFileSync(__dirname+"/routes.json"))
const titolo_pagina = "ticketTwo"
const descrizione_pagina = "Prenota i biglietti per i tuoi eventi preferiti. Su ticketTwo trovi concerti, sport, cinema e molto altro."
  
for(let i=0;i<HTML_routes.length;i+=1)
  router.get(HTML_routes[i].route,function(req, res) {createHTMLPage(res,titolo_pagina,descrizione_pagina,HTML_routes[i].name,HTML_routes[i].modules)});

function createHTMLPage(res,titolo,descrizione,pagina,moduli)
{
  res.write('<html id="page">\n');
  res.write('\
    <head>\
      <title>'+titolo+'</title>\
      <meta name="description" content='+descrizione+'></meta>'
  );
  for(let i=0;i<moduli.length;i+=1)
    res.write('\
    <script src="Librerie/'+moduli[i]+'.js"></script>\
    <link rel="stylesheet" href="Librerie/'+moduli[i]+'.css"></link>'
    )
  res.write('</head>')
  res.write('\
    <body id="body">\
      <script src="'+pagina+'.js">\
      </script>\
    </body>'
    );
  res.end('</html>');
}

module.exports = router;