#!/bin/bash

set -e -o pipefail

rootdir="$(dirname "$(dirname "$(readlink -f "${0}")")")"

function get_current_day() {
  (
    cd "${rootdir}/packages"
    shopt -s nullglob
    for dir in day-*; do echo "$dir"; done \
      | sed 's/^day-//' \
      | sed 's/-[12]$//' \
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

if ! [ -z "${1}" ]; then
  desired_day="${1}"
else
  desired_day="${next_day}"
  if [ ${desired_day} -gt ${today} ]; then
    desired_day="${today}"
  fi
fi

day="$(printf '%.2d' "${desired_day}")"

if [ ${day} -lt 1 ] || [ ${day} -gt 99 ]; then
  echo "Invalid day: ${day}" >&2
  exit 1
fi

if [ -r "${rootdir}/packages/day-${day}-1" ] || \
   [ -r "${rootdir}/packages/day-${day}-2" ]; then
    echo "Day ${day} already exists" >&2
    exit 1
fi

for num in 1 2; do
  name="day-${day}-${num}"
  package="@advent-of-code-2024/${name}"
  packagedir="${rootdir}/packages/${name}"
  
  mkdir -p "${packagedir}"
  ( cd "${packagedir}" && yarn init -p -n "${package}" )

  if [ ${num} -eq 1 ]; then
    echo -e "\nhttps://adventofcode.com/2024/day/$(printf '%d' "${day}")\n\n" >> "${packagedir}/README.md"
  fi

  echo "created ${package} in ${packagedir}"
done
