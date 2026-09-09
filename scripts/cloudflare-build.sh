#!/usr/bin/env bash
set -euo pipefail

# Pages provides Node. Use the same pinned Typst release as CI.
TYPST_VERSION=0.15.1
TYPST_SHA256=a6d077d0a95eed5a2eba715b2dae06be954f624ccbf85758a03f389ded33118c
build_tools=$(mktemp -d)
trap 'rm -rf "$build_tools"' EXIT
curl --fail --location --retry 3 "https://github.com/typst/typst/releases/download/v${TYPST_VERSION}/typst-x86_64-unknown-linux-musl.tar.xz" --output "$build_tools/typst.tar.xz"
printf '%s  %s\n' "$TYPST_SHA256" "$build_tools/typst.tar.xz" | sha256sum --check
tar -xJf "$build_tools/typst.tar.xz" -C "$build_tools"
export PATH="$build_tools/typst-x86_64-unknown-linux-musl:$PATH"
npm ci
npm run check
npm run build
