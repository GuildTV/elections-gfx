@ {
	201 CG ADD 0 @type 0 @data
}
@DELAY 3 {
	201 CG PLAY 0
}

@15 201 {
# Wait for stop
	200 SWAP 3-201
}
@DELAY 1 {
	201 CLEAR
}
