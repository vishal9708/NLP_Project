//import './badge'

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

var actual_text_length;
var result_text_length;

function word_count(text)
{
	var count = 0;

	for (var i = 0; i < text.length; i++) {
		var currentCharacter = text[i];

		if (currentCharacter == " ") {
			count += 1;
		}
	}
	count += 1;
  return count;
}


button1.addEventListener('click', async (event)=>{
	event.preventDefault();

	const textCorpus = document.getElementById('TextArea').value;

	actual_text_length = word_count(textCorpus);

    const element = document.getElementById('content');
	summarize(textCorpus).then((response)=>{
		var str = JSON.stringify(response);
		element.innerText = str;

		result_text_length = word_count(str);
		
	  
		let display_badge = `Well done! Your original text contains ${actual_text_length} words while the reduced summary contains only ${result_text_length} words`;
		const compareBox = document.getElementById('compare');
		compareBox.innerText = display_badge
	})
});

button2.addEventListener('click', async (event)=>{

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