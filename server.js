import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
	if (err) {
		console.log(`Server is not listening on port : ${port}`);
	} else {
		console.log(`API listening on port ${port}`);
	}
});
