#!/usr/bin/env bash
#
# This script assumes a linux environment

TEMPFILE=(mktemp)

echo "*** EasyDutch: updating EasyDutch filters..."

declare -A filters
filters=(
    ['EasyDutch.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/main/EasyDutch.txt'
    ['EasyDutch/Anti-Adblock.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Anti-Adblock.txt'
    ['EasyDutch/Block_General.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Block_General.txt'
    ['EasyDutch/Block_Resources.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Block_Resources.txt'
    ['EasyDutch/Block_Whitelist.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Block_Whitelist.txt'
    ['EasyDutch/Block_first_party_Server.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Block_first_party_Server.txt'
    ['EasyDutch/Block_third_party_Server.txt ']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Block_third_party_Server.txt'
    ['EasyDutch/Hide_General.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Hide_General.txt'
    ['EasyDutch/Hide_Specific.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Hide_Specific.txt'
    ['EasyDutch/Hide_Whitelist.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/Hide_Whitelist.txt'
    ['EasyDutch/No_uBlock_Filters.txt']='https://raw.githubusercontent.com/EasyDutch-uBO/EasyDutch/gh-pages/EasyDutch/No_uBlock_Filters.txt'
)

for i in "${!filters[@]}"; do
    localURL="$i"
    remoteURL="${filters[$i]}"
    echo "*** Downloading ${remoteURL}"
    if wget -q -T 30 -O $TEMPFILE -- $remoteURL; then
        if [ -s $TEMPFILE ]; then
            if ! cmp -s $TEMPFILE $localURL; then
                echo "    New version found: ${localURL}"
                if [ "$1" != "dry" ]; then
                    mv $TEMPFILE $localURL
                fi
            fi
        fi
    fi
done
