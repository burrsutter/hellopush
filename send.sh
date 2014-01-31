#!/bin/sh

MESSAGE="$1"
BADGE="$2"
if [ "$MESSAGE" ] 
then
	echo "Message is $MESSAGE"
else
	MESSAGE="Hello"
fi

if [ "$BADGE" ]
then
	echo "Badge is $BADGE"
else
	BADGE=1
fi	

echo "$MESSAGE $BADGE"

curl -3 -u \
"f07c43a6-bb0a-4bb7-a1eb-b432ea432411:e2cf19c3-6636-4712-bbe8-93c3a3de1b18" \
-v \
-H "Accept: application/json" \
-H "Content-type: application/json" \
-X POST --data '{"message": {"alert":"'"$MESSAGE"'","badge":'"$BADGE"'}}' \
https://aerogear-html5.rhcloud.com/rest/sender