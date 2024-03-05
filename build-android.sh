#!/bin/bash
set -e
echo -e "\033[1;33mPREPARAÇÃO:\033[0m Processando argumentos de CLI"
echo -e "Sem argumentos para processar"

echo -e "\033[1;33mPREPARAÇÃO:\033[0m Configurando variáveis de ambiente"
echo -e "Sem ambiente para carregar"

echo -e "\033[1;34mTESTES:\033[0m Realizando testes unitários"
echo -e "Sem testes para executar"

cd android
echo -e "\033[1;34mBUILD:\033[0m Gerando APK"
./gradlew assembleRelease

echo -e "\033[1;36mUPLOAD:\033[0m Subindo [NOME_NÃO_PROCESSADO] para drive"
echo -e "Sem drive para subir"

echo -e "\033[1;34mBUILD:\033[0m Gerando AAB"
echo -e "Geração de AAB desncessária"

if command -v notify-send &> /dev/null
then
    notify-send "Build Android completa!"
fi

echo -e "\033[1;32mDONE!\033[0m"