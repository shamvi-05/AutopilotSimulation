const API_KEY = "ADD-YOUR-OWN-OPENAI-API-KEY";
const MODEL_TYPE = "gpt-3.5-turbo"; //chatGPT model

// Creates a custom menu in Google Docs
function onOpen() {
  DocumentApp.getUi().createMenu("ChatGPT")
      .addItem("Paraphaser", "generateParagraph")
      .addToUi();
}



// Generates prompt based on the selected text and adds it to the document
function generateParagraph() {
  const doc = DocumentApp.getActiveDocument();
  const selectedText = doc.getSelection().getRangeElements()[0].getElement().asText().getText();
  const body = doc.getBody();
  const prompt = "Generate another paragraph with same meaning" + selectedText;
  const temperature = 0;
  const maxTokens = 2060;

  const requestBody = {
    model: MODEL_TYPE,
    messages: [{role: "user", content: prompt}],
    temperature,
    max_tokens: maxTokens,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    payload: JSON.stringify(requestBody),
  };


  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  const responseText = response.getContentText();
  const json = JSON.parse(responseText);
  const generatedText = json['choices'][0]['message']['content'];
  Logger.log(generatedText);
  body.appendParagraph(generatedText.toString());
}