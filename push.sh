#!/bin/bash

commit_types=("feature" "fix" "doc" "test" "build" "perf" "style" "refactor")
PS3="Escolha o tipo de commit: "

echo "Selecione o tipo de commit:"
select commit_type in "${commit_types[@]}"; do
    if [[ -n "$commit_type" ]]; then
        break
    else
        echo "Opção inválida, tente novamente."
    fi
done

echo "Digite a mensagem do commit:"
read commit_message

while [ -z "$commit_message" ]; do
    echo "Digite a mensagem do commit:"
    read commit_message
done

current_branch=$(git branch --show-current)

git add . && git commit -m "$commit_type: $commit_message" && git push origin "$current_branch"

echo "Commit realizado com sucesso!"
echo "Pressione qualquer tecla para sair..."
read -n 1 -s
