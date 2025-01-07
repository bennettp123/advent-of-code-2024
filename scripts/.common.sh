#!/bin/bash

rootdir="$(dirname "$(dirname "$(readlink -f "${0}")")")"

function get_current_day() {
  (
    cd "${rootdir}/packages"
    shopt -s nullglob
    for dir in day-*; do echo "$dir"; done \
      | sed 's/^day-//' \
      | sort -r \
      | head -n1
  )
}

today="$(date +%d)" # eg 17
current_day="$(get_current_day)"
if [ -z "${current_day}" ]; then
  current_day=0
fi

next_day="$(expr "${current_day}" + 1)"

