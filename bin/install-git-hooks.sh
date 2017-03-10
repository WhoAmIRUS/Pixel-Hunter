#!/bin/sh

git_hooks_folder=./bin/git-hooks

for hook in $git_hooks_folder/*
do
  hook_name=${hook##*/}
  if [ -d $hook ]; then
    echo "Directory $hook and all its contents has been ignored."
    continue
  fi
  if [ -f $hook ]; then
    mv .git/hooks/$hook_name .git/hooks/$hook_name.old
    echo "Old version of $hook_name were renamed to $hook_name.old"
  fi
  ln -s -f ../../$hook .git/hooks/$hook_name
  echo "$hook_name from $hook has been successfully installed"
done
