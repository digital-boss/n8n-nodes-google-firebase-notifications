#!/usr/bin/env bash
set -e  # exit when any command fails
set -o xtrace # print each command

function go () {
	ver="v$1"
	npm run bumpver $ver
	npm run genver
	npm run build
	git add --all
	git commit -m "Release $ver"
	git tag $ver
	git push
	git push origin $ver
	npm run deploy
}

git pull
if [ -z "$(git status --porcelain)" ]; then
  # Working directory clean
	go $1;
else
  # Uncommitted changes
	echo "Working directory must be clean"
	exit 1;
fi
