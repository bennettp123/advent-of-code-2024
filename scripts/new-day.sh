#!/bin/bash

set -e -o pipefail

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

if [ -r "${rootdir}/packages/day-${day}" ]; then
    echo "Day ${day} already exists" >&2
    exit 1
fi

name="day-${day}"
package="@advent-of-code-2024/${name}"
packagedir="${rootdir}/packages/${name}"
  
mkdir -p "${packagedir}"
(
cd "${packagedir}"
yarn init -p -n "${package}"

cat <<EOF >> "${packagedir}/README.md"

see https://adventofcode.com/2024/day/$(printf '%d' "${day}")

* entrypoint: [index.mjs](./index.mjs)
* test: [index.test.mjs](./index.test.mjs)
EOF
)

cp -Rv "${rootdir}/.template/" "${packagedir}"

( cd "${rootdir}" && yarn install )

echo "created ${package} in ${packagedir}"
