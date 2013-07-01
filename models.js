var mongoose = irequire("mongoose"),
	Schema = mongoose.Schema;

/* START UTILITY FUNCTIONS */	
function toLower(str) {
	return str.toLowerCase();
}
/*END UTILITY FUNCTIONS */

exports.UserSchema = new Schema({
	info: {
		name: 			{type: String, required: true},
		organization: 	String,
		langs: 			[String],
		view_langs: 	[String],
		site: 			String,
		blurb: 			String,
		joined: 		String, //fix
		subs: 			[String],
		email: 			{type: String, set: toLower, lowercase: true},
		image: 			String, //fix
		karma: 			Integer,
		upvoted:		[Schema.ObjectId],
		saved:			[Schema.ObjectId],
		nominations: 	{},
		nominated:		[String],
		connections: 	[Schema.ObjectId],
		messages:		[Schema.ObjectId],
	},
});

exports.PostSchema = new Schema({
	title: 		{type: String, required: true},
	lang: 		{type: String, required: true},
	tr_title: 	{}, 
	owner: 		Schema.ObjectId,
	date: 		String //fix
	content: 	{type: String, required: true},
	tr_content: {},
	subs: 		[String], //ObjectId?
	karma: 		Integer,
});

exports.CommentSchema = new Schema({
	owner: 		Schema.ObjectId,
	thread: 	Schema.ObjectId,
	parent: 	Schema.ObjectId,
	local_id: 	Integer,
	date: 		String, //fix
	lang: 		{type: String, required: true},
	content: 	{type: String, required: true},
	tr_content: {},
	karma: 		Integer,
});

exports.SubSchema = new Schema({
	name: 		{type: String, required: true, set: toLower, lowercase: true},
	mods: 		[Schema.ObjectId],
	logo: 		String, //fix
	color1: 	Integer, //hex?
	color2: 	Integer, //hex?
});

exports.MessageSchema = new Schema({
	sender: 	Schema.ObjectId,
	recipient: 	Schema.ObjectId,
	content: 	{type: String, required: true},
	date: 		String, //fix
});
