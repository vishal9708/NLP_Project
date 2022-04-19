const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

button1.addEventListener('click', async (event)=>{
	event.preventDefault();

	const textCorpus = document.getElementById('TextArea').value;
    const element = document.getElementById('content');
	summarize(textCorpus).then((response)=>{
		element.innerText = JSON.stringify(response);
	})
});

button2.addEventListener('click', async (event)=>{
	event.preventDefault();

	const textCorpus = document.getElementById('TextArea').value;
    const element = document.getElementById('content');
	paraphrase(textCorpus).then((response)=>{
		element.innerText = JSON.stringify(response);
	})
});

async function summarize(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

async function paraphrase(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/tuner007/pegasus_paraphrase",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}