@ {
	999 LOADBG GE2018/WipeWithSFX
	# 998 is reserved for the out, so it has time to load
	998 LOADBG GE2018/WipeWithSFX
	300 LOADBG GE2018/DraftBg
	301 MIXER OPACITY 0
	301 CG ADD 0 GE2018/LT-STATIC-GREY 0 @name
	310 CG ADD 0 http://127.0.0.1:8080/multi-profile.html 0 @data
}
@CUE Show {
    999 PLAY
}
@9 999 {
    310 CG PLAY 0
    301 MIXER OPACITY 1
	300 LOOP
}

@RUNCHILDORCUE change End {
	998 PLAY
}

@9 998 {
	300 STOP
	300 CLEAR
	301 CLEAR
	310 CLEAR
	311 CLEAR
}
@END 998 {
    998 CLEAR
}
