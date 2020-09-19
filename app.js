//

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

// used/required in order to start using body parser in our code
// parses the html file
app.use(bodyParser.urlencoded({
	extended: true
}));
//needed this in order to post to the web pg

app.use(express.static("public"));


let items = ["get food", "make food", "eat food"];
let workItems = [];
let today = new Date();
let options = {
	weekday: "long",
	day: "numeric",
	month: "long"
};
let day = today.toLocaleDateString("en-US", options);


app.get("/", function(req, res) {

	res.render("list", {
		listTitle: day,
		newListItems: items
	});


}); // end of app.get"/"

app.get("/work", function(req, res) {
	res.render("list", {
		listTitle: "Work List",
		newListItems: workItems
	})
});

app.post("/", function(req, res) {
	let item = req.body.newItem;
	console.log(req.body);
	if (req.body.list === 'Work') {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}


});



app.listen(port, function() {
	console.log(`Server is running on port ${port}`);
});
