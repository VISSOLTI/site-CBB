from flask import Flask, render_template, redirect, request, flash, session, send_from_directory
from werkzeug.utils import secure_filename
import os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cadastro.db'  # Replace with your desired database URI
app.config['UPLOAD_FOLDER'] = 'ARQUIVOS CADASTRO'  # Define upload folder

db = SQLAlchemy(app)

# Define the Cliente model
class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    razao_social = db.Column(db.String(100), nullable=False)
    cnpj_cpf = db.Column(db.String(20), nullable=False)
    nome_fantasia = db.Column(db.String(100))
    canal = db.Column(db.String(50))
    tel_cliente = db.Column(db.String(20))
    e_mail = db.Column(db.String(100))
    vendedor = db.Column(db.String(50))
    supervisor = db.Column(db.String(50))
    dia_visita = db.Column(db.String(10))
    nome_solicitante = db.Column(db.String(100))
    tel_solicitante_cad = db.Column(db.String(20))
    funcao = db.Column(db.String(50))
    observacao = db.Column(db.Text)
    hora_do_cadastro = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/')
def home():
    return render_template('compras_online.html')

@app.route('/cadastrarUsuario', methods=['POST'])
def cadastrarUsuario():
    # Get form data
    razao_social = request.form.get('razao_social')
    cnpj_cpf = request.form.get('cnpj_cpf')
    nome_fantasia = request.form.get('nome_fantasia')
    canal = request.form.get('canal')
    tel_cliente = request.form.get('tel_cliente')
    e_mail = request.form.get('e_mail')
    vendedor = request.form.get('vendedor')
    supervisor = request.form.get('supervisor')
    dia_visita = request.form.get('dia_visita')
    nome_solicitante = request.form.get('nome_solicitante')
    tel_solicitante_cad = request.form.get('tel_solicitante_cad')
    funcao = request.form.get('funcao')  # Get the selected role
    observacao = request.form.get('observacao')
    hora_do_cadastro = datetime.now()

    # Create a new Cliente instance
    cliente = Cliente(
        razao_social=razao_social,
        cnpj_cpf=cnpj_cpf,
        nome_fantasia=nome_fantasia,
        canal=canal,
        tel_cliente=tel_cliente,
        e_mail=e_mail,
        vendedor=vendedor,
        supervisor=supervisor,
        dia_visita=dia_visita,
        nome_solicitante=nome_solicitante,
        tel_solicitante_cad=tel_solicitante_cad,
        funcao=funcao,
        observacao=observacao,
        hora_do_cadastro=hora_do_cadastro
    )

    # Add the new Cliente to the database (not needed here)
    db.session.add(cliente)
    db.session.commit()

    return render_template('upload_PDF.html')


# Upload PDF route
@app.route('/upload_file', methods=['GET', 'POST'])
def upload_file():  # Renamed route to reflect any file type
    if request.method == 'POST':
        uploaded_files = request.files.to_dict().values()  # Get all uploaded files

        uploaded_filenames = []  # List to store uploaded filenames (including empty ones)
        for uploaded_file in uploaded_files:
            filename = secure_filename(uploaded_file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

            # Optional file size validation (adjust limit as needed)
            if uploaded_file.content_length > 1024 * 1024 * 5:  # 5MB limit
                print(f"File too large: {filename}")
                continue  # Skip saving this file if too large

            if uploaded_file.filename:  # Check if filename is not empty
                uploaded_filenames.append(filename)
                uploaded_file.save(filepath)
                print(f"Uploaded: {filename}")
            else:
                print(f"Empty file: {filename}")  # Log empty file information (optional)

        # Handle empty files (optional)
        if not uploaded_filenames:
            return "No files uploaded!", 400  # Bad request (adjust message as needed)

        return f"FINALIZADO"  # Display uploaded filenames
    else:
        return render_template('upload_pdf.html')  # Update template name if needed



# Para rodar funcionar e acessar o site
if __name__ in "__main__":
    with app.app_context():
         db.create_all()

         # Create the upload folder if it doesn't exist
         os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    app.run(debug=True)








