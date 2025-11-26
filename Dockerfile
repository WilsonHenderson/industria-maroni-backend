# Dockerfile para publicar o backend Flask no Cloud Run
FROM python:3.11-slim

WORKDIR /app

# Copia requirements e instala as dependências
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copia o código da aplicação
COPY . /app

# Porta que o Cloud Run espera
ENV PORT=8080
EXPOSE 8080

# Usa gunicorn para execução em produção
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:8080", "--workers", "2"]
