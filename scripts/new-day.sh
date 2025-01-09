#!/bin/bash

set -e -o pipefail

source "$(dirname "$(readlink -f "${0}")")/.common.sh"

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
( cd "${packagedir}" && yarn init -p -n "${package}" )

cat <<EOF >> "${packagedir}/README.md"

see https://adventofcode.com/2024/day/$(printf '%d' "${day}")

* test using \`yarn test && yarn lint\`
* run using \`yarn run script\`
EOF

cp -Rv "${rootdir}/.template/" "${packagedir}"

( cd "${rootdir}" && yarn install )

echo "created ${package} in ${packagedir}"

if ( cd "${rootdir}/scripts" && node ./update-launch-configs.cjs "${day}" ); then
  echo "updated launch.json"
else
  echo "failed to update launch.json" >&2
fi
