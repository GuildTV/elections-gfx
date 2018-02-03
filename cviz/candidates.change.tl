@ {
    999 LOADBG GE2018/WipeWithSFX
	302 MIXER OPACITY 0
	302 CG ADD 0 GE2018/LT-STATIC-GREY 0 @name
	311 MIXER OPACITY 0
	311 CG ADD 0 http://127.0.0.1:8080/multi-profile.html 0 @data
}
# TODO delay may need changing to give template enough time to load reliably
@DELAY 10 {
	999 PLAY
	311 CG PLAY 0
}
@9 999 {
    311 SWAP 1-310
    302 SWAP 1-301
}
@END 999 {
    311 CLEAR
    302 CLEAR
}