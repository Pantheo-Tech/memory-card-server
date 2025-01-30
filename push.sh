#!/bin/bash
commit_types=("feature" "fix" "doc" "test" "build" "perf" "style" "refactor")

echo "Digite o tipo de commit que deseja fazer:"
read commit_type
while [ "$commit_type" == "" ]; do
    echo "Digite o tipo de commit que deseja fazer:"
    read commit_type
done

while [[ ! " ${commit_types[*]} " =~ [[:space:]]${commit_type}[[:space:]] ]]; do
    echo "Digite um tipo válido de commit:"
    read commit_type
done

echo "Digite a mensagem do commit:"
read commit_message

while [ "$commit_message" == "" ]; do
    echo "Digite a mensagem do commit:"
    read commit_message
done

current_branch=$(git branch --show-current)

git add . && git commit -m "$commit_type: $commit_message" && git push origin "$current_branch"

echo "Press any key to exit"
read