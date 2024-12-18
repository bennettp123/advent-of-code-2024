#!/bin/bash

set -e -o pipefail

source "$(dirname "$(readlink -f "${0}")")/.common.sh"

if ! [ -z "${1}" ]; then
  desired_day="${1}"
  shift
else
  desired_day="${current_day}"
  if [ ${desired_day} -gt ${today} ]; then
    desired_day="${today}"
  fi
fi

day="$(printf '%.2d' "${desired_day}")"

if [ ${day} -lt 1 ] || [ ${day} -gt 99 ]; then
  echo "Invalid day: ${day}" >&2
  exit 1
fi

name="day-${day}"
package="@advent-of-code-2024/${name}"

if [ -z "${1}" ]; then
  yarn workspace "${package}" run start
else
  yarn workspace "${package}" "${@}"
fi

