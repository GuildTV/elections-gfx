@ {
	999 LOADBG GE2018/WipeWithSFX
	210 MIXER OPACITY 0
	210 CG ADD 0 GE2018/winner4 1 @data
}
# TODO delay may need changing to give template enough time to load reliably - or we could wait for a trigger
@DELAY 10 {
	999 PLAY
}
@9 999 {
	210 CG NEXT 0
	# note that we dont swap the transforms, so the opacity 0 sticks to 210
    210 SWAP 1-200
}
@END 999 {
    210 CLEAR
}