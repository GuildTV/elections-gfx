@ {
    999 LOADBG GE2016/BURN/BURNWITHAUDIO
	210 MIXER OPACITY 0
	210 CG ADD 0 http://10.42.13.111:8080/multi-profile.html 0 @data
}
# TODO delay may need changing to give template enough time to load reliably
@DELAY 10 {
	999 PLAY
	210 CG PLAY 0
}
@7 999 {
    210 SWAP 1-200
}
@END 999 {
    210 CLEAR
}