@ {
	999 LOADBG GE2018/WipeWithSFX
	# 998 is reserved for the out, so it has time to load
	998 LOADBG GE2018/WipeWithSFX
	100 LOADBG GE2018/DraftBg
	#110 LOADBG GE2016/CANDIDATE-BOARD-FOOTER
	200 CG ADD 0 http://127.0.0.1:8080/multi-profile.html 0 @data
}
@CUE Show {
    999 PLAY
}
@9 999 {
    200 CG PLAY 0
	100 LOOP
	110 PLAY
}

@RUNCHILDORCUE change End {
	998 PLAY
}

@9 998 {
	100 STOP
	100 CLEAR
	110 CLEAR
	200 CLEAR
	210 CLEAR
}
@END 998 {
    998 CLEAR
}
