//Librerías
const request = require('request');
const crypto = require('crypto');

//Archivo de configuración donde se almacena la llave de Api Marvel
const config = require('../../config/config');

var mongoose = require('mongoose');
var Character  = mongoose.model('character');

/**
 * GET /characters?name={name}&limit={limit}
 * Returns marvel characters that start with {name} and {limit} number of results
 */
exports.get = (req, res) => {
  try {

    //URL y Query Params
    const baseUrl = 'http://gateway.marvel.com/v1/public/characters';
    const query = `?limit=${req.query.limit}&nameStartsWith=${req.query.name}`;

    //Creación del HASH
    const timestamp = new Date().getTime();
    const hash = crypto.createHash('md5').update(timestamp + config.privateKey + config.publicKey).digest('hex');
    const auth = `&ts=${timestamp}&apikey=${config.publicKey}&hash=${hash}`;

    const url = `${baseUrl}${query}${auth}`;

    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (error, response, data) => {
      if (error) {
        console.log('Error:', error);
        res.send(error);
      } else if (response.statusCode !== 200) {
        console.log('Error', response.body);
        res.status(response.statusCode).send(response.body);
      } else {

        result = data.data.results.map(data => {
          return {
            id: data.id,
            name: data.name,
            url: data.urls[1] ? data.urls[1].url : data.urls[0].url,
            image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
            description: data.description === '' ? 'No description listed for this character.' : data.description
          }
        })
        res.send(result);
      }
    });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

//POST - Insert a new TVShow in the DB
exports.addCharacter = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var ncharacter = new Character({
		id:    req.body.id,
		name: 	  req.body.name,
		url:  req.body.url,
		image:   req.body.image,
    description:  req.body.description,
    user: req.body.user
	});

	ncharacter.save(function(err, ncharacter) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(ncharacter);
	});
};

//GET - Return all tvshows in the DB
exports.findLocalCharacters = function(req, res) {
  console.log(req.params.user);
	Character.find({user:req.params.user},function(err, lcharacters) {
    if(err) res.send(500, err.message);

    console.log('GET /Characters')
		res.status(200).jsonp(lcharacters);
	});
};