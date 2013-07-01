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
		joined: 		{ type: Date, default: Date.now }, 
		subs: 			[String],
		email: 			{type: String, set: toLower, lowercase: true},
		image: 			String, //fix
		karma: 			{ type: Integer, default: 0 },
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
	date: 		{ type: Date, default: Date.now },
	content: 	{type: String, required: true},
	tr_content: {},
	subs: 		{type: [String], default: [] }, //ObjectId?
	karma: 		{ type: Integer, default: 0 },
});

exports.CommentSchema = new Schema({
	owner: 		Schema.ObjectId,
	thread: 	Schema.ObjectId,
	parent: 	Schema.ObjectId,
	local_id: 	Integer,
	date: 		{ type: Date, default: Date.now },
	lang: 		{type: String, required: true},
	content: 	{type: String, required: true},
	tr_content: {},
	karma: 		{ type: Integer, default: 0 },
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
	date: 		{ type: Date, default: Date.now }, 
});
