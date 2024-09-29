from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'TA_CLE_API_OPENAI'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text_to_translate = data.get('text')

    if not text_to_translate:
        return jsonify({'error': 'Aucun texte à traduire'}), 400

    # Appel à l'API GPT-4 pour la traduction
    response = openai.Completion.create(
        engine="gpt-4",
        prompt=f"Traduisez ce texte en français: {text_to_translate}",
        max_tokens=500
    )

    translated_text = response.choices[0].text.strip()

    return jsonify({'translation': translated_text})

if __name__ == '__main__':
    app.run(debug=True)
