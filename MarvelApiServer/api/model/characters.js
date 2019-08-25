exports = module.exports = function(app, mongoose) {

	var charactersSchema = new mongoose.Schema({
		id: 		{ type: Number },
		name: 		{ type: String },
		url: 	{ type: String },
		image:  	{ type: String },
		description: 	{ type: String },
		user: {type:String}
	});

	mongoose.model('character', charactersSchema);

};